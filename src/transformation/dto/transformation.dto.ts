import { IsInt, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
export class TransformationDTO {
  @IsString()
  name: string;

  @IsString()
  ki: string;

  @IsString()
  character: string;
}
export class UpdateTransformationDto extends PartialType(TransformationDTO) {}
