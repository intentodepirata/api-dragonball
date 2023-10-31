import { BadRequestException, Injectable } from '@nestjs/common';
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
    const planet = await this.planetRepository.findOne({
      where: { id },
      relations: ['characters'],
    });
    if (!planet) {
      throw new BadRequestException('Planet ID not found');
    }
    return planet;
  }

  async update(id: number, updatePlanetDto: UpdatePlanetDTO) {
    const planet = await this.planetRepository.findOneBy({ id });
    if (!planet) {
      throw new BadRequestException('Planet ID not found');
    }
    return await this.planetRepository.update(id, updatePlanetDto);
  }

  async remove(id: number) {
    const planet = await this.planetRepository.findOneBy({ id });
    if (!planet) {
      throw new BadRequestException('Planet ID not found');
    }
    return await this.planetRepository.softDelete(id);
  }
}
