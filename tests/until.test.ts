import { expect } from 'chai';
import { Statement } from '../src/base/statement.mjs';
import { Until } from '../src/components/flow/until/until.mjs';

describe('Until tests', () => {
    describe('constructor', () => {
        describe('successful', () => {
            it('construct', () => {
                const condition = '1 -eq 1';
                const content = 'echo 123';
                const whileBlock = new Until(condition, content);

                expect(whileBlock.raw.length).to.be.equal(3);
                expect((whileBlock.raw[0] as Statement).value).to.be.equal(`until [ ${condition} ]; do`);
                expect((whileBlock.raw[2] as Statement).value).to.be.equal(`done`);

                expect(whileBlock.content.length).to.be.equal(1);
                expect((whileBlock.content[0] as Statement).value).to.be.equal(content);
            });
        });
    });
});
