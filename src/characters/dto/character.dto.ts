import { IsOptional, IsString, IsInt, IsEnum } from 'class-validator';
import { Affiliation } from 'src/constants/affiliation';
import { Gender } from 'src/constants/gender';
import { Race } from 'src/constants/race';

export class CreateCharacterDTO {
  @IsString()
  name: string;

  @IsEnum(Race)
  race: Race;

  @IsEnum(Gender)
  gender: Gender;

  @IsInt()
  age: string;

  @IsInt()
  maxKi: number;

  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsEnum(Affiliation)
  affiliation: Affiliation;
}

export class UpdateCharacterDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(Race)
  race: Race;

  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;

  @IsOptional()
  @IsInt()
  age: string;

  @IsOptional()
  @IsInt()
  maxKi: number;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsEnum(Affiliation)
  affiliation: Affiliation;
}
