import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { LoginWithCredentialsPayloadDto } from '~/api/admin/auth/dto/login-credentials/payload.dto';
import { LoginWithCredentialsResponseDto } from '~/api/admin/auth/dto/login-credentials/response.dto';
import { RegisterAdminPayloadDto } from '~/api/admin/auth/dto/register/payload';

@ApiTags()
@ApiResponse({ status: HttpStatus.OK, type: LoginWithCredentialsResponseDto })
@Controller('admin/auth')
export class AdminAuthController {
  @Post('register')
  async register(@Body() payload: RegisterAdminPayloadDto) {
    return payload;
  }

  @Post('login/credentials')
  async loginWithCredentials(@Body() payload: LoginWithCredentialsPayloadDto): Promise<any> {
    return payload;
  }
}
