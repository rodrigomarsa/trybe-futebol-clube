import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('ErrorMiddleware', () => {
  it('deve retornar status 500 para erros não conhecidos', async () => {
    const httpResponse = await chai
      .request(app)
      .get('/internal-error');
    expect(httpResponse.status).to.equal(500);
  });
})
