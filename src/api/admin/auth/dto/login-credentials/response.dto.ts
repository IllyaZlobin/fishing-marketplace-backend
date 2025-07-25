import { ApiProperty } from '@nestjs/swagger';

interface ILoginWithCredentialsResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export class LoginWithCredentialsResponseDto implements ILoginWithCredentialsResponse {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  expiresIn: number;

  constructor(payload: ILoginWithCredentialsResponse) {
    this.accessToken = payload.accessToken;
    this.refreshToken = payload.refreshToken;
    this.expiresIn = payload.expiresIn;
  }
}
