import { Test, TestingModule } from '@nestjs/testing';
import { CharactersService } from './characters.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { Planet } from 'src/planets/entities/planet.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { BadRequestException } from '@nestjs/common';

const mockCharacter = {
  id: 1,
  name: 'Goku',
  ki: '60.000.000',
  maxKi: '90 Septillion',
  race: 'Saiyan',
  gender: 'Male',
  description: 'Test',
  image: 'https://example.com/goku.webp',
  affiliation: 'Z Fighter',
  originPlanet: { id: 2, name: 'Tierra' },
  transformations: [],
  deletedAt: null,
};

const mockPlanet = {
  id: 2,
  name: 'Tierra',
  isDestroyed: false,
  description: 'Earth',
  image: '',
  deletedAt: null,
};

describe('CharactersService', () => {
  let service: CharactersService;

  const mockCharacterRepository = {
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
  };

  const mockPlanetRepository = {
    findOneBy: jest.fn(),
  };

  const mockCloudinaryService = {
    uploadImage: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CharactersService,
        {
          provide: getRepositoryToken(Character),
          useValue: mockCharacterRepository,
        },
        { provide: getRepositoryToken(Planet), useValue: mockPlanetRepository },
        { provide: CloudinaryService, useValue: mockCloudinaryService },
      ],
    }).compile();

    service = module.get<CharactersService>(CharactersService);
    jest.clearAllMocks();
  });

  describe('findOne', () => {
    it('should return a character with relations', async () => {
      mockCharacterRepository.findOne.mockResolvedValue(mockCharacter);

      const result = await service.findOne(1);

      expect(result).toEqual(mockCharacter);
      expect(mockCharacterRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['originPlanet', 'transformations'],
      });
    });

    it('should throw when character is not found', async () => {
      mockCharacterRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(BadRequestException);
    });
  });

  describe('filter', () => {
    it('should filter by name', async () => {
      mockCharacterRepository.find.mockResolvedValue([mockCharacter]);

      const result = await service.filter(
        'Goku',
        undefined,
        undefined,
        undefined,
      );

      expect(result).toEqual([mockCharacter]);
      expect(mockCharacterRepository.find).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update without changing planet when originPlanet is not provided', async () => {
      const updateDto = { name: 'Goku Updated' };
      const image = undefined;
      mockCharacterRepository.findOneBy.mockResolvedValue(mockCharacter);

      await service.update(1, updateDto as any, image as any);

      expect(mockCharacterRepository.update).toHaveBeenCalledWith(1, {
        name: 'Goku Updated',
        image: mockCharacter.image,
      });
      expect(mockPlanetRepository.findOneBy).not.toHaveBeenCalled();
    });

    it('should update with new planet when originPlanet is provided', async () => {
      const updateDto = { name: 'Goku Updated', originPlanet: 'Namek' };
      const image = undefined;
      mockCharacterRepository.findOneBy.mockResolvedValue(mockCharacter);
      mockPlanetRepository.findOneBy.mockResolvedValue(mockPlanet);

      await service.update(1, updateDto as any, image as any);

      expect(mockCharacterRepository.update).toHaveBeenCalledWith(1, {
        name: 'Goku Updated',
        image: mockCharacter.image,
        originPlanet: mockPlanet,
      });
      expect(mockPlanetRepository.findOneBy).toHaveBeenCalledWith({
        name: 'Namek',
      });
    });

    it('should throw when originPlanet is not found', async () => {
      const updateDto = { name: 'Goku Updated', originPlanet: 'InvalidPlanet' };
      const image = undefined;
      mockCharacterRepository.findOneBy.mockResolvedValue(mockCharacter);
      mockPlanetRepository.findOneBy.mockResolvedValue(null);

      await expect(
        service.update(1, updateDto as any, image as any),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw when character is not found', async () => {
      mockCharacterRepository.findOneBy.mockResolvedValue(null);

      await expect(
        service.update(999, {} as any, undefined as any),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('remove', () => {
    it('should soft-delete a character', async () => {
      mockCharacterRepository.findOneBy.mockResolvedValue(mockCharacter);
      mockCharacterRepository.softDelete.mockResolvedValue({ affected: 1 });

      const result = await service.remove(1);

      expect(result).toEqual({ affected: 1 });
      expect(mockCharacterRepository.softDelete).toHaveBeenCalledWith(1);
    });

    it('should throw when character is not found', async () => {
      mockCharacterRepository.findOneBy.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(BadRequestException);
    });
  });
});
