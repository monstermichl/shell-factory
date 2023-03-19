import { expect } from 'chai';
import { Statement } from '../src/base/statement.mjs';
import { IterationBlock } from '../src/blocks/iteration-block.mjs';

const KEYWORD = 'for';

/* Helper class to instantiate IterationBlock. */
export class IterationBlockHelper extends IterationBlock {
    constructor(keyword: string, variable: string, arg: any, content?: any) {
        super(keyword, variable, arg, content);
    }
}

describe('IterationBlock tests', () => {
    describe('constructor', () => {
        describe('successful', () => {
            it('construct with variable with dollar sign', () => {
                const variable = 'VARIABLE';
                const values = 0;
                const content = 'echo 123';
                const whileBlock = new IterationBlockHelper(KEYWORD, `$${variable}`, values, content);

                expect(whileBlock.raw.length).to.be.equal(3);
                expect((whileBlock.raw[0] as Statement).value).to.be.equal(`${KEYWORD} ${variable} in ${values}; do`);
                expect((whileBlock.raw[2] as Statement).value).to.be.equal(`done`);

                expect(whileBlock.content.length).to.be.equal(1);
                expect((whileBlock.content[0] as Statement).value).to.be.equal(content);
            });

            it('construct with variable without dollar sign', () => {
                const variable = 'VARIABLE';
                const values = 'test';
                const content = 'echo 123';
                const whileBlock = new IterationBlockHelper(KEYWORD, variable, values, content);

                expect(whileBlock.raw.length).to.be.equal(3);
                expect((whileBlock.raw[0] as Statement).value).to.be.equal(`${KEYWORD} ${variable} in ${values}; do`);
                expect((whileBlock.raw[2] as Statement).value).to.be.equal(`done`);

                expect(whileBlock.content.length).to.be.equal(1);
                expect((whileBlock.content[0] as Statement).value).to.be.equal(content);
            });

            it('construct with multiple values', () => {
                const variable = 'VARIABLE';
                const values = ['test', 3];
                const content = 'echo 123';
                const whileBlock = new IterationBlockHelper(KEYWORD, variable, values, content);

                expect(whileBlock.raw.length).to.be.equal(3);
                expect((whileBlock.raw[0] as Statement).value).to.be.equal(`${KEYWORD} ${variable} in ${values.join(' ')}; do`);
                expect((whileBlock.raw[2] as Statement).value).to.be.equal(`done`);

                expect(whileBlock.content.length).to.be.equal(1);
                expect((whileBlock.content[0] as Statement).value).to.be.equal(content);
            });
        });

        describe('failed', () => {
            it('undefined keyword', () => {
                expect(function() {
                    new IterationBlockHelper(undefined as any, '$variable', [1, 2])
                }).to.throw('Missing keyword');
            });

            it('undefined variable', () => {
                expect(function() {
                    new IterationBlockHelper(KEYWORD, undefined as any, [1, 2])
                }).to.throw('Missing variable');
            });

            it('empty values', () => {
                expect(function() {
                    new IterationBlockHelper(KEYWORD, '$variable', [])
                }).to.throw('Missing values');
            });

            it('invalid value', () => {
                expect(function() {
                    new IterationBlockHelper(KEYWORD, '$variable', [{}])
                }).to.throw('Invalid iteration value provided');
            });
        });
    });
});
