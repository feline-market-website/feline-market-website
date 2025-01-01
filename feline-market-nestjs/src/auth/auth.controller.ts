import { AuthService } from './auth.service';
import { Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { Response } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req: any,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string }> {
    const access_token = await this.authService.login(req.user);
    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 360000,
    });
    return { message: 'Login successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async findMe(@Request() req: any) {
    return this.authService.findMe(req.user.username);
  }
}
