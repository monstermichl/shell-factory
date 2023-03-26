import { Function } from '../src/components/function/function.mjs';
import { expect } from 'chai';
import { Statement } from '../src/base/statement.mjs';
import { StringVariable } from '../src/variables/string-variable.mjs';

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

            describe('successful with string parameters', () => {
                it('construct', () => {
                    const name = '_exit';
                    const content = 'echo "Test"';
                    const firstParameter = 'a';
                    const secondParameter = 'b';
                    const functionBlock = new Function(name, content, [firstParameter, secondParameter]);

                    expect(functionBlock.raw.length).to.be.equal(3);;
                    expect(functionBlock.content.length).to.be.equal(3);
                    expect((functionBlock.content[0] as Statement).value).to.be.equal(`local ${firstParameter}="$1"`);
                    expect((functionBlock.content[1] as Statement).value).to.be.equal(`local ${secondParameter}="$2"`);
                    expect((functionBlock.content[2] as Statement).value).to.be.equal(content);

                    expect(functionBlock.parameters.length).to.be.equal(2);
                    expect(functionBlock.parameters[0].value).to.be.equal(`$\{${firstParameter}}`);
                    expect(functionBlock.parameters[1].value).to.be.equal(`$\{${secondParameter}}`);
                });
            });

            describe('successful with Parameter parameters', () => {
                it('construct', () => {
                    const name = '_exit';
                    const content = ['echo "Test"'];
                    const firstParameter = 'a';
                    const secondParameter = 'b';
                    const functionBlock = new Function(name, content, [
                        new StringVariable(firstParameter),
                        new StringVariable(secondParameter),
                    ]);

                    expect(functionBlock.raw.length).to.be.equal(3);;
                    expect(functionBlock.content.length).to.be.equal(3);
                    expect((functionBlock.content[0] as Statement).value).to.be.equal(`${firstParameter}="$1"`);
                    expect((functionBlock.content[1] as Statement).value).to.be.equal(`${secondParameter}="$2"`);
                    expect((functionBlock.content[2] as Statement).value).to.be.equal(content[0]);

                    expect(functionBlock.parameters.length).to.be.equal(2);
                    expect(functionBlock.parameters[0].value).to.be.equal(`$\{${firstParameter}}`);
                    expect(functionBlock.parameters[1].value).to.be.equal(`$\{${secondParameter}}`);
                });
            });
        });

        describe('failed', () => {
            it('missing function name', () => {
                expect(function() {
                    new Function('');
                }).to.throw('Missing function name');
            });

            it('invalid function name type', () => {
                expect(function() {
                    new Function({} as any);
                }).to.throw('Invalid function name type provided');
            });

            it('invalid name', () => {
                expect(function() {
                    new Function('echo function');
                }).to.throw('Invalid function name');
            });

            it('undefined parameter name', () => {
                expect(function() {
                    new Function('_exit', 'echo "Test"', ['']);
                }).to.throw('Invalid variable name provided');
            });

            it('invalid parameter type', () => {
                expect(function() {
                    new Function('_exit', 'echo "Test"', ([1] as unknown[]) as string[]);
                }).to.throw('Parameter 0 is neither a string nor a Variable class instance');
            });
        });
    });

    describe('call', () => {
        describe('successful', () => {
            it('with different parameter types', () => {
                const name = 'test';
                const param1 = true;
                const param2 = 2;
                const param3 = 'three with space';
                const testFunc = new Function(name);
                const statement = testFunc.call(param1, param2, param3);

                expect(statement).to.be.not.null;
                expect(statement.value).to.be.equal(`${name} ${param1} ${param2} "${param3}"`);
            });
        });

        describe('failed', () => {
            it('with invalid parameter type', () => {
                expect(function() {
                    new Function('test').call({} as any)
                }).to.throw('Parameter is neither string nor number nor boolean');
            });
        });
    });
});

