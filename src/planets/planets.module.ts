import { Module } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { PlanetsController } from './planets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planet } from './entities/planet.entity';

@Module({
  controllers: [PlanetsController],
  providers: [PlanetsService],
  imports: [TypeOrmModule.forFeature([Planet])],
  exports: [TypeOrmModule],
})
export class PlanetsModule {}
