import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
    @Get()
    awsHealthCheck() {
        return { status: 'thank you for the help' };
    }
}
