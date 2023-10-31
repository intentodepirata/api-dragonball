import { Module } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { PlanetsModule } from 'src/planets/planets.module';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Character]),
    PlanetsModule,
    CloudinaryModule,
  ],
  controllers: [CharactersController],
  providers: [CharactersService],
})
export class CharactersModule {}
