import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import HttpStatus from 'http-status-codes';
import app from '../../src/index';
let loginToken;
let resetToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyN2NlZTAwMTliZjMxNjQzMGFlNjlmMCIsImVtYWlsIjoiZGlub2xhbDExMEBjdXBiZXN0LmNvbSIsImlhdCI6MTY1MjQ5NjMwOH0.Jn_z2d1zAVqm_hNqqzmpvWpAD1UPUuGEuWJudidNpkI";

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
        email: 'dinolal110@cupbest.com',
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
        email: 'dinolal110@cupbest.com',
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
        email: 'dinolal110@cupbest.com',
        password: '12345'
      };
      request(app)
        .post('/api/v1/users/login')
        .send(userdetails)
        .end((err, res) => {
          loginToken = res.body.data;
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
    it('given when user enter invalid details return 500', (done) => {
      const userdetails = {
        email: 'dinolal110@cupbest.com',
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
  describe('POST/forgotpassword', () => {
    it('sent resend code if email matches', (done) => {
      const userdetails = {
        email: 'dinolal110@cupbest.com'
      };
      request(app)
        .post('/api/v1/users/forgotpassword')
        .send(userdetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
        });
      done();
    });
  });
  describe('POST/resetpassword', () => {
    it('password updated successfully', (done) => {
      const userdetails = {
        password: '123456'
        
      };
      let resetToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyN2NlZTAwMTliZjMxNjQzMGFlNjlmMCIsImVtYWlsIjoiZGlub2xhbDExMEBjdXBiZXN0LmNvbSIsImlhdCI6MTY1MjQ5NjMwOH0.Jn_z2d1zAVqm_hNqqzmpvWpAD1UPUuGEuWJudidNpkI";
      request(app)
        .post('/api/v1/users/resetpassword')
        .send(userdetails)
        .set('token',`${resetToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  });
});
