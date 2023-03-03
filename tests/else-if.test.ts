import { ElseIf } from '../src/components/flow/if/else-if.mjs';
import { expect } from 'chai';
import { Statement } from '../src/base/statement.mjs';

describe('ElseIf tests', () => {
    describe('constructor', () => {
        describe('successful', () => {
            it('construct', () => {
                const condition = '1 -eq 1';
                const content = 'echo 123';
                const elseIfBlock = new ElseIf(condition, content);

                expect(elseIfBlock.raw.length).to.be.equal(2);
                expect((elseIfBlock.raw[0] as Statement).value).to.be.equal(`elif [ ${condition} ]; then`);

                expect(elseIfBlock.content.length).to.be.equal(1);
                expect((elseIfBlock.content[0] as Statement).value).to.be.equal(content);
            });
        });
    });
});
