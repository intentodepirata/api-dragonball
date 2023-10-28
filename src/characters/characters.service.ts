import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCharacterDTO, UpdateCharacterDTO } from './dto/character.dto';
import { Character } from './entities/character.entity';
import { Repository } from 'typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(Character)
    private characterRepository: Repository<Character>,
  ) {}

  async paginate(options: IPaginationOptions): Promise<Pagination<Character>> {
    return paginate<Character>(this.characterRepository, options);
  }

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

  async update(id: number, updateCharacterDto: UpdateCharacterDTO) {
    return await this.characterRepository.update(id, updateCharacterDto);
  }

  async remove(id: number) {
    return await this.characterRepository.softDelete(id);
  }
}
