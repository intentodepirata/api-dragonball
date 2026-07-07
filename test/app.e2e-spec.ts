import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('App (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('GET /api/characters returns paginated characters', () => {
    return request(app.getHttpServer())
      .get('/api/characters?limit=1')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('items');
        expect(res.body).toHaveProperty('meta');
        expect(res.body.meta).toHaveProperty('totalItems');
        expect(res.body.items.length).toBeLessThanOrEqual(1);
      });
  });

  it('GET /api/planets returns paginated planets', () => {
    return request(app.getHttpServer())
      .get('/api/planets?limit=1')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('items');
        expect(res.body).toHaveProperty('meta');
      });
  });

  it('GET /api/characters/:id returns a single character', () => {
    return request(app.getHttpServer())
      .get('/api/characters/1')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('id', 1);
        expect(res.body).toHaveProperty('name');
        expect(res.body).toHaveProperty('originPlanet');
        expect(res.body).toHaveProperty('transformations');
      });
  });

  it('GET /api/characters/999 returns 400 for non-existent character', () => {
    return request(app.getHttpServer()).get('/api/characters/999').expect(400);
  });

  afterAll(async () => {
    await app.close();
  });
});
