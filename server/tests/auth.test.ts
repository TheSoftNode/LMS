import request from 'supertest';
import { Express } from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { redis } from '../dataAccess/redis';
import User from '../models/user.model';
import app from '../startUps/app';

jest.mock('../emails/email');
jest.mock('../dataAccess/redis');

describe('Auth Controller', () =>
{
    let mongoServer: MongoMemoryServer;
    let testApp: Express;

    beforeAll(async () =>
    {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        await mongoose.connect(mongoUri);
        testApp = app;
    });

    afterAll(async () =>
    {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    beforeEach(async () =>
    {
        await User.deleteMany({});
        jest.clearAllMocks();
    });

    describe('verifyAccount', () => {
        it('should create an activation token and send an email', async () => {
          const response = await request(testApp)
            .post('/api/v1/users/verify-account')
            .send({
              name: 'Test User',
              email: 'test@example.com',
              password: 'password123',
              passwordConfirm: 'password123'
            });
    
          expect(response.status).toBe(201);
          expect(response.body.success).toBe(true);
          expect(response.body.activationToken).toBeDefined();
        });
    
        it('should return an error if email already exists', async () => {
          await User.create({
            name: 'Existing User',
            email: 'existing@example.com',
            password: 'password123',
            passwordConfirm: 'password123'
          });
    
          const response = await request(testApp)
            .post('/api/v1/users/verify-account')
            .send({
              name: 'Test User',
              email: 'existing@example.com',
              password: 'password123',
              passwordConfirm: 'password123'
            });
    
          expect(response.status).toBe(400);
          expect(response.body.message).toBe('Email Already exists');
        });
      });
    
})