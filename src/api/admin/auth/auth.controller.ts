import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SignUpPayloadDto } from '~/api/admin/auth/dto/sign-up.payload';

@ApiTags()
@Controller('admin/auth')
export class AdminAuthController {
  @Post('sign-up')
  async signUp(@Body() payload: SignUpPayloadDto) {
    return payload;
  }
}
