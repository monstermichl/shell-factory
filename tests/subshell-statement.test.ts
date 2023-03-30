import { expect } from 'chai';
import { SubshellStatement } from '../src/components/subshell/subshell-statement.mjs';

describe('SubshellStatement tests', () => {
    describe('constructor', () => {
        describe('successful', () => {
            it('string value', () => {
                const value = 'echo "test"';
                const statement = new SubshellStatement(value);

                expect(statement.value).to.be.equal(`(${value})`);
            });
        });
    });

    describe('eval', () => {
        describe('successful', () => {
            it('string value', () => {
                const value = 'echo "test"';
                const statement = new SubshellStatement(value).eval();

                expect(statement.value).to.be.equal(`$(${value})`);
            });
        });
    });
});
