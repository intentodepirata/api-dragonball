import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  create(user) {
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  update(id: number, user) {
    return this.userRepository.update(id, user);
  }

  remove(id: number) {
    return this.userRepository.softDelete(id);
  }
}
