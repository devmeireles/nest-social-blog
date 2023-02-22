import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { faker } from '@faker-js/faker';
import { AppModule } from './../src/app.module';

describe('/auth AuthController', () => {
    let app: INestApplication;

    const commonUser: Record<string, any> = {
        email: faker.internet.email(),
        password: "aSuperStr0ngPassword!",
    }

    const wrongUser: Record<string, any> = {
        email: faker.internet.email(),
        password: "aSuperStr0ngPassword!",
    }

    const weakPasswordUser: Record<string, any> = {
        email: faker.internet.email(),
        password: "weakpass!",
    }

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                AppModule,
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    describe('/signup (POST)', () => {
        it('should creates an user', async () => {
            await request(app.getHttpServer())
                .post('/auth/signup')
                .send(commonUser)
                .expect(201);
        });

        it("shouldn't creates an user because the email already exists", async () => {
            const response = await request(app.getHttpServer())
                .post('/auth/signup')
                .send(commonUser)
                .expect(409);

            const { body } = response;

            expect(body).toHaveProperty('error');
            expect(body).toHaveProperty('message');
        });

        it("shouldn't creates an user due a weak password", async () => {
            const response = await request(app.getHttpServer())
                .post('/auth/signup')
                .send(weakPasswordUser)
                .expect(400);

            const { body } = response;

            expect(body).toHaveProperty('error');
            expect(body).toHaveProperty('message');
        });
    });

    describe('/signin (POST)', () => {
        it('should signs in', async () => {
            const response = await request(app.getHttpServer())
                .post('/auth/signin')
                .send(commonUser)
                .expect(200);

            const { body } = response;

            expect(body).not.toHaveProperty('error');
            expect(body).not.toHaveProperty('message');
            expect(body).toHaveProperty('accessToken');
        });

        it("shouldn't signs in due invalid credentials", async () => {
            const response = await request(app.getHttpServer())
                .post('/auth/signin')
                .send(wrongUser)
                .expect(401);

            const { body } = response;

            expect(body).toHaveProperty('error');
            expect(body).toHaveProperty('message');
            expect(body).not.toHaveProperty('accessToken');
        });
    });

    afterAll(async () => {
        await app.close();
    })
});
