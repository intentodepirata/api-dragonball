import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { CreatePlanetDTO, UpdatePlanetDTO } from './dto/planet.dto';

@Controller('planets')
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

  @Post()
  create(@Body() createPlanetDto: CreatePlanetDTO) {
    return this.planetsService.create(createPlanetDto);
  }

  @Get()
  findAll() {
    return this.planetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.planetsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePlanetDto: UpdatePlanetDTO) {
    return this.planetsService.update(id, updatePlanetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.planetsService.remove(id);
  }
}
