import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
    @Get()
    awsHealthCheck() {
        return { status: 'ok' };
    }
    
}
