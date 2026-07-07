import { Test, TestingModule } from '@nestjs/testing';
import { PlanetsService } from './planets.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Planet } from './entities/planet.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { BadRequestException } from '@nestjs/common';

const mockPlanet = {
  id: 1,
  name: 'Namek',
  isDestroyed: true,
  description: 'Home of Namekians',
  image: 'https://example.com/namek.webp',
  characters: [],
  deletedAt: null,
};

describe('PlanetsService', () => {
  let service: PlanetsService;

  const mockPlanetRepository = {
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
  };

  const mockCloudinaryService = {
    uploadImage: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlanetsService,
        { provide: getRepositoryToken(Planet), useValue: mockPlanetRepository },
        { provide: CloudinaryService, useValue: mockCloudinaryService },
      ],
    }).compile();

    service = module.get<PlanetsService>(PlanetsService);
    jest.clearAllMocks();
  });

  describe('findOne', () => {
    it('should return a planet with relations', async () => {
      mockPlanetRepository.findOne.mockResolvedValue(mockPlanet);

      const result = await service.findOne(1);

      expect(result).toEqual(mockPlanet);
      expect(mockPlanetRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['characters'],
      });
    });

    it('should throw when planet is not found', async () => {
      mockPlanetRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(BadRequestException);
    });
  });

  describe('filter', () => {
    it('should filter by name', async () => {
      mockPlanetRepository.find.mockResolvedValue([mockPlanet]);

      const result = await service.filter('Namek', undefined);

      expect(result).toEqual([mockPlanet]);
      expect(mockPlanetRepository.find).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update planet', async () => {
      const updateDto = { name: 'New Namek' };
      const image = undefined;
      mockPlanetRepository.findOneBy.mockResolvedValue(mockPlanet);

      await service.update(1, updateDto as any, image as any);

      expect(mockPlanetRepository.update).toHaveBeenCalledWith(1, {
        name: 'New Namek',
        image: mockPlanet.image,
      });
    });

    it('should throw when planet is not found', async () => {
      mockPlanetRepository.findOneBy.mockResolvedValue(null);

      await expect(
        service.update(999, {} as any, undefined as any),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('remove', () => {
    it('should soft-delete a planet', async () => {
      mockPlanetRepository.findOneBy.mockResolvedValue(mockPlanet);
      mockPlanetRepository.softDelete.mockResolvedValue({ affected: 1 });

      const result = await service.remove(1);

      expect(result).toEqual({ affected: 1 });
      expect(mockPlanetRepository.softDelete).toHaveBeenCalledWith(1);
    });

    it('should throw when planet is not found', async () => {
      mockPlanetRepository.findOneBy.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(BadRequestException);
    });
  });
});
