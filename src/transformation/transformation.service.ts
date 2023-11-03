import { Character } from './../characters/entities/character.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import {
  TransformationDTO,
  UpdateTransformationDto,
} from './dto/transformation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transformation } from './entities/transformation.entity';
import { Repository } from 'typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class TransformationService {
  constructor(
    @InjectRepository(Transformation)
    private transformationRepository: Repository<Transformation>,

    @InjectRepository(Character)
    private characterRepository: Repository<Character>,
    private cloudinary: CloudinaryService,
  ) {}
  async create(
    createTransformationDto: TransformationDTO,
    image: Express.Multer.File,
  ) {
    const result = await this.cloudinary.uploadImage(image);
    if (!result.secure_url) {
      throw new BadRequestException('Image not uploaded');
    }

    const character: Character = await this.characterRepository.findOneBy({
      name: createTransformationDto.character,
    });

    if (!character) {
      throw new BadRequestException('Character not found');
    }

    const transformation: Transformation = this.transformationRepository.create(
      {
        ...createTransformationDto,
        image: result.secure_url,
        character,
      },
    );
    return await this.transformationRepository.save(transformation);
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

  async update(
    id: number,
    updateTransformationDto: UpdateTransformationDto,
    image: Express.Multer.File,
  ) {
    const transformation = await this.transformationRepository.findOneBy({
      id,
    });
    if (!transformation) {
      throw new BadRequestException('Transformation ID not found');
    }

    let result;
    if (image) {
      result = await this.cloudinary.uploadImage(image);

      if (!result.secure_url) {
        throw new BadRequestException('Image not uploaded');
      }
    }
    const character = await this.characterRepository.findOneBy({
      name: updateTransformationDto.character,
    });
    if (!character) {
      throw new BadRequestException('Character not found');
    }

    const updatedTransformation = this.transformationRepository.create({
      ...updateTransformationDto,
      image: result ? result.secure_url : transformation.image,
      character,
    });

    return await this.transformationRepository.update(
      id,
      updatedTransformation,
    );
  }

  async remove(id: number) {
    return await this.transformationRepository.softDelete(id);
  }
}
