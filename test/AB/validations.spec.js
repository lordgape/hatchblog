const expect = require('chai').expect;

const DevToolkit = require('../../src/util/DevToolkit');


describe('Validations', function () {
  it('can validate empty tags', async function () {
    const isEmptyString = DevToolkit.isEmpty('');
    const isEmptyObject = DevToolkit.isEmpty({});
    const isNull = DevToolkit.isEmpty(null);
    const isUndefined = DevToolkit.isEmpty(undefined);
    expect(isEmptyString).to.deep.equal(true);
    expect(isEmptyObject).to.deep.equal(true);
    expect(isNull).to.deep.equal(true);
    expect(isUndefined).to.deep.equal(true);
  });
});
