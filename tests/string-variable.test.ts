import { expect } from 'chai';
import { Statement } from '../src/base/statement.mjs';
import { StringVariable } from '../src/variables/string-variable.mjs';

/* Helper class to instantiate Statement. */
class StatementHelper extends Statement {
    public get value(): string {
        return this.statement;
    }
}

describe('StringVariable tests', () => {
    describe('isEqual', () => {
        describe('successful', () => {
            it('string value', () => {
                const name = 'test';
                const compareValue = 'world';
                const variable = new StringVariable(name);

                expect(variable.isEqual(compareValue).value).to.be.equal(`"$\{${name}}" = "${compareValue}"`);
            });

            it('number value', () => {
                const name = 'test';
                const compareValue = 3;
                const variable = new StringVariable(name);

                expect(variable.isEqual(compareValue).value).to.be.equal(`"$\{${name}}" = "${compareValue}"`);
            });

            it('empty value', () => {
                const name = 'test';
                const variable = new StringVariable(name);

                expect(variable.isEqual().value).to.be.equal(`"$\{${name}}" = ""`);
            });
        });
    });

    describe('isNotEqual', () => {
        describe('successful', () => {
            it('string value', () => {
                const name = 'test';
                const compareValue = 'world';
                const variable = new StringVariable(name);

                expect(variable.isNotEqual(compareValue).value).to.be.equal(`"$\{${name}}" != "${compareValue}"`);
            });
        });
    });

    describe('isEmpty', () => {
        describe('successful', () => {
            it('test', () => {
                const name = 'test';
                const variable = new StringVariable(name);

                expect(variable.isEmpty.value).to.be.equal(`-z "$\{${name}}"`);
            });
        });
    });

    describe('isNotEmpty', () => {
        describe('successful', () => {
            it('test', () => {
                const name = 'test';
                const variable = new StringVariable(name);

                expect(variable.isNotEmpty.value).to.be.equal(`-n "$\{${name}}"`);
            });
        });
    });

    describe('length', () => {
        describe('successful', () => {
            it('test', () => {
                const name = 'test';
                const variable = new StringVariable(name);

                expect(variable.length.value).to.be.equal(`$\{#${name}}`);
            });
        });
    });

    describe('append', () => {
        describe('successful', () => {
            it('string value', () => {
                const name = 'test';
                const appendValue = 'oh no';
                const variable = new StringVariable(name);

                expect(variable.append(appendValue).value).to.be.equal(`"$\{${name}}${appendValue}"`);
            });

            it('number value', () => {
                const name = 'test';
                const appendValue = 4;
                const variable = new StringVariable(name);

                expect(variable.append(appendValue).value).to.be.equal(`"$\{${name}}${appendValue}"`);
            });

            it('boolean value', () => {
                const name = 'test';
                const appendValue = true;
                const variable = new StringVariable(name);

                expect(variable.append(appendValue).value).to.be.equal(`"$\{${name}}${appendValue}"`);
            });
        });
    });

    describe('removeFront', () => {
        describe('successful', () => {
            it('lazy', () => {
                const name = 'test';
                const removeValue = 'removeMe';
                const variable = new StringVariable(name);

                expect(variable.removeFront(removeValue).value).to.be.equal(`"$\{${name}}#${removeValue}"`);
            });

            it('diligent', () => {
                const name = 'test';
                const removeValue = 'removeMe';
                const variable = new StringVariable(name);

                expect(variable.removeFront(removeValue, false).value).to.be.equal(`"$\{${name}}##${removeValue}"`);
            });
        });
    });

    describe('removeBack', () => {
        describe('successful', () => {
            it('lazy', () => {
                const name = 'test';
                const removeValue = 'removeMe';
                const variable = new StringVariable(name);

                expect(variable.removeBack(removeValue).value).to.be.equal(`"$\{${name}}%${removeValue}"`);
            });

            it('diligent', () => {
                const name = 'test';
                const removeValue = 'removeMe';
                const variable = new StringVariable(name);

                expect(variable.removeBack(removeValue, false).value).to.be.equal(`"$\{${name}}%%${removeValue}"`);
            });
        });
    });

    describe('replace', () => {
        describe('successful', () => {
            it('one', () => {
                const name = 'test';
                const searchValue = 'replaceMe';
                const replaceValue = 'withThat';
                const variable = new StringVariable(name);

                expect(variable.replace(searchValue, replaceValue).value).to.be.equal(`"$\{${name}}/${searchValue}/${replaceValue}"`);
            });

            it('all', () => {
                const name = 'test';
                const searchValue = 'replaceMe';
                const replaceValue = 'withThat';
                const variable = new StringVariable(name);

                expect(variable.replace(searchValue, replaceValue, true).value).to.be.equal(`"$\{${name}}//${searchValue}/${replaceValue}"`);
            });
        });
    });

    describe('substring', () => {
        describe('successful', () => {
            it('no parameters', () => {
                const name = 'test';
                const variable = new StringVariable(name);

                expect(variable.substring().value).to.be.equal(`"$\{${name}::}"`);
            });

            it('start parameter', () => {
                const name = 'test';
                const start = 1;
                const variable = new StringVariable(name);

                expect(variable.substring(start).value).to.be.equal(`"$\{${name}:${start}:}"`);
            });

            it('length parameter', () => {
                const name = 'test';
                const length = 4;
                const variable = new StringVariable(name);

                expect(variable.substring(undefined, length).value).to.be.equal(`"$\{${name}::${length}}"`);
            });

            it('start + length parameter', () => {
                const name = 'test';
                const start = 1;
                const length = 4;
                const variable = new StringVariable(name);

                expect(variable.substring(start, length).value).to.be.equal(`"$\{${name}:${start}:${length}}"`);
            });
        });

        describe('failed', () => {
            it('value is not a number', () => {
                expect(function() {
                    new StringVariable('test').substring('asdf' as any);
                }).to.throw('Value is not a number');
            });

            it('invalid value', () => {
                expect(function() {
                    new StringVariable('test').substring(-1);
                }).to.throw('Invalid value');
            });
        });
    });
});
