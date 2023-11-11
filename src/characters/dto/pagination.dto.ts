import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class PaginationDTO {
  @ApiProperty()
  @IsNumber()
  limit: number;
  @ApiProperty()
  offset: number;
}
