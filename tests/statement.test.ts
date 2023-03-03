import { expect } from 'chai';
import { Statement } from '../src/base/statement.mjs';

describe('Statement tests', () => {
    describe('value', () => {
        describe('successful', () => {
            it('get', () => {
                const s = 'echo "test"';
                const statement = new Statement(s);

                expect(statement.value).to.be.equal(s);
            });

            it('get undefined', () => {
                const statement = new Statement();

                expect(statement.value).to.be.equal('');
            });
        });
    });
});
