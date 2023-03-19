import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { NutraceuticalsService } from './nutraceuticals.service';
import { CreateNutraceuticalDto } from './dto/create-nutraceutical.dto';
import { UpdateNutraceuticalDto } from './dto/update-nutraceutical.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('nutraceuticals')
@ApiTags('nutraceuticals')
export class NutraceuticalsController {
  constructor(private readonly nutraceuticalsService: NutraceuticalsService) {}

  @Post()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(@Body() createNutraceuticalDto: CreateNutraceuticalDto, @Req() req) {
    return this.nutraceuticalsService.create(createNutraceuticalDto);
  }

  @Get()
  findAll() {
    return this.nutraceuticalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nutraceuticalsService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(@Param('id') id: string, @Body() updateNutraceuticalDto: UpdateNutraceuticalDto) {
    return this.nutraceuticalsService.update(+id, updateNutraceuticalDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.nutraceuticalsService.remove(+id);
  }
}
