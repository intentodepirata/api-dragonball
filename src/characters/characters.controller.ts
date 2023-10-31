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
} from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDTO, UpdateCharacterDTO } from './dto/character.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createCharacterDto: CreateCharacterDTO,
    @UploadedFile() image,
  ) {
    return this.charactersService.create(createCharacterDto, image);
  }

  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    limit = limit > 100 ? 100 : limit;
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

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: number,
    @Body() updateCharacterDto: UpdateCharacterDTO,
    @UploadedFile() image,
  ) {
    return this.charactersService.update(id, updateCharacterDto, image);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.charactersService.remove(id);
  }
}
