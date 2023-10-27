import { Character } from 'src/characters/entities/character.entity';

export interface IPlanet {
  id: number;
  name: string;
  image: string;
  characters: Character[];
}
