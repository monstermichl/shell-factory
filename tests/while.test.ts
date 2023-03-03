import { expect } from 'chai';
import { Statement } from '../src/base/statement.mjs';
import { While } from '../src/components/flow/while/while.mjs';

describe('While tests', () => {
    describe('constructor', () => {
        describe('successful', () => {
            it('construct', () => {
                const condition = '1 -eq 1';
                const content = 'echo 123';
                const whileBlock = new While(condition, content);

                expect(whileBlock.raw.length).to.be.equal(3);
                expect((whileBlock.raw[0] as Statement).value).to.be.equal(`while [ ${condition} ]; do`);
                expect((whileBlock.raw[2] as Statement).value).to.be.equal(`done`);

                expect(whileBlock.content.length).to.be.equal(1);
                expect((whileBlock.content[0] as Statement).value).to.be.equal(content);
            });
        });
    });
});
