import { expect } from 'chai';
import { Statement } from '../src/base/statement.mjs';

/* Helper class to instantiate Statement. */
class StatementHelper extends Statement {
    public get value(): string {
        return this.statement;
    }
}

describe('Statement tests', () => {
    describe('value', () => {
        describe('successful', () => {
            it('get', () => {
                const s = 'echo "test"';
                const statement = new StatementHelper(s);

                expect(statement.value).to.be.equal(s);
            });

            it('get undefined', () => {
                const statement = new StatementHelper();

                expect(statement.value).to.be.equal('');
            });
        });

        describe('failed', () => {
            it('set invalid type', () => {
                expect(function() {
                    new StatementHelper(4 as any)
                }).to.throw('Invalid Statement value type provided');
            });
        });
    });

    describe('compareIdOrPattern', () => {
        describe('successful', () => {
            it('invalid compare object', () => {
                expect(function() {
                    StatementHelper.compareIdOrPattern({} as any, /.+/);
                }).to.throw('Invalid compare object');
            });
        });
    });
});
