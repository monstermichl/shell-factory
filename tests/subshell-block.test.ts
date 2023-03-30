import { expect } from 'chai';
import { Block } from '../src/base/block.mjs';
import { Statement } from '../src/base/statement.mjs';
import { SubshellBlock } from '../src/components/subshell/subshell-block.mjs';

/* Helper class to instantiate Block. */
class BlockHelper extends Block {
    constructor(content?: any) {
        super(content);
    }
}

describe('SubshellBlock tests', () => {
    describe('constructor', () => {
        describe('successful', () => {
            it('string value', () => {
                const value = 'echo "test"';
                const block = new SubshellBlock(new BlockHelper(value));

                expect(block.raw.length).to.be.equal(3);
                expect((block.raw[0] as Statement).value).to.be.equal('(');
                expect((block.raw[2] as Statement).value).to.be.equal(')');
            });
        });
    });

    describe('eval', () => {
        describe('successful', () => {
            it('string value', () => {
                const value = 'echo "test"';
                const block = new SubshellBlock(new BlockHelper(value)).eval();

                expect(block.raw.length).to.be.equal(3);
                expect((block.raw[0] as Statement).value).to.be.equal('$(');
                expect((block.raw[2] as Statement).value).to.be.equal(')');
            });
        });
    });
});
