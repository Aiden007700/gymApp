import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async findUserByEmail(email: string): Promise<User | undefined> {
        return this.userRepository.findOne({ 
            where: { email },
        });
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = new User();
        user.email = createUserDto.email;
        user.password = createUserDto.password;
        user.hashedPassword = createUserDto.hashedPassword;
        return this.userRepository.save(user);
    }

    // delete this later
    async find() {
        return await this.userRepository.find();
    }   
}
