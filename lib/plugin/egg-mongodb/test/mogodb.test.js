'use strict';

const mock = require('egg-mock');

describe('test/mogodb.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/mogodb-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, mogodb')
      .expect(200);
  });
});
