import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

    //delete this later
    @Get()
    async get() {
      return this.usersService.find()
    }
}
