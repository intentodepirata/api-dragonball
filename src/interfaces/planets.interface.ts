import { Character } from 'src/characters/entities/character.entity';

export interface IPlanet {
  id: number;
  name: string;
  characters: Character[];
  deletedAt: Date;
}
