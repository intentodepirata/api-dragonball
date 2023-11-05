import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePlanetDTO, UpdatePlanetDTO } from './dto/planet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Planet } from './entities/planet.entity';
import { Like, Repository } from 'typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class PlanetsService {
  constructor(
    @InjectRepository(Planet)
    private planetRepository: Repository<Planet>,

    private cloudinary: CloudinaryService,
  ) {}

  async paginate(options: IPaginationOptions): Promise<Pagination<Planet>> {
    return paginate<Planet>(this.planetRepository, options);
  }
  async filter(name, isDestroyed): Promise<Planet[]> {
    return this.planetRepository.find({
      where: {
        name: name && Like(`%${name}%`),
        isDestroyed,
      },
    });
  }

  async create(createPlanetDto: CreatePlanetDTO, image: Express.Multer.File) {
    const result = await this.cloudinary.uploadImage(image);

    if (!result.secure_url) {
      throw new BadRequestException('Image not uploaded');
    }
    const planet = this.planetRepository.create({
      ...createPlanetDto,
      image: result.secure_url,
    });
    return await this.planetRepository.save(planet);
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

  async update(
    id: number,
    updatePlanetDto: UpdatePlanetDTO,
    image: Express.Multer.File,
  ) {
    const planet = await this.planetRepository.findOneBy({ id });
    if (!planet) {
      throw new BadRequestException('Planet ID not found');
    }
    let result;
    if (image) {
      result = await this.cloudinary.uploadImage(image);

      if (!result.secure_url) {
        throw new BadRequestException('Fail to upload image');
      }
    }

    const updatedPlanet = {
      ...updatePlanetDto,
      image: image ? result.secure_url : planet.image,
    };

    return await this.planetRepository.update(id, updatedPlanet);
  }

  async remove(id: number) {
    const planet = await this.planetRepository.findOneBy({ id });
    if (!planet) {
      throw new BadRequestException('Planet ID not found');
    }
    return await this.planetRepository.softDelete(id);
  }
}
