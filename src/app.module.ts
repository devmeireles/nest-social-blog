import { Module } from '@nestjs/common';
import { TypeOrmExModule } from './database/typeorm-ex.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmExModule.forCustomRepository([]),
    AuthModule,
  ],
})
export class AppModule {}
