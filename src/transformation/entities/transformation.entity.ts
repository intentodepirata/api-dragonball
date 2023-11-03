import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  DeleteDateColumn,
} from 'typeorm';
import { Character } from '../../characters/entities/character.entity';
import { ITransformation } from 'src/interfaces/transformation.interface';

@Entity('transformations')
export class Transformation implements ITransformation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  ki: string;

  @ManyToOne(() => Character, (character) => character.transformations)
  character: Character;

  @DeleteDateColumn()
  deletedAt: Date;
}
