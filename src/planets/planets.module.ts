import { Module } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { PlanetsController } from './planets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planet } from './entities/planet.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  controllers: [PlanetsController],
  providers: [PlanetsService],
  imports: [TypeOrmModule.forFeature([Planet]), CloudinaryModule],
  exports: [TypeOrmModule],
})
export class PlanetsModule {}
