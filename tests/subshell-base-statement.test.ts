import { expect } from 'chai';
import { SubshellBaseStatement } from '../src/components/subshell/subshell-base-statement.mjs';

/* Helper class to instantiate SubshellBaseStatement. */
class SubshellBaseStatementHelper extends SubshellBaseStatement {
    /* Nothing to do. */
}

describe('SubshellBaseStatement tests', () => {
    describe('constructor', () => {
        describe('successful', () => {
            it('string value', () => {
                const value = 'echo "test"';
                const prefix = 'abc';
                const statement = new SubshellBaseStatementHelper(prefix, value);

                expect(statement.value).to.be.equal(`${prefix}(${value})`);
            });
        });

        describe('failed', () => {
            it('invalid opening-prefix provided', () => {
                expect(function() {
                    new SubshellBaseStatementHelper({} as any, 'echo "whatever"');
                }).to.throw('Invalid opening-prefix provided');
            });
        });
    });
});
