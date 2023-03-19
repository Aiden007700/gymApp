import { Module } from '@nestjs/common';
import { NutraceuticalsService } from './nutraceuticals.service';
import { NutraceuticalsController } from './nutraceuticals.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Nutraceutical } from './entities/nutraceutical.entity';

@Module({
  controllers: [NutraceuticalsController],
  providers: [NutraceuticalsService],
  imports: [TypeOrmModule.forFeature([Nutraceutical])],
})
export class NutraceuticalsModule {}
