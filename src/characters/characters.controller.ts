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

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createCharacterDto: CreateCharacterDTO,
    @UploadedFile() image,
  ) {
    return this.charactersService.create(createCharacterDto, image);
  }

  @Get()
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
      limit: Number(limit),
      page: Number(page),
      route: `${process.env.API_URL}/characters`,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.charactersService.findOne(id);
  }

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

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.charactersService.remove(id);
  }
}
