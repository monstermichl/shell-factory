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

                expect(whileBlock.variable.name).to.be.equal(variable);
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

            it('construct with empty string as value', () => {
                const variable = 'VARIABLE';
                const values = [''];
                const content = 'echo 123';
                const whileBlock = new IterationBlockHelper(KEYWORD, `$${variable}`, values, content);

                expect(whileBlock.raw.length).to.be.equal(3);
                expect((whileBlock.raw[0] as Statement).value).to.be.equal(`${KEYWORD} ${variable} in ""; do`);
                expect((whileBlock.raw[2] as Statement).value).to.be.equal(`done`);

                expect(whileBlock.content.length).to.be.equal(1);
                expect((whileBlock.content[0] as Statement).value).to.be.equal(content);
            });
        });

        describe('failed', () => {
            it('missing keyword', () => {
                expect(function() {
                    new IterationBlockHelper(undefined as any, '$variable', [1, 2])
                }).to.throw('Missing keyword');
            });

            it('invalid keyword type', () => {
                expect(function() {
                    new IterationBlockHelper({} as any, '$variable', [1, 2])
                }).to.throw('Invalid keyword type');
            });

            it('missing variable', () => {
                expect(function() {
                    new IterationBlockHelper(KEYWORD, undefined as any, [1, 2])
                }).to.throw('Missing variable');
            });

            it('invalid variable type', () => {
                expect(function() {
                    new IterationBlockHelper(KEYWORD, {} as any, [1, 2])
                }).to.throw('Invalid variable type');
            });

            it('missing values', () => {
                expect(function() {
                    new IterationBlockHelper(KEYWORD, '$variable', [])
                }).to.throw('Missing values');
            });

            it('Invalid iteration value provided', () => {
                expect(function() {
                    new IterationBlockHelper(KEYWORD, '$variable', [{}])
                }).to.throw('Invalid iteration value provided');
            });
        });
    });
});
