import { Module } from '@nestjs/common';
import { TransformationService } from './transformation.service';
import { TransformationController } from './transformation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transformation } from './entities/transformation.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { CharactersModule } from 'src/characters/characters.module';
import { PlanetsModule } from 'src/planets/planets.module';
import { Character } from 'src/characters/entities/character.entity';

@Module({
  controllers: [TransformationController],
  providers: [TransformationService],
  imports: [
    TypeOrmModule.forFeature([Transformation, Character]),
    CharactersModule,
    CloudinaryModule,
  ],
})
export class TransformationModule {}
