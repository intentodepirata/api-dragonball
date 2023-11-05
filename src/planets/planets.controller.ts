import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { CreatePlanetDTO, UpdatePlanetDTO } from './dto/planet.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('planets')
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() createPlanetDto: CreatePlanetDTO, @UploadedFile() image) {
    return this.planetsService.create(createPlanetDto, image);
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
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: number,
    @Body() updatePlanetDto: UpdatePlanetDTO,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.planetsService.update(id, updatePlanetDto, image);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.planetsService.remove(id);
  }
}
