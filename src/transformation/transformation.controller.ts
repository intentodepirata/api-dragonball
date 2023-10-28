import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TransformationService } from './transformation.service';
import {
  TransformationDTO,
  UpdateTransformationDto,
} from './dto/transformation.dto';

@Controller('transformation')
export class TransformationController {
  constructor(private readonly transformationService: TransformationService) {}

  @Post()
  create(@Body() createTransformationDto: TransformationDTO) {
    return this.transformationService.create(createTransformationDto);
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
  update(
    @Param('id') id: number,
    @Body() updateTransformationDto: UpdateTransformationDto,
  ) {
    return this.transformationService.update(id, updateTransformationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.transformationService.remove(id);
  }
}
