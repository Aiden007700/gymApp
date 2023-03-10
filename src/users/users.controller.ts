import { Controller, Get } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

    //delete this later
    @Get()
    // @Roles(Role.Admin)
    async get() {
      return this.usersService.find()
    }
}
