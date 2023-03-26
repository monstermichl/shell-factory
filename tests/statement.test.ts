import { expect } from 'chai';
import { randomUUID } from 'crypto';
import { Statement } from '../src/base/statement.mjs';

/* Helper class to instantiate Statement. */
class StatementHelper extends Statement {
    public get value(): string {
        return this.statement;
    }
}

describe('Statement tests', () => {
    describe('constructor', () => {
        describe('successful', () => {
            it('string value', () => {
                const value = 'echo "test"';
                const statement = new StatementHelper(value);

                expect(statement.value).to.be.equal(value);
            });

            it('value from Statement', () => {
                const value = new StatementHelper('echo "test"');
                const statement = new StatementHelper(value);

                expect(statement.value).to.be.equal(value.value);
            });
        });
    });

    describe('value', () => {
        describe('successful', () => {
            it('get', () => {
                const value = 'echo "test"';
                const statement = new StatementHelper(value);

                expect(statement.value).to.be.equal(value);
            });

            it('get undefined', () => {
                const statement = new StatementHelper();

                expect(statement.value).to.be.equal('');
            });
        });

        describe('failed', () => {
            it('invalid Statement value type provided', () => {
                expect(function() {
                    new StatementHelper({} as any);
                }).to.throw('Invalid Statement value type provided');
            });
        });
    });

    describe('compareIdOrPattern', () => {
        describe('failed', () => {
            it('id (instance)', () => {
                const statement = new StatementHelper();

                expect(statement.compareIdOrPattern(statement.id)).to.be.true;
            });

            it('id (static)', () => {
                const statement = new StatementHelper();

                expect(StatementHelper.compareIdOrPattern(statement, statement.id)).to.be.true;
            });

            it('pattern (static)', () => {
                const statement = new StatementHelper('echo "test"');

                expect(StatementHelper.compareIdOrPattern(statement, statement.value)).to.be.true;
            });
        });

        describe('failed', () => {
            it('invalid compare object', () => {
                expect(function() {
                    StatementHelper.compareIdOrPattern({} as any, /.+/);
                }).to.throw('Invalid compare object');
            });
        });
    });
});
