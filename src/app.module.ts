import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/typeorm.config';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), AuthModule, CategoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
