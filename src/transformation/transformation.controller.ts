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
  UseGuards,
} from '@nestjs/common';
import { TransformationService } from './transformation.service';
import {
  TransformationDTO,
  UpdateTransformationDto,
} from './dto/transformation.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('transformations')
export class TransformationController {
  constructor(private readonly transformationService: TransformationService) {}

  @UseGuards(AuthGuard)
  @Post()
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

  @UseGuards(AuthGuard)
  @Post()
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

  @UseGuards(AuthGuard)
  @Post()
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.transformationService.remove(id);
  }
}
