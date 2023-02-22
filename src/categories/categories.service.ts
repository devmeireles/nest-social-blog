import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoriesRepository: Repository<CategoryEntity>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    const category = new CategoryEntity();
    Object.assign(category, { ...createCategoryDto });
    await category.save();

    return category;
  }

  async findAll(): Promise<CategoryEntity[]> {
    const categories = await this.categoriesRepository.find();
    return categories;
  }

  async findOne(id: string): Promise<CategoryEntity> {
    const category = await this.categoriesRepository.findOne({
      where: {
        id,
      },
    });

    if (!category) throw new NotFoundException();

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);
    Object.assign(category, { ...updateCategoryDto });
    await category.save();

    return category;
  }

  async remove(id: string): Promise<void> {
    const toRemove = await this.categoriesRepository.softDelete(id);
    if (toRemove.affected === 0) throw new NotFoundException();
  }
}
