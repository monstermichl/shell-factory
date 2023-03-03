import { StatementsBlock } from '../src/blocks/statements-block.mjs';

describe('StatementsBlock tests', () => {
    describe('constructor', () => {
        describe('successful', () => {
            it('construct', () => {
                new StatementsBlock('echo "test"');
            });
        });
    });
});
