import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';
import { Transformation } from '../../transformation/entities/transformation.entity';
import { Planet } from 'src/planets/entities/planet.entity';
import { ICharacter } from 'src/interfaces/character.interface';
import { Race } from 'src/constants/race';
import { Gender } from 'src/constants/gender';
import { Affiliation } from 'src/constants/affiliation';

@Entity('characters')
export class Character implements ICharacter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'bigint' })
  maxKi: number;

  @Column({ type: 'enum', enum: Race })
  race: Race;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column()
  age: string;

  @Column('text')
  description: string;

  @Column()
  image: string;

  @ManyToOne(() => Planet, (planet) => planet.characters)
  originPlanet: Planet;

  @OneToMany(() => Transformation, (transformation) => transformation.character)
  transformations: Transformation[];

  @Column({ type: 'enum', enum: Affiliation })
  affiliation: Affiliation;

  @DeleteDateColumn()
  deletedAt: Date;
}
