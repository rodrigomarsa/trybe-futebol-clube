import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import { Model } from 'sequelize';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';

import { Response } from 'superagent';
import { mockedMatches, newMatchMocked } from './mocks/match.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Consumo da rota /matches', () => {
  let chaiHttpResponse: Response;

  afterEach(function() { sinon.restore() });

  describe('endpoint GET/matches', () => {
    it('endpoint GET/matches retorna todos as partidas', async () => {
      sinon
        .stub(MatchModel, 'findAll')
        .resolves(mockedMatches as unknown as MatchModel[]);
  
      const chaiHttpResponse = await chai
         .request(app)
         .get('/matches');
  
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(mockedMatches);
    });
  
    it('endpoint GET/matches?inProgress=true retorna as partidas em andamento', async () => {
      sinon
        .stub(MatchModel, 'findAll')
        .resolves(mockedMatches[0] as unknown as MatchModel[]);
  
      const chaiHttpResponse = await chai
         .request(app)
         .get('/matches?inProgress=true');
  
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(mockedMatches[0]);
    });
  
    it('endpoint GET/matches?inProgress=false retorna as partidas finalizadas', async () => {
      sinon
        .stub(MatchModel, 'findAll')
        .resolves(mockedMatches[1] as unknown as MatchModel[]);
  
      const chaiHttpResponse = await chai
         .request(app)
         .get('/matches?inProgress=false');
  
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(mockedMatches[1]);
    });
  });

  describe('endpoint PATCH/matches', () => {
    it('endpoint PATCH/matches/:id/finish finaliza uma partida no banco de dados', async () => {
      sinon
        .stub(MatchModel, 'update')
        .resolves();
      sinon
        .stub(jwt, 'verify')
        .resolves();
  
      const chaiHttpResponse = await chai
         .request(app)
         .patch('/matches/1/finish')
         .set('Authorization', 'token válido');
  
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: "Finished" });
    });

    it('endpoint PATCH/matches/:id atualiza o resultado de uma partida', async () => {
      sinon
        .stub(MatchModel, 'update')
        .resolves();
      sinon
        .stub(jwt, 'verify')
        .resolves();
  
      const chaiHttpResponse = await chai
         .request(app)
         .patch('/matches/1')
         .set('Authorization', 'token válido')
         .send({
          homeTeamGoals: 3,
          awayTeamGoals: 1
        });
  
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Score updated' });
    });
  });

  describe('endpoint POST/matches', () => {
    it('retorna um erro se informar dois times iguais', async () => {
      sinon
      .stub(jwt, 'verify')
      .resolves();

      const chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', 'token válido')
      .send({
       homeTeamId: 16,
       awayTeamId: 16,
       homeTeamGoals: 2,
       awayTeamGoals: 2
     });
  
      expect(chaiHttpResponse.status).to.be.equal(422);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: "It is not possible to create a match with two equal teams" });
    });

    it('retorna um erro se algum dos times não esteja cadastrado no banco de dados', async () => {
      sinon.stub(TeamModel, 'findByPk')
      .onFirstCall().resolves()
      .onSecondCall().resolves();
      sinon
      .stub(jwt, 'verify')
      .resolves();

      const chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', 'token válido')
      .send({
       homeTeamId: 1000,
       awayTeamId: 16,
       homeTeamGoals: 2,
       awayTeamGoals: 2
     });
  
      expect(chaiHttpResponse.status).to.be.equal(404);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: "There is no team with such id!" });
    });

    it('endpoint POST/matches cria uma nova partida em andamento no banco de dados', async () => {
      sinon.stub(TeamModel, 'findByPk')
      .onFirstCall().resolves(mockedMatches[0] as unknown as Model)
      .onSecondCall().resolves(mockedMatches[1] as unknown as Model)
      sinon
        .stub(MatchModel, 'create')
        .resolves(newMatchMocked as unknown as Model);
      sinon
        .stub(jwt, 'verify')
        .resolves();
  
      const chaiHttpResponse = await chai
         .request(app)
         .post('/matches')
         .set('Authorization', 'token válido')
         .send({
          homeTeamId: 16,
          awayTeamId: 8,
          homeTeamGoals: 2,
          awayTeamGoals: 2
        });
  
      expect(chaiHttpResponse.status).to.be.equal(201);
      expect(chaiHttpResponse.body).to.be.deep.equal(newMatchMocked);
    });
  });

});
