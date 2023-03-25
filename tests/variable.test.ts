import { expect } from 'chai';
import { Statement } from '../src/base/statement.mjs';
import { Variable } from '../src/base/variable.mjs';

/* Helper class to instantiate Variable. */
class VariableHelper extends Variable<number> {
    public compare(compareOperator: number, value?: string): Statement {
        return this._compare(compareOperator, value);
    }

    protected _convertValue(value?: string): string {
        return value || '';
    }

    protected _buildCompareString(compareOperator: number, value: string): string {
        let returnValue;

        switch (compareOperator) {
            case 0: returnValue = ''; break; /* No compare string. */
            case -1: returnValue = {} as string; break; /* Invalid return type. */
            default: returnValue = `${this.value} = ${value}`; break; /* Valid. */
        }
        return returnValue;
    }
}

/* Helper class to instantiate Statement. */
class StatementHelper extends Statement {
    public get value(): string {
        return this.statement;
    }
}

describe('Variable tests', () => {
    describe('constructor', () => {
        describe('successful', () => {
            it('valid name', () => {
                const name = 'test';
                const variable = new VariableHelper(name);

                expect(variable.name).to.be.equal(name);
                expect(variable.value).to.be.equal(`$\{${name}}`);
                expect(variable.local).to.be.false;
            });
        });

        describe('failed', () => {
            it('invalid variable name type provided', () => {
                expect(function() {
                    new VariableHelper({} as any);
                }).to.throw('Invalid variable name type provided');
            });

            it('invalid variable name provided', () => {
                expect(function() {
                    new VariableHelper('vari-able');
                }).to.throw('Invalid variable name provided');
            });
        });
    });

    describe('set', () => {
        describe('successful', () => {
            it('non local', () => {
                const name = 'test';
                const setValue = 4;
                const variable = new VariableHelper(name);

                expect(variable.set(setValue).value).to.be.equal(`${name}=${setValue}`);
            });

            it('local', () => {
                const name = 'test';
                const setValue = 4;
                const variable = new VariableHelper(name, true);

                expect(variable.set(setValue).value).to.be.equal(`local ${name}=${setValue}`);
            });

            it('local twice', () => {
                const name = 'test';
                const setValue1 = 4;
                const setValue2 = 5;
                const variable = new VariableHelper(name, true);

                expect(variable.set(setValue1).value).to.be.equal(`local ${name}=${setValue1}`);
                expect(variable.set(setValue2).value).to.be.equal(`${name}=${setValue2}`);
            });

            it('set Statement', () => {
                const name = 'test';
                const setValue = new StatementHelper('hello');
                const variable = new VariableHelper(name);

                expect(variable.set(setValue).value).to.be.equal(`${name}=${setValue.value}`);
            });
        });

        describe('failed', () => {
            it('invalid value type provided', () => {
                expect(function() {
                    new VariableHelper('hello').set({} as any);
                }).to.throw('Invalid value type provided');
            });
        });
    });

    describe('_compare', () => {
        describe('successful', () => {
            it('valid', () => {
                const name = 'test';
                const compareValue = 4;
                const variable = new VariableHelper(name);

                expect(variable.compare(2, `${compareValue}`).value).to.be.equal(`$\{${name}} = ${compareValue}`);
            });
        });

        describe('failed', () => {
            it('invalid compare operator', () => {
                expect(function() {
                    new VariableHelper('hello').compare(0, 'test');
                }).to.throw('Invalid compare operator');
            });

            it('returned compare value is not a string', () => {
                expect(function() {
                    new VariableHelper('hello').compare(-1, 'test');
                }).to.throw('Returned compare value is not a string');
            });
        });
    });
});
