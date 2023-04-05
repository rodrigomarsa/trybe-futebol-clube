import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import sequelize from '../database/models';
import { mockedLeaderboard, mockedLeaderboardAway, mockedLeaderboardHome } from './mocks/leaderboard.mock';
import { ILeaderboard } from '../services/interfaces/ILeaderboardService';
import LeaderboardService from '../services/LeaderboardService';

chai.use(chaiHttp);

const { expect } = chai;

describe('Consumo da rota /leaderboard', () => {
  let chaiHttpResponse: Response;

  afterEach(function() { sinon.restore() });

  it('endpoint GET/leaderboard/home retorna todos os times da casa', async () => {
    sinon
      .stub(sequelize, 'query')
      .resolves([...mockedLeaderboardHome as unknown[]] as [ILeaderboard[], null]);

    const chaiHttpResponse = await chai
       .request(app)
       .get('/leaderboard/home');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(mockedLeaderboardHome);
  });

  it('endpoint GET/leaderboard/away retorna todos os times visitantes', async () => {
    sinon
      .stub(sequelize, 'query')
      .resolves([...mockedLeaderboardAway as unknown[]] as [ILeaderboard[], null]);

    const chaiHttpResponse = await chai
       .request(app)
       .get('/leaderboard/away');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(mockedLeaderboardAway);
  });

  it('endpoint GET/leaderboard retorna a classificação geral dos times', async () => {
    sinon
      .stub(sequelize, 'query')
      .onFirstCall()
      .resolves(mockedLeaderboardHome as [unknown[], unknown])
      .onSecondCall()
      .resolves([...mockedLeaderboardAway as unknown[]] as [ILeaderboard[], null]);

    const chaiHttpResponse = await chai
       .request(app)
       .get('/leaderboard');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(mockedLeaderboard);
  });
});
