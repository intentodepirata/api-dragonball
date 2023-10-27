import { Transformation } from 'src/characters/entities/transformation.entity';
import { Affiliation } from 'src/constants/affiliation';
import { Gender } from 'src/constants/gender';
import { Race } from 'src/constants/race';
import { Planet } from 'src/planets/entities/planet.entity';

export interface ICharacter {
  id: number;
  name: string;
  race: Race;
  maxKi: number;
  gender: Gender;
  age: number;
  description: string;
  image: string;
  originPlanet: Planet;
  transformations: Transformation[];
  affiliation: Affiliation;
}
