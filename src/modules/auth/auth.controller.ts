import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Get,
  Query,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import RequestWithUser from '../../common/types/requestWithUser.interface';
import { LocalAuthenticationGuard } from './guards/localAuthentication.guard';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { MagicLoginStrategy } from './strategies/magicLogin.strategy';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly magicLoginStrategy: MagicLoginStrategy,
  ) {}

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

  @HttpCode(200)
  @Post('link-login')
  async linkLogin(@Req() req, @Res() res) {
    return this.magicLoginStrategy.send(req, res);
  }

  @UseGuards(AuthGuard('magiclogin'))
  @Get('link-login/callback')
  async linkLoginCallback(@Req() request: RequestWithUser) {
    return this.authService.issueJwt(request.user);
  }
}
