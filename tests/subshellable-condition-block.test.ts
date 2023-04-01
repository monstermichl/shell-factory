import { expect } from 'chai';
import { Statement } from '../src/base/statement.mjs';
import { SubshellableConditionBlock } from '../src/blocks/subshellable-condition-block.mjs';

/* Helper class to instantiate SubshellableConditionBlock. */
class SubshellableConditionBlockHelper extends SubshellableConditionBlock {
    constructor(conditionKeyword: string, condition: any, blockStartKeyword: string, content?: any, blockEndKeyword?: string) {
        super(conditionKeyword, condition, blockStartKeyword, content, blockEndKeyword);
    }
}

describe('SubshellableConditionBlock tests', () => {
    describe('subshell', () => {
        describe('successful', () => {
            it('check', () => {
                const conditionKeyword = 'if';
                const blockStartKeyword = 'then';
                const condition = '1 -eq 1';
                const blockEndKeyword = 'fi';
                const block = new SubshellableConditionBlockHelper(
                    conditionKeyword,
                    condition,
                    blockStartKeyword,
                    undefined,
                    blockEndKeyword,
                );
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
                const conditionKeyword = 'if';
                const blockStartKeyword = 'then';
                const condition = '1 -eq 1';
                const blockEndKeyword = 'fi';
                const block = new SubshellableConditionBlockHelper(
                    conditionKeyword,
                    condition,
                    blockStartKeyword,
                    undefined,
                    blockEndKeyword,
                );
                const subshell = block.eval();

                expect(subshell.raw.length).to.be.equal(3);
                expect((subshell.raw[0] as Statement).value).to.be.equal('$(');
                expect((subshell.raw[2] as Statement).value).to.be.equal(')');
                expect(subshell.content[0]).to.be.equal(block);
            });
        });
    });
});
