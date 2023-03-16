import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-magic-login';
import { AuthService } from '../auth.service';

@Injectable()
export class MagicLoginStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(MagicLoginStrategy.name);
  
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    ) {
    super({
      secret: process.env.JWT_SECRET || configService.get('JWT_SECRET'),
      jwtOptions: {
        expiresIn: '5m',
      },
      callbackUrl: `${
        process.env.URL || configService.get('URL')
      }/auth/link-login/callback`,
      sendMagicLink: async (destination: string, href: string) => {
        const user = await this.authService.validateUserMagicLinkEmail(destination);
        if (user) {
            this.logger.debug(`Sending magic link to ${destination}`);
            this.logger.debug(`Magic link: ${href}`);
        }
      },
      verify: async (payload: { destination: string }, callback) => {
        callback(null, await this.verify(payload));
      }
    });
  }

  async verify(payload: { destination: string }) {
    this.logger.debug(`Verifying payload: ${JSON.stringify(payload)}`);
    const user = await this.authService.validateUserMagicLinkEmail(payload.destination);
    return user;
  }
}

