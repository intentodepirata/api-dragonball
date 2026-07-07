import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

const mockUser = {
  id: 1,
  name: 'Test User',
  email: 'test@test.com',
  password: '$2a$10$hashedpassword',
  deleteAt: null,
};

describe('AuthService', () => {
  let service: AuthService;

  const mockUsersService = {
    findOneByEmail: jest.fn(),
    create: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should create a user and strip password from response', async () => {
      const dto = {
        name: 'Test User',
        email: 'test@test.com',
        password: 'password123',
      };
      mockUsersService.findOneByEmail.mockResolvedValue(null);
      mockUsersService.create.mockResolvedValue({ ...mockUser });

      const result = await service.register(dto);

      expect(mockUsersService.findOneByEmail).toHaveBeenCalledWith(
        'test@test.com',
      );
      expect(mockUsersService.create).toHaveBeenCalled();
      expect(result).not.toHaveProperty('password');
      expect(result).toHaveProperty('email', 'test@test.com');
      expect(result).toHaveProperty('name', 'Test User');
    });

    it('should throw when email already exists', async () => {
      const dto = {
        name: 'Test User',
        email: 'existing@test.com',
        password: 'password123',
      };
      mockUsersService.findOneByEmail.mockResolvedValue(mockUser);

      await expect(service.register(dto)).rejects.toThrow(BadRequestException);
      expect(mockUsersService.findOneByEmail).toHaveBeenCalledWith(
        'existing@test.com',
      );
      expect(mockUsersService.create).not.toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('should return access_token and user name on success', async () => {
      const dto = { email: 'test@test.com', password: 'password123' };
      mockUsersService.findOneByEmail.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compareSync').mockReturnValue(true);
      mockJwtService.signAsync.mockResolvedValue('jwt-token');

      const result = await service.login(dto);

      expect(result).toEqual({ access_token: 'jwt-token', user: 'Test User' });
      expect(mockUsersService.findOneByEmail).toHaveBeenCalledWith(
        'test@test.com',
      );
    });

    it('should throw when email is wrong', async () => {
      const dto = { email: 'wrong@test.com', password: 'password123' };
      mockUsersService.findOneByEmail.mockResolvedValue(null);

      await expect(service.login(dto)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw when password is wrong', async () => {
      const dto = { email: 'test@test.com', password: 'wrongpassword' };
      mockUsersService.findOneByEmail.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compareSync').mockReturnValue(false);

      await expect(service.login(dto)).rejects.toThrow(UnauthorizedException);
    });
  });
});
