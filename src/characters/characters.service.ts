import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCharacterDTO, UpdateCharacterDTO } from './dto/character.dto';
import { Character } from './entities/character.entity';
import { Repository } from 'typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { Planet } from 'src/planets/entities/planet.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(Character)
    private characterRepository: Repository<Character>,

    @InjectRepository(Planet)
    private planetRepository: Repository<Planet>,

    private cloudinary: CloudinaryService,
  ) {}

  async paginate(options: IPaginationOptions): Promise<Pagination<Character>> {
    return paginate<Character>(this.characterRepository, options);
  }

  async create(
    createCharacterDto: CreateCharacterDTO,
    image: Express.Multer.File,
  ) {
    const result = await this.cloudinary.uploadImage(image);

    if (!result.secure_url) {
      throw new BadRequestException('Image not uploaded');
    }

    const planet: Planet = await this.planetRepository.findOneBy({
      name: createCharacterDto.originPlanet,
    });

    if (!planet) {
      throw new BadRequestException('Planet not found');
    }
    const character: Character = this.characterRepository.create({
      ...createCharacterDto,
      image: result.secure_url,
      originPlanet: planet,
    });

    return await this.characterRepository.save(character);
  }

  findAll() {
    return this.characterRepository.find({
      relations: ['originPlanet', 'transformations'],
    });
  }

  async findOne(id: number) {
    const character = await this.characterRepository.findOne({
      where: { id },
      relations: ['originPlanet', 'transformations'],
    });
    if (!character) {
      throw new BadRequestException('Character ID not found');
    }
    return character;
  }

  async update(
    id: number,
    updateCharacterDto: UpdateCharacterDTO,
    image: Express.Multer.File,
  ) {
    const character = await this.characterRepository.findOneBy({
      id,
    });

    if (!character) {
      throw new BadRequestException('Character ID not found');
    }
    let result;
    if (image) {
      result = await this.cloudinary.uploadImage(image);

      if (!result.secure_url) {
        throw new BadRequestException('Fail to upload image');
      }
    }

    const planet = await this.planetRepository.findOneBy({
      name: updateCharacterDto.originPlanet,
    });
    if (!planet) {
      throw new BadRequestException('OriginPlanet not found');
    }
    const updatedCharacter = {
      ...updateCharacterDto,
      image: image ? result.secure_url : character.image,
      originPlanet: planet,
    };

    return await this.characterRepository.update(id, updatedCharacter);
  }

  async remove(id: number) {
    const character = await this.characterRepository.findOneBy({ id });
    if (!character) {
      throw new BadRequestException('Character ID not found');
    }
    return character;
  }
}
