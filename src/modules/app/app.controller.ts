import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
    @Get()
    awsHealthCheck() {
        return { status: 'this has changed, i did a refactor' };
    }
}
