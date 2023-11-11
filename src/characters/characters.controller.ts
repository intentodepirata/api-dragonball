import { Transformation } from './../transformation/entities/transformation.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDTO, UpdateCharacterDTO } from './dto/character.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Gender } from 'src/constants/gender';
import { Race } from 'src/constants/race';
import { Affiliation } from 'src/constants/affiliation';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import {
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiParam,
  ApiExtraModels,
} from '@nestjs/swagger';

@ApiTags('Characters')
@ApiExtraModels(CreateCharacterDTO)
@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}
  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createCharacterDto: CreateCharacterDTO,
    @UploadedFile() image,
  ) {
    return this.charactersService.create(createCharacterDto, image);
  }

  @ApiOperation({
    summary:
      'Get all characters if no params are provided, limit to 10 by default',
  })
  @ApiOkResponse({
    description: 'List of characters',
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
  @Get()
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
    description: 'Character name',
    required: false,
  })
  @ApiQuery({
    name: 'gender',
    description: 'Character gender',
    schema: {
      enum: Object.values(Gender),
    },
    required: false,
  })
  @ApiQuery({
    name: 'race',
    description: 'Character race',
    schema: {
      enum: Object.values(Race),
    },
    required: false,
  })
  @ApiQuery({
    name: 'affiliation',
    description: 'Character affiliation',
    schema: {
      enum: Object.values(Affiliation),
    },
    required: false,
  })
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('name') name: string,
    @Query('gender') gender: Gender,
    @Query('race') race: Race,
    @Query('affiliation') affiliation: Affiliation,
  ) {
    limit = limit > 100 ? 100 : limit;

    if (name || gender || race || affiliation) {
      return this.charactersService.filter(name, gender, race, affiliation);
    }
    return this.charactersService.paginate({
      limit: Number(limit) || 10,
      page: Number(page) || 1,
      route: `${process.env.API_URL}/characters`,
    });
  }

  @ApiOperation({
    summary: 'Get one character with origin planet and transformations',
  })
  @ApiOkResponse({
    description: 'One character with origin planet and transformations',
    status: 200,
  })
  @ApiBadRequestResponse({ description: 'Bad Request', status: 400 })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    status: 500,
  })
  @ApiParam({
    name: 'id',
    description: 'Character ID',
    type: Number,
  })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.charactersService.findOne(id);
  }

  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: number,
    @Body() updateCharacterDto: UpdateCharacterDTO,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.charactersService.update(id, updateCharacterDto, image);
  }
  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.charactersService.remove(id);
  }
}
