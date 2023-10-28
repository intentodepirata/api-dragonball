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
  async create(createPlanetDto: CreatePlanetDTO) {
    return await this.planetRepository.save(createPlanetDto);
  }

  async findAll() {
    return await this.planetRepository.find();
  }

  async findOne(id: number) {
    return await this.planetRepository.findOne({ where: { id } });
  }

  async update(id: number, updatePlanetDto: UpdatePlanetDTO) {
    return await this.planetRepository.update(id, updatePlanetDto);
  }

  async remove(id: number) {
    return await this.planetRepository.softDelete(id);
  }
}
