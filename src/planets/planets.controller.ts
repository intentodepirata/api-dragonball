import { IsBoolean } from 'class-validator';
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
import {
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiExcludeEndpoint,
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Planets')
@ApiExtraModels(CreatePlanetDTO)
@Controller('planets')
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}
  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() createPlanetDto: CreatePlanetDTO, @UploadedFile() image) {
    return this.planetsService.create(createPlanetDto, image);
  }

  @ApiOperation({
    summary:
      'Get all planets if no params are provided, limit to 10 by default',
  })
  @ApiOkResponse({
    description: 'List of planets',
    status: 200,
  })
  @ApiBadGatewayResponse({
    description: 'Bad Gateway',
    status: 502,
  })
  @ApiBadRequestResponse({ description: 'Bad Request', status: 400 })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    status: 500,
  })
  @ApiQuery({
    name: 'page',
    description: 'Page number',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    description: 'Number of items per page',
    required: false,
  })
  @ApiQuery({
    name: 'name',
    description: 'Planet name',
    required: false,
  })
  @ApiQuery({
    name: 'isDestroyed',
    description: 'Planet destroyed status',
    schema: {
      type: 'boolean',
    },
    required: false,
  })
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

  @ApiOperation({
    summary: 'Get one planet with all characters that came from it',
  })
  @ApiOkResponse({
    description: 'Get one planet with all characters that came from it',
    status: 200,
  })
  @ApiBadRequestResponse({ description: 'Bad Request', status: 400 })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    status: 500,
  })
  @ApiParam({
    name: 'id',
    description: 'Planet ID',
    type: Number,
  })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.planetsService.findOne(id);
  }

  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: number,
    @Body() updatePlanetDto: UpdatePlanetDTO,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.planetsService.update(id, updatePlanetDto, image);
  }

  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.planetsService.remove(id);
  }
}
