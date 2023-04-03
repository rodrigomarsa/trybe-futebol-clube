import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/UserModel';

import { Response } from 'superagent';
import { mockedToken, mockedUser } from './mocks/user.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Consumo da rota /login', () => {
  let chaiHttpResponse: Response;

  afterEach(function() { sinon.restore() });

  describe('endpoint POST/login', () => {
    it('retorna um erro sem informar um e-mail', async () => {  
      const chaiHttpResponse = await chai
         .request(app)
         .post('/login')
         .send({ password: '1234567' });
  
      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: "All fields must be filled"});
    });

    it('retorna um erro se informar um e-mail inválido', async () => {  
      const chaiHttpResponse = await chai
         .request(app)
         .post('/login')
         .send({ email: "user.com",
          password: '1234567' });
  
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: "Invalid email or password"});
    });

    it('retorna um erro sem informar um password', async () => {  
      const chaiHttpResponse = await chai
         .request(app)
         .post('/login')
         .send({ email: "user@user.com" });
  
      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: "All fields must be filled"});
    });

    it('retorna um erro se informar um password inválido', async () => {  
      const chaiHttpResponse = await chai
         .request(app)
         .post('/login')
         .send({ email: "user@user.com",
          password: 'teste' });
  
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: "Invalid email or password"});
    });
  
    it('retorna um token se o login for feito com sucesso', async () => {
      sinon
        .stub(UserModel, 'findOne')
        .resolves(mockedUser as UserModel);
      sinon
        .stub(jwt, 'sign')
        .resolves(mockedToken);
  
      const chaiHttpResponse = await chai
         .request(app)
         .post('/login')
         .send({ email: "user@user.com",
         password: 'secret_user' });
  
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal({ token: mockedToken });
    });
  });

  describe('endpoint GET/login/role', () => {
    it('retorna um erro sem informar um token', async () => {  
      const chaiHttpResponse = await chai
         .request(app)
         .get('/login/role');
  
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: "Token not found"});
    });

    it('retorna um erro se informar um token inválido', async () => {  
      const chaiHttpResponse = await chai
         .request(app)
         .get('/login/role')
         .set('Authorization', 'inválido');
  
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: "Token must be a valid token"});
    });
  
    it('retorna um tipo de usuário se o token for válido', async () => {
      sinon
        .stub(jwt, 'verify')
        .returns({ role: 'user' } as unknown as void);

      const chaiHttpResponse = await chai
         .request(app)
         .get('/login/role')
         .set('Authorization', 'token válido');
  
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal({ role: 'user' });
    });
  })
});
