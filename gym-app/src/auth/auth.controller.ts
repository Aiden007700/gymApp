import { Body, Req, Controller, HttpCode, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import RequestWithUser from '../common/types/requestWithUser.interface';
import { LocalAuthenticationGuard } from './guards/localAuthentication.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }
 
  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('signIn')
  async signIn(@Req() request: RequestWithUser) {
    return this.authService.issueJwt(request.user);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@Req() request: RequestWithUser) {
    return request.user;
  }
}


