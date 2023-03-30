import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/TeamModel';

import { Response } from 'superagent';
import { mockedTeams } from './mocks/team.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Consumo da rota /teams', () => {
  let chaiHttpResponse: Response;

  afterEach(function() { sinon.restore() });

  it('endpoint GET/teams retorna todos os times', async () => {
    sinon
      .stub(TeamModel, 'findAll')
      .resolves(mockedTeams as unknown as TeamModel[]);

    const chaiHttpResponse = await chai
       .request(app)
       .get('/teams');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(mockedTeams);
  });

  it('endpoint GET/teams/:id retorna um time específico', async () => {
    sinon
      .stub(TeamModel, 'findByPk')
      .resolves(mockedTeams[0] as unknown as TeamModel);

    const chaiHttpResponse = await chai
       .request(app)
       .get('/teams/1');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(mockedTeams[0]);
  });
});
