import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { TransformationService } from './transformation.service';
import {
  TransformationDTO,
  UpdateTransformationDto,
} from './dto/transformation.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('transformations')
export class TransformationController {
  constructor(private readonly transformationService: TransformationService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createTransformationDto: TransformationDTO,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.transformationService.create(createTransformationDto, image);
  }

  @Get()
  findAll() {
    return this.transformationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.transformationService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: number,
    @Body() updateTransformationDto: UpdateTransformationDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.transformationService.update(
      id,
      updateTransformationDto,
      image,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.transformationService.remove(id);
  }
}
