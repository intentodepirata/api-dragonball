import { Test, TestingModule } from '@nestjs/testing';
import { TransformationService } from './transformation.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Transformation } from './entities/transformation.entity';
import { Character } from 'src/characters/entities/character.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { BadRequestException } from '@nestjs/common';

const mockTransformation = {
  id: 1,
  name: 'Super Saiyan',
  ki: '100.000.000',
  image: 'https://example.com/ssj.webp',
  character: { id: 1, name: 'Goku' },
  deletedAt: null,
};

const mockCharacter = { id: 1, name: 'Goku' };

describe('TransformationService', () => {
  let service: TransformationService;

  const mockTransformationRepository = {
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
  };

  const mockCharacterRepository = {
    findOneBy: jest.fn(),
  };

  const mockCloudinaryService = {
    uploadImage: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransformationService,
        {
          provide: getRepositoryToken(Transformation),
          useValue: mockTransformationRepository,
        },
        {
          provide: getRepositoryToken(Character),
          useValue: mockCharacterRepository,
        },
        { provide: CloudinaryService, useValue: mockCloudinaryService },
      ],
    }).compile();

    service = module.get<TransformationService>(TransformationService);
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all transformations', async () => {
      mockTransformationRepository.find.mockResolvedValue([mockTransformation]);

      const result = await service.findAll();

      expect(result).toEqual([mockTransformation]);
      expect(mockTransformationRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a transformation with character relation', async () => {
      mockTransformationRepository.findOne.mockResolvedValue(
        mockTransformation,
      );

      const result = await service.findOne(1);

      expect(result).toEqual(mockTransformation);
      expect(mockTransformationRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['character'],
      });
    });
  });

  describe('update', () => {
    it('should update without changing character when character is not provided', async () => {
      const updateDto = { name: 'Super Saiyan 2' };
      const image = undefined;
      mockTransformationRepository.findOneBy.mockResolvedValue(
        mockTransformation,
      );
      mockTransformationRepository.create.mockReturnValue({
        name: 'Super Saiyan 2',
        image: mockTransformation.image,
      });

      await service.update(1, updateDto as any, image as any);

      expect(mockTransformationRepository.update).toHaveBeenCalledWith(1, {
        name: 'Super Saiyan 2',
        image: mockTransformation.image,
      });
      expect(mockCharacterRepository.findOneBy).not.toHaveBeenCalled();
    });

    it('should update with new character when character is provided', async () => {
      const updateDto = { name: 'Super Saiyan 2', character: 'Vegeta' };
      const image = undefined;
      mockTransformationRepository.findOneBy.mockResolvedValue(
        mockTransformation,
      );
      mockCharacterRepository.findOneBy.mockResolvedValue(mockCharacter);
      mockTransformationRepository.create.mockReturnValue({
        name: 'Super Saiyan 2',
        image: mockTransformation.image,
      });

      await service.update(1, updateDto as any, image as any);

      expect(mockCharacterRepository.findOneBy).toHaveBeenCalledWith({
        name: 'Vegeta',
      });
    });

    it('should throw when character is not found', async () => {
      const updateDto = { character: 'InvalidChar' };
      const image = undefined;
      mockTransformationRepository.findOneBy.mockResolvedValue(
        mockTransformation,
      );
      mockCharacterRepository.findOneBy.mockResolvedValue(null);

      await expect(
        service.update(1, updateDto as any, image as any),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw when transformation is not found', async () => {
      mockTransformationRepository.findOneBy.mockResolvedValue(null);

      await expect(
        service.update(999, {} as any, undefined as any),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('remove', () => {
    it('should soft-delete a transformation', async () => {
      mockTransformationRepository.softDelete.mockResolvedValue({
        affected: 1,
      });

      const result = await service.remove(1);

      expect(result).toEqual({ affected: 1 });
      expect(mockTransformationRepository.softDelete).toHaveBeenCalledWith(1);
    });
  });
});
