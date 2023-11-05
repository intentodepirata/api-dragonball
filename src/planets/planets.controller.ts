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
  Query,
  UseGuards,
} from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { CreatePlanetDTO, UpdatePlanetDTO } from './dto/planet.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('planets')
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

  @UseGuards(AuthGuard)
  @Post()
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() createPlanetDto: CreatePlanetDTO, @UploadedFile() image) {
    return this.planetsService.create(createPlanetDto, image);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('name') name: string,
    @Query('isDestroyed') isDestroyed: boolean,
  ) {
    limit = limit > 100 ? 100 : limit;

    if (name || isDestroyed !== undefined) {
      return this.planetsService.filter(name, isDestroyed);
    }
    return this.planetsService.paginate({
      limit: Number(limit),
      page: Number(page),
      route: `${process.env.API_URL}/planets`,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.planetsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: number,
    @Body() updatePlanetDto: UpdatePlanetDTO,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.planetsService.update(id, updatePlanetDto, image);
  }

  @UseGuards(AuthGuard)
  @Post()
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.planetsService.remove(id);
  }
}
