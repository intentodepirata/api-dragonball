import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CharactersModule } from './characters/characters.module';
import { PlanetsModule } from './planets/planets.module';
import { TransformationModule } from './transformation/transformation.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'images'),
      serveStaticOptions: {
        maxAge: 30 * 24 * 60 * 60,
        index: false,
      },
    }),
    CharactersModule,
    PlanetsModule,
    TransformationModule,
    CloudinaryModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
