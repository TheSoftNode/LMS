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
})