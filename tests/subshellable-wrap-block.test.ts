import { expect } from 'chai';
import { Statement } from '../src/base/statement.mjs';
import { SubshellableWrapBlock } from '../src/blocks/subshellable-wrap-block.mjs';

/* Helper class to instantiate SubshellableWrapBlock. */
class SubshellableWrapBlockHelper extends SubshellableWrapBlock {
    public constructor(openingStatement: any, content?: any, closingStatement?: any) {
        super(openingStatement, content, closingStatement);
    }
}

describe('SubshellableConditionBlock tests', () => {
    describe('subshell', () => {
        describe('successful', () => {
            it('check', () => {
                const block = new SubshellableWrapBlockHelper('if', 'echo "test"', 'fi');
                const subshell = block.subshell();

                expect(subshell.raw.length).to.be.equal(3);
                expect((subshell.raw[0] as Statement).value).to.be.equal('(');
                expect((subshell.raw[2] as Statement).value).to.be.equal(')');
                expect(subshell.content[0]).to.be.equal(block);
            });
        });
    });

    describe('subshell', () => {
        describe('successful', () => {
            it('check', () => {
                const block = new SubshellableWrapBlockHelper('if', 'echo "test"', 'fi');
                const subshell = block.eval();

                expect(subshell.raw.length).to.be.equal(3);
                expect((subshell.raw[0] as Statement).value).to.be.equal('$(');
                expect((subshell.raw[2] as Statement).value).to.be.equal(')');
                expect(subshell.content[0]).to.be.equal(block);
            });
        });
    });
});
