import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt/dist';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  @InjectRepository(UserRepository)
  private userRepository: UserRepository;
  private jwtService: JwtService;

  constructor(userRepository: UserRepository, jwtSerive: JwtService) {
    this.userRepository = userRepository;
    this.jwtService = jwtSerive;
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const user = await this.userRepository.validateUserPassword(
      authCredentialsDto,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = {
      email: user.email,
    };

    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
