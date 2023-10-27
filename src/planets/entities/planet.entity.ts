import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Character } from '../../characters/entities/character.entity';
import { IPlanet } from 'src/interfaces/planets.interface';

@Entity('planets')
export class Planet implements IPlanet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  isDestroyed: boolean;

  @Column('text')
  description: string;

  @Column()
  image: string;

  @OneToMany(() => Character, (character) => character.originPlanet)
  characters: Character[];
}
