import { IsInt, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
export class TransformationDTO {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  ki: string;

  @ApiProperty()
  @IsString()
  character: string;
}
export class UpdateTransformationDto extends PartialType(TransformationDTO) {}
