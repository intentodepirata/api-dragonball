import { Injectable } from '@nestjs/common';
import {
  TransformationDTO,
  UpdateTransformationDto,
} from './dto/transformation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transformation } from './entities/transformation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransformationService {
  constructor(
    @InjectRepository(Transformation)
    private transformationRepository: Repository<Transformation>,
  ) {}
  async create(createTransformationDto: TransformationDTO) {
    return this.transformationRepository.save(createTransformationDto);
  }

  async findAll() {
    return await this.transformationRepository.find();
  }

  async findOne(id: number) {
    return await this.transformationRepository.findOne({
      where: { id },
      relations: ['character'],
    });
  }

  async update(id: number, updateTransformationDto: UpdateTransformationDto) {
    return await this.transformationRepository.update(
      id,
      updateTransformationDto,
    );
  }

  async remove(id: number) {
    return await this.transformationRepository.softDelete(id);
  }
}
