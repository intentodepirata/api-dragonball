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
import {
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiExcludeEndpoint,
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Transformations')
@ApiExtraModels(TransformationDTO)
@Controller('transformations')
export class TransformationController {
  constructor(private readonly transformationService: TransformationService) {}
  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createTransformationDto: TransformationDTO,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.transformationService.create(createTransformationDto, image);
  }

  @ApiOperation({
    summary:
      'Get all characters transformations if no params are provided, limit to 10 by default',
  })
  @ApiOkResponse({
    description: 'List of characters transformations',
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
  findAll() {
    return this.transformationService.findAll();
  }

  @ApiOperation({
    summary: 'Get one character transformation by ID',
  })
  @ApiOkResponse({
    description: 'One character',
    status: 200,
  })
  @ApiBadRequestResponse({ description: 'Bad Request', status: 400 })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    status: 500,
  })
  @ApiParam({
    name: 'id',
    description: 'Transformation ID',
    type: Number,
  })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.transformationService.findOne(id);
  }

  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard)
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
  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.transformationService.remove(id);
  }
}
