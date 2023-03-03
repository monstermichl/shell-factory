import { Function } from '../src/components/function/function.mjs';
import { expect } from 'chai';
import { Statement } from '../src/base/statement.mjs';

describe('Function tests', () => {
    describe('constructor', () => {
        describe('successful', () => {
            it('construct', () => {
                const name = '_exit';
                const content = 'echo "Test"';
                const functionBlock = new Function(name, content);

                expect(functionBlock.raw.length).to.be.equal(3);
                expect((functionBlock.raw[0] as Statement).value).to.be.equal(`${name}() {`);
                expect((functionBlock.raw[2] as Statement).value).to.be.equal(`}`);

                expect(functionBlock.content.length).to.be.equal(1);
                expect((functionBlock.content[0] as Statement).value).to.be.equal(content);
            });
        });

        describe('failed', () => {
            it('undefined name', () => {
                try {
                    new Function('');
                } catch (e: any) {
                    expect((e as Error).message).to.be.equal('Missing function name');
                }
            });

            it('invalid name', () => {
                try {
                    new Function('echo function');
                } catch (e: any) {
                    expect((e as Error).message).to.be.equal('Invalid function name');
                }
            });
        });
    });
});

