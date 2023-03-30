import { expect } from 'chai';
import { Block } from '../src/base/block.mjs';
import { Statement } from '../src/base/statement.mjs';
import { SubshellBaseBlock } from '../src/components/subshell/subshell-base-block.mjs';

/* Helper class to instantiate Block. */
class BlockHelper extends Block {
    constructor(content?: any) {
        super(content);
    }
}

/* Helper class to instantiate SubshellBaseBlock. */
class SubshellBaseBlockHelper extends SubshellBaseBlock {
    /* Nothing to do. */
}

describe('SubshellBaseBlock tests', () => {
    describe('constructor', () => {
        describe('successful', () => {
            it('string value', () => {
                const value = 'echo "test"';
                const prefix = 'abc';
                const block = new SubshellBaseBlockHelper(prefix, new BlockHelper(value));

                expect(block.raw.length).to.be.equal(3);
                expect((block.raw[0] as Statement).value).to.be.equal(`${prefix}(`);
                expect((block.raw[2] as Statement).value).to.be.equal(')');
            });
        });

        describe('failed', () => {
            it('invalid opening-prefix provided', () => {
                expect(function() {
                    new SubshellBaseBlockHelper({} as any, new BlockHelper());
                }).to.throw('Invalid opening-prefix provided');
            });
        });
    });
});
