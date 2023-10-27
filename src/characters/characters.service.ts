import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCharacterDTO, UpdateCharacterDTO } from './dto/character.dto';
import { Character } from './entities/character.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(Character)
    private characterRepository: Repository<Character>,
  ) {}

  async create(createCharacterDto: CreateCharacterDTO) {
    return await this.characterRepository.save(createCharacterDto);
  }

  async findAll() {
    return await this.characterRepository.find({
      relations: ['originPlanet', 'transformations'],
    });
  }

  async findOne(id: number) {
    return await this.characterRepository.findOne({
      where: { id },
      relations: ['originPlanet', 'transformations'],
    });
  }

  update(id: number, updateCharacterDto: UpdateCharacterDTO) {
    return `This action updates a #${id} character`;
  }

  remove(id: number) {
    return `This action removes a #${id} character`;
  }
}
