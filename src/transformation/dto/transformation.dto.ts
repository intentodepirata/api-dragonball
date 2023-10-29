import { IsInt, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
export class TransformationDTO {
  @IsString()
  name: string;

  @IsString()
  image: string;

  @IsInt()
  ki: number;
}
export class UpdateTransformationDto extends PartialType(TransformationDTO) {}
