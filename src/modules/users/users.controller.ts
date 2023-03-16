import { Controller, Get } from '@nestjs/common';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { Role } from 'src/modules/auth/enums/role.enum';
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
