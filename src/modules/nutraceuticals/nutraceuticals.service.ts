import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNutraceuticalDto } from './dto/create-nutraceutical.dto';
import { UpdateNutraceuticalDto } from './dto/update-nutraceutical.dto';
import { Nutraceutical } from './entities/nutraceutical.entity';

@Injectable()
export class NutraceuticalsService {

  constructor(
    @InjectRepository(Nutraceutical)
    private nutraceuticalRepository: Repository<Nutraceutical>,
  ) {}

  async create(createNutraceuticalDto: CreateNutraceuticalDto) {
    const nutraceutical = this.nutraceuticalRepository.create(createNutraceuticalDto);
    return await this.nutraceuticalRepository.save(nutraceutical);
  }

  async findAll() {
    return await this.nutraceuticalRepository.find();
  }

  async findOne(id: number) {
    return await this.nutraceuticalRepository.findOne({
      where: {
        id
      }
    });
  }

  async update(id: number, updateNutraceuticalDto: UpdateNutraceuticalDto) {
    const nutraceutical = await this.findOne(id);
    this.nutraceuticalRepository.merge(nutraceutical, updateNutraceuticalDto);
    return await this.nutraceuticalRepository.save(nutraceutical);
  }

  async remove(id: number) {
    const nutraceutical = await this.findOne(id);
    return await this.nutraceuticalRepository.remove(nutraceutical);
  }
}
