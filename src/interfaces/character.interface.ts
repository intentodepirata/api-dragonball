import { Transformation } from 'src/transformation/entities/transformation.entity';
import { Affiliation } from 'src/constants/affiliation';
import { Gender } from 'src/constants/gender';
import { Race } from 'src/constants/race';
import { Planet } from 'src/planets/entities/planet.entity';

export interface ICharacter {
  id: number;
  name: string;
  race: Race;
  ki: string;
  maxKi: string;
  gender: Gender;

  description: string;
  originPlanet: Planet;
  transformations: Transformation[];
  affiliation: Affiliation;
  deletedAt: Date;
}
