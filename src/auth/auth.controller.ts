// import {
//   Controller,
//   Post,
//   Body,
//   UseGuards,
//   Request,
//   Get,
// } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { JwtAuthGuard } from './jwt-auth.guard';

// @Controller('auth')
// export class AuthController {
//   constructor(private authService: AuthService) {}

//   @Post('register')
//   async register(@Body() registerDto: { email: string; password: string }) {
//     return this.authService.register(registerDto.email, registerDto.password);
//   }

//   @Post('login')
//   async login(@Body() loginDto: { email: string; password: string }) {
//     return this.authService.login(loginDto.email, loginDto.password);
//   }

//   @UseGuards(JwtAuthGuard)
//   @Get('profile')
//   async getProfile(@Request() req) {
//     return req.user;
//   }
// }

import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: { email: string; password: string }) {
    return this.authService.register(registerDto.email, registerDto.password);
  }

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
