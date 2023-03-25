import { expect } from 'chai';
import { Statement } from '../src/base/statement.mjs';
import { NumberVariable } from '../src/variables/number-variable.mjs';

describe('NumberVariable tests', () => {
    describe('isEqual', () => {
        describe('successful', () => {
            it('string value', () => {
                const name = 'test';
                const compareValue = '3';
                const variable = new NumberVariable(name);

                expect(variable.isEqual(compareValue).value).to.be.equal(`$\{${name}} -eq ${compareValue}`);
            });

            it('number value', () => {
                const name = 'test';
                const compareValue = 3;
                const variable = new NumberVariable(name);

                expect(variable.isEqual(compareValue).value).to.be.equal(`$\{${name}} -eq ${compareValue}`);
            });

            it('undefined value', () => {
                const name = 'test';
                const variable = new NumberVariable(name);

                expect(variable.isEqual(undefined as any).value).to.be.equal(`$\{${name}} -eq 0`);
            });
        });
    });

    describe('isNotEqual', () => {
        describe('successful', () => {
            it('number value', () => {
                const name = 'test';
                const compareValue = 3;
                const variable = new NumberVariable(name);

                expect(variable.isNotEqual(compareValue).value).to.be.equal(`$\{${name}} -ne ${compareValue}`);
            });

            it('undefined value', () => {
                const name = 'test';
                const variable = new NumberVariable(name);

                expect(variable.isNotEqual(undefined as any).value).to.be.equal(`$\{${name}} -ne 0`);
            });
        });
    });

    describe('isLess', () => {
        describe('successful', () => {
            it('number value', () => {
                const name = 'test';
                const compareValue = 3;
                const variable = new NumberVariable(name);

                expect(variable.isLess(compareValue).value).to.be.equal(`$\{${name}} -lt ${compareValue}`);
            });

            it('undefined value', () => {
                const name = 'test';
                const variable = new NumberVariable(name);

                expect(variable.isLess(undefined as any).value).to.be.equal(`$\{${name}} -lt 0`);
            });
        });
    });

    describe('isLessOrEqual', () => {
        describe('successful', () => {
            it('number value', () => {
                const name = 'test';
                const compareValue = 3;
                const variable = new NumberVariable(name);

                expect(variable.isLessOrEqual(compareValue).value).to.be.equal(`$\{${name}} -le ${compareValue}`);
            });

            it('undefined value', () => {
                const name = 'test';
                const variable = new NumberVariable(name);

                expect(variable.isLessOrEqual(undefined as any).value).to.be.equal(`$\{${name}} -le 0`);
            });
        });
    });

    describe('isGreater', () => {
        describe('successful', () => {
            it('number value', () => {
                const name = 'test';
                const compareValue = 3;
                const variable = new NumberVariable(name);

                expect(variable.isGreater(compareValue).value).to.be.equal(`$\{${name}} -gt ${compareValue}`);
            });

            it('undefined value', () => {
                const name = 'test';
                const variable = new NumberVariable(name);

                expect(variable.isGreater(undefined as any).value).to.be.equal(`$\{${name}} -gt 0`);
            });
        });
    });

    describe('isGreaterOrEqual', () => {
        describe('successful', () => {
            it('number value', () => {
                const name = 'test';
                const compareValue = 3;
                const variable = new NumberVariable(name);

                expect(variable.isGreaterOrEqual(compareValue).value).to.be.equal(`$\{${name}} -ge ${compareValue}`);
            });

            it('undefined value', () => {
                const name = 'test';
                const variable = new NumberVariable(name);

                expect(variable.isGreaterOrEqual(undefined as any).value).to.be.equal(`$\{${name}} -ge 0`);
            });
        });
    });

    describe('add', () => {
        describe('successful', () => {
            it('number value', () => {
                const name = 'test';
                const addValue = 3;
                const variable = new NumberVariable(name);

                expect(variable.add(addValue).value).to.be.equal(`\`expr $\{${name}} + ${addValue}\``);
            });

            it('empty value', () => {
                const name = 'test';
                const variable = new NumberVariable(name);

                expect(variable.add('').value).to.be.equal(`\`expr $\{${name}} + 0\``);
            });

            it('undefined value', () => {
                const name = 'test';
                const variable = new NumberVariable(name);

                expect(variable.add(undefined as any).value).to.be.equal(`\`expr $\{${name}} + 0\``);
            });
        });

        describe('failed', () => {
            it('invalid type of right operand', () => {
                expect(function() {
                    new NumberVariable('test').add({} as any);
                }).to.throw('Invalid type of right operand');
            });
        });
    });

    describe('subtract', () => {
        describe('successful', () => {
            it('number value', () => {
                const name = 'test';
                const subtractValue = 3;
                const variable = new NumberVariable(name);

                expect(variable.subtract(subtractValue).value).to.be.equal(`\`expr $\{${name}} - ${subtractValue}\``);
            });

            it('undefined value', () => {
                const name = 'test';
                const variable = new NumberVariable(name);

                expect(variable.subtract(undefined as any).value).to.be.equal(`\`expr $\{${name}} - 0\``);
            });
        });
    });

    describe('multiply', () => {
        describe('successful', () => {
            it('number value', () => {
                const name = 'test';
                const multiplyValue = 3;
                const variable = new NumberVariable(name);

                expect(variable.multiply(multiplyValue).value).to.be.equal(`\`expr $\{${name}} * ${multiplyValue}\``);
            });

            it('undefined value', () => {
                const name = 'test';
                const variable = new NumberVariable(name);

                expect(variable.multiply(undefined as any).value).to.be.equal(`\`expr $\{${name}} * 0\``);
            });
        });
    });

    describe('divide', () => {
        describe('successful', () => {
            it('number value', () => {
                const name = 'test';
                const multiplyValue = 3;
                const variable = new NumberVariable(name);

                expect(variable.divide(multiplyValue).value).to.be.equal(`\`expr $\{${name}} / ${multiplyValue}\``);
            });

            it('undefined value', () => {
                const name = 'test';
                const variable = new NumberVariable(name);

                expect(variable.divide(undefined as any).value).to.be.equal(`\`expr $\{${name}} / 1\``);
            });
        });

        describe('failed', () => {
            it('division by 0 is not a good idea', () => {
                expect(function() {
                    new NumberVariable('test').divide(0);
                }).to.throw('Division by 0 is not a good idea');
            });
        });
    });

    describe('modulo', () => {
        describe('successful', () => {
            it('number value', () => {
                const name = 'test';
                const moduloValue = 4;
                const variable = new NumberVariable(name);

                expect(variable.modulo(moduloValue).value).to.be.equal(`\`expr $\{${name}} % ${moduloValue}\``);
            });

            it('undefined value', () => {
                const name = 'test';
                const variable = new NumberVariable(name);

                expect(variable.modulo(undefined as any).value).to.be.equal(`\`expr $\{${name}} % 1\``);
            });
        });
    });

    describe('increment', () => {
        describe('successful', () => {
            it('test', () => {
                const name = 'test';
                const variable = new NumberVariable(name);

                expect(variable.increment().value).to.be.equal(`\`expr $\{${name}} + 1\``);
            });
        });
    });

    describe('decrement', () => {
        describe('successful', () => {
            it('test', () => {
                const name = 'test';
                const variable = new NumberVariable(name);

                expect(variable.decrement().value).to.be.equal(`\`expr $\{${name}} - 1\``);
            });
        });
    });
});
