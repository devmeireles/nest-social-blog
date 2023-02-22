import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ERoles } from '../entities/roles.enum';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Categories')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@UseGuards(AuthGuard())
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @Roles([ERoles.ADMIN])
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @Roles([ERoles.ADMIN, ERoles.USER])
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @Roles([ERoles.ADMIN, ERoles.USER])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @Roles([ERoles.ADMIN])
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @Roles([ERoles.ADMIN])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
