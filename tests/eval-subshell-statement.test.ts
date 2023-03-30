import { expect } from 'chai';
import { EvalSubshellStatement } from '../src/components/subshell/eval-subshell-statement.mjs';

describe('EvalSubshellStatement tests', () => {
    describe('constructor', () => {
        describe('successful', () => {
            it('string value', () => {
                const value = 'echo "test"';
                const statement = new EvalSubshellStatement(value);

                expect(statement.value).to.be.equal(`$(${value})`);
            });
        });
    });
});
