import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginWithCredentialsPayloadDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
