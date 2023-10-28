import { IsInt, IsOptional, IsString } from 'class-validator';

export class TransformationDTO {
  @IsString()
  name: string;

  @IsString()
  image: string;

  @IsInt()
  ki: number;
}
export class UpdateTransformationDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsInt()
  ki: number;
}
