import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { DataSource, Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { email, password } = authCredentialsDto;

    const user = new UserEntity();
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPasswod(password, user.salt);

    try {
      await user.save();
    } catch (error) {
      if (parseInt(error.code) === 23505) {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<UserEntity> {
    const { email, password } = authCredentialsDto;

    const user = await this.findOne({
      where: {
        email,
      },
    });

    if (user && (await user.validatePassword(password))) {
      return user;
    }
  }

  private async hashPasswod(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}
