import { expect } from 'chai';
import { Block } from '../src/base/block.mjs';
import { Statement } from '../src/base/statement.mjs';
import { EvalSubshellBlock } from '../src/components/subshell/eval-subshell-block.mjs';

/* Helper class to instantiate Block. */
class BlockHelper extends Block {
    constructor(content?: any) {
        super(content);
    }
}

describe('EvalSubshellBlock tests', () => {
    describe('constructor', () => {
        describe('successful', () => {
            it('string value', () => {
                const value = 'echo "test"';
                const block = new EvalSubshellBlock(new BlockHelper(value));

                expect(block.raw.length).to.be.equal(3);
                expect((block.raw[0] as Statement).value).to.be.equal('$(');
                expect((block.raw[2] as Statement).value).to.be.equal(')');
            });
        });
    });
});
