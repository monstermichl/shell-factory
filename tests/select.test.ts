import { expect } from 'chai';
import { Statement } from '../src/base/statement.mjs';
import { Select } from '../src/components/select/select.mjs';

describe('Select tests', () => {
    describe('constructor', () => {
        describe('successful', () => {
            it('construct', () => {
                const variable = 'VARIABLE';
                const values = 0;
                const content = 'echo 123';
                const whileBlock = new Select(`$${variable}`, values, content);

                expect(whileBlock.raw.length).to.be.equal(3);
                expect((whileBlock.raw[0] as Statement).value).to.be.equal(`select ${variable} in ${values}; do`);
                expect((whileBlock.raw[2] as Statement).value).to.be.equal(`done`);

                expect(whileBlock.content.length).to.be.equal(1);
                expect((whileBlock.content[0] as Statement).value).to.be.equal(content);
            });
        });
    });
});
