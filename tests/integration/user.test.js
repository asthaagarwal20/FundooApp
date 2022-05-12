import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import HttpStatus from 'http-status-codes';
import app from '../../src/index';

describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

  describe('POST/registration', () => {
    it('given new user when added should return status 201', (done) => {
      const userdetails = {
        firstname: 'Ritu',
        lastname: 'Singh',
        email: 'nadab48562@3dmasti.com',
        password: '12345'
      };
      request(app)
        .post('/api/v1/users/register')
        .send(userdetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
          done();
        });
    });
    it('given when user enter invalid details return 500', (done) => {
      const userdetails = {
        firstname: 'Ritu',
        lastname: 'Singh',
        email: 'nadab48562@3dmasti.com',
        password: '12345'
      };
      request(app)
        .post('/api/v1/users/register')
        .send(userdetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
          done();
        });
    });
  });

  describe('POST/login', () => {
    it('given new user when added should return status 200', (done) => {
      const userdetails = {
        email: 'nadab48562@3dmasti.com',
        password: '12345'
      };
      request(app)
        .post('/api/v1/users/login')
        .send(userdetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
    it('given when user enter invalid details return 500', (done) => {
      const userdetails = {
        email: 'nadab48562@3dmasti.com',
        password: '1235'
      };
      request(app)
        .post('/api/v1/users/login')
        .send(userdetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
          done();
        });
    });
  });
});
