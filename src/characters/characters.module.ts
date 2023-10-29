import { Module } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { TransformationService } from 'src/transformation/transformation.service';
import { PlanetsService } from 'src/planets/planets.service';
import { PlanetsModule } from 'src/planets/planets.module';
import { TransformationModule } from 'src/transformation/transformation.module';

@Module({
  imports: [TypeOrmModule.forFeature([Character])],
  controllers: [CharactersController],
  providers: [CharactersService],
})
export class CharactersModule {}
