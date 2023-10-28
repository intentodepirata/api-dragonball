import { Character } from 'src/characters/entities/character.entity';

export interface ITransformation {
  id: number;
  name: string;
  image: string;
  ki: number;
  character: Character;
  deletedAt: Date;
}
