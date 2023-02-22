import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @IsEmail()
  @ApiProperty({
    example: 'user@mail.com',
  })
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[a-zA-Z]).*$/, {
    message:
      'Passoword must contain at least one numeric char, an uppercase and a special char',
  })
  @ApiProperty({
    example: 'aSuperStr0ngPassw0rd!',
  })
  password: string;
}
