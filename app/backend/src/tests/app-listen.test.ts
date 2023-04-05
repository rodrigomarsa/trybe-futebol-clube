import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

const PORT = 5555;

describe('App', () => {
  let server = app;

  it('deve chamar o método listen com a porta solicitada', (done) => {
    const appSpy = sinon.spy(server, 'listen');
    server.listen(PORT);
    expect(appSpy.calledWith(PORT)).to.equal(true);
    done();
  });

  it('testa rota home "/"', async function() {
    const httpResponse = await chai
      .request(app)
      .get('/');
    expect(httpResponse.status).to.be.equal(200);
  });
});
