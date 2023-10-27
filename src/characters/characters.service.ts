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
  create(createCharacterDto: CreateCharacterDTO) {
    return 'This action adds a new character';
  }

  findAll() {
    return `This action returns all characters`;
  }

  findOne(id: number) {
    return `This action returns a #${id} character`;
  }

  update(id: number, updateCharacterDto: UpdateCharacterDTO) {
    return `This action updates a #${id} character`;
  }

  remove(id: number) {
    return `This action removes a #${id} character`;
  }
}
