import { Injectable } from '@nestjs/common';
import { CreatePlanetDTO, UpdatePlanetDTO } from './dto/planet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Planet } from './entities/planet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlanetsService {
  constructor(
    @InjectRepository(Planet)
    private planetRepository: Repository<Planet>,
  ) {}
  create(createPlanetDto: CreatePlanetDTO) {
    return 'This action adds a new planet';
  }

  findAll() {
    return `This action returns all planets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} planet`;
  }

  update(id: number, updatePlanetDto: UpdatePlanetDTO) {
    return `This action updates a #${id} planet`;
  }

  remove(id: number) {
    return `This action removes a #${id} planet`;
  }
}
