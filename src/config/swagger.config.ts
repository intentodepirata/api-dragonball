import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .setTitle('Dragonball API Rest')
  .setDescription('Documentación oficial de  www.dragonball-api.com')
  .setVersion('1.0')
  .build();
