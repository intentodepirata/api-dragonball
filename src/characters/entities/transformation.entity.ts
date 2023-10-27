import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Character } from './character.entity';
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
  ki: number;

  @ManyToOne(() => Character, (character) => character.transformations)
  character: Character;
}
