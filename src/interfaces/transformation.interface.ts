import { Character } from 'src/characters/entities/character.entity';

export interface ITransformation {
  id: number;
  name: string;
  image: string;
  ki: string;
  character: Character;
  deletedAt: Date;
}
