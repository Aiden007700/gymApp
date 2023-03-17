import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('app')
export class AppController {
    @Get()
    awsHealthCheck() {
        return { status: 'added exercise table' };
    }
}
