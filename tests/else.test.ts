import { Else } from '../src/components/flow/if/else.mjs';
import { expect } from 'chai';
import { Statement } from '../src/base/statement.mjs';

describe('Else tests', () => {
    describe('constructor', () => {
        describe('successful', () => {
            it('construct', () => {
                const content = 'echo 123';
                const elseIfBlock = new Else(content);

                expect(elseIfBlock.raw.length).to.be.equal(2);
                expect((elseIfBlock.raw[0] as Statement).value).to.be.equal(`else`);

                expect(elseIfBlock.content.length).to.be.equal(1);
                expect((elseIfBlock.content[0] as Statement).value).to.be.equal(content);
            });
        });
    });
});
