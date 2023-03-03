import { expect } from 'chai';
import { Statement } from '../src/base/statement.mjs';
import { For } from '../src/components/flow/for/for.mjs';

describe('For tests', () => {
    describe('constructor', () => {
        describe('successful', () => {
            it('construct with variable with dollar sign', () => {
                const variable = 'VARIABLE';
                const values = 0;
                const content = 'echo 123';
                const whileBlock = new For(`$${variable}`, values, content);

                expect(whileBlock.raw.length).to.be.equal(3);
                expect((whileBlock.raw[0] as Statement).value).to.be.equal(`for ${variable} in ${values}; do`);
                expect((whileBlock.raw[2] as Statement).value).to.be.equal(`done`);

                expect(whileBlock.content.length).to.be.equal(1);
                expect((whileBlock.content[0] as Statement).value).to.be.equal(content);
            });

            it('construct with variable without dollar sign', () => {
                const variable = 'VARIABLE';
                const values = 'test';
                const content = 'echo 123';
                const whileBlock = new For(variable, values, content);

                expect(whileBlock.raw.length).to.be.equal(3);
                expect((whileBlock.raw[0] as Statement).value).to.be.equal(`for ${variable} in ${values}; do`);
                expect((whileBlock.raw[2] as Statement).value).to.be.equal(`done`);

                expect(whileBlock.content.length).to.be.equal(1);
                expect((whileBlock.content[0] as Statement).value).to.be.equal(content);
            });

            it('construct with multiple values', () => {
                const variable = 'VARIABLE';
                const values = ['test', 3];
                const content = 'echo 123';
                const whileBlock = new For(variable, values, content);

                expect(whileBlock.raw.length).to.be.equal(3);
                expect((whileBlock.raw[0] as Statement).value).to.be.equal(`for ${variable} in ${values.join(' ')}; do`);
                expect((whileBlock.raw[2] as Statement).value).to.be.equal(`done`);

                expect(whileBlock.content.length).to.be.equal(1);
                expect((whileBlock.content[0] as Statement).value).to.be.equal(content);
            });
        });

        describe('failed', () => {
            it('undefined variable', () => {
                try {
                    new For(undefined as any, [1, 2]);
                } catch (e: any) {
                    expect((e as Error).message).to.be.equal('Missing variable');
                }
            });

            it('empty values', () => {
                try {
                    new For('$variable', []);
                } catch (e: any) {
                    expect((e as Error).message).to.be.equal('Missing values');
                }
            });
        });
    });
});
