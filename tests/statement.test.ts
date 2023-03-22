import { expect } from 'chai';
import { Statement } from '../src/base/statement.mjs';
import { ChainType } from '../src/interfaces/chainable.mjs';

describe('Statement tests', () => {
    describe('value', () => {
        describe('successful', () => {
            it('get', () => {
                const s = 'echo "test"';
                const statement = new Statement(s);

                expect(statement.value).to.be.equal(s);
            });

            it('get undefined', () => {
                const statement = new Statement();

                expect(statement.value).to.be.equal('');
            });

            it('get read chained', () => {
                const statementValue = 'echo "Hello World"';
                const chainValue = 'test.txt';
                const statement = new Statement(statementValue).read(chainValue);

                expect(statement.value).to.be.equal(`${statementValue} < ${chainValue}`);
            });

            it('get write chained', () => {
                const statementValue = 'echo "Hello World"';
                const chainValue = 'test.txt';
                const statement = new Statement(statementValue).write(chainValue);

                expect(statement.value).to.be.equal(`${statementValue} > ${chainValue}`);
            });

            it('get append chained', () => {
                const statementValue = 'echo "Hello World"';
                const chainValue = 'test.txt';
                const statement = new Statement(statementValue).append(chainValue);

                expect(statement.value).to.be.equal(`${statementValue} >> ${chainValue}`);
            });

            it('get pipe chained', () => {
                const statementValue = 'echo "Hello World"';
                const chainValue = 'cat';
                const statement = new Statement(statementValue).pipe(chainValue);

                expect(statement.value).to.be.equal(`${statementValue} | ${chainValue}`);
            });

            it('get pipe and write chained', () => {
                const statementValue = 'echo "Hello World"';
                const chainValue1 = 'grep -e "He"';
                const chainValue2 = 'test.txt';
                const statement = new Statement(statementValue).pipe(chainValue1).write(chainValue2);

                expect(statement.value).to.be.equal(`${statementValue} | ${chainValue1} > ${chainValue2}`);
            });
        });

        describe('failed', () => {
            it('set invalid type', () => {
                expect(function() {
                    new Statement(4 as any)
                }).to.throw('Invalid Statement value type provided');
            });

            it('unsupported operator', () => {
                const statement = new Statement('echo "Hello World")').write('test.txt');

                expect(statement.chain.length).to.be.equal(1);
                statement.chain[0].type = 25; /* Set invalid type. */

                expect(function() {
                    statement.value;
                }).to.throw('Unsupported operator');
            });
        });
    });

    describe('read', () => {
        describe('successful', () => {
            it('valid path', () => {
                const source = 'test.txt';
                const statement = new Statement('echo "hello"');

                expect(statement.chain.length).to.be.equal(0);
                expect(statement.read(source)).to.be.equal(statement);

                expect(statement.chain.length).to.be.equal(1);
                expect(statement.chain[0].type).to.be.equal(ChainType.Read);
                expect((statement.chain[0].target as Statement)?.statement).to.be.equal(source);
            });

            it('instance of Statement', () => {
                const source = new Statement('test.txt');
                const statement = new Statement('echo "hello"');

                expect(statement.chain.length).to.be.equal(0);
                expect(statement.read(source)).to.be.equal(statement);

                expect(statement.chain.length).to.be.equal(1);
                expect(statement.chain[0].type).to.be.equal(ChainType.Read);
                expect(statement.chain[0].target).to.be.equal(source);
            });
        });

        describe('failed', () => {
            it('an empty statement cannot be chained', () => {
                expect(function() {
                    new Statement().read('cat')
                }).to.throw('An empty statement cannot be chained');
            });

            it('no input file provided', () => {
                expect(function() {
                    new Statement('echo "hello"').read('')
                }).to.throw('No source provided');
            });

            it('invalid file path type', () => {
                expect(function() {
                    new Statement('echo "hello"').read({} as any)
                }).to.throw('Invalid source type provided');
            });
        });
    });

    describe('write', () => {
        describe('successful', () => {
            it('valid path', () => {
                const target = 'test.txt';
                const statement = new Statement('echo "hello"');

                expect(statement.chain.length).to.be.equal(0);
                expect(statement.write(target)).to.be.equal(statement);

                expect(statement.chain.length).to.be.equal(1);
                expect(statement.chain[0].type).to.be.equal(ChainType.Write);
                expect((statement.chain[0].target as Statement)?.statement).to.be.equal(target);
            });
        });
    });

    describe('append', () => {
        describe('successful', () => {
            it('valid path', () => {
                const target = 'test.txt';
                const statement = new Statement('echo "hello"');

                expect(statement.chain.length).to.be.equal(0);
                expect(statement.append(target)).to.be.equal(statement);

                expect(statement.chain.length).to.be.equal(1);
                expect(statement.chain[0].type).to.be.equal(ChainType.Append);
                expect((statement.chain[0].target as Statement)?.statement).to.be.equal(target);
            });
        });
    });

    describe('pipe', () => {
        describe('successful', () => {
            it('valid path', () => {
                const target = 'test';
                const statement = new Statement('echo "hello"');

                expect(statement.chain.length).to.be.equal(0);
                expect(statement.pipe(target)).to.be.equal(statement);

                expect(statement.chain.length).to.be.equal(1);
                expect(statement.chain[0].type).to.be.equal(ChainType.Pipe);
                expect((statement.chain[0].target as Statement)?.statement).to.be.equal(target);
            });
        });
    });

    describe('findInChain', () => {
        describe('successful', () => {
            it('pattern', () => {
                const s = 'echo "test"';
                const chainValue1 = 'grep -e "est"';
                const chainValue2 = 'cut -d" " -f1';
                const chainValue3 = 'test.txt';
                const statement = new Statement(s);

                /* Prepare chain. */
                statement
                    .pipe(chainValue1)
                    .pipe(chainValue2)
                    .write(chainValue3);
                
                expect(statement.chain.length).to.be.equal(3);
                const found = statement.findInChain(/cut/);

                expect(found.length).to.be.equal(1);
                expect(found[0].target.value).to.be.equal(chainValue2);
            });

            it('pattern with type', () => {
                const s = 'echo "test"';
                const chainValue1 = 'grep -e "est"';
                const chainValue2 = 'cut -d" " -f1';
                const chainValue3 = 'test.txt';
                const statement = new Statement(s);

                /* Prepare chain. */
                statement
                    .pipe(chainValue1)
                    .pipe(chainValue2)
                    .write(chainValue3);
                
                expect(statement.chain.length).to.be.equal(3);
                const found = statement.findInChain(/.*/, ChainType.Pipe);

                expect(found.length).to.be.equal(2);
                expect(found[0].target.value).to.be.equal(chainValue1);
                expect(found[1].target.value).to.be.equal(chainValue2);
            });

            it('only type', () => {
                const s = 'echo "test"';
                const chainValue1 = 'grep -e "est"';
                const chainValue2 = 'cut -d" " -f1';
                const chainValue3 = 'test.txt';
                const statement = new Statement(s);

                /* Prepare chain. */
                statement
                    .pipe(chainValue1)
                    .pipe(chainValue2)
                    .write(chainValue3);
                
                expect(statement.chain.length).to.be.equal(3);
                const found = statement.findInChain(ChainType.Write);

                expect(found.length).to.be.equal(1);
                expect(found[0].target.value).to.be.equal(chainValue3);
            });
        });

        describe('failed', () => {
            it('invalid ID or pattern type', () => {
                const statement = new Statement('echo "test"').write('test.txt');
                
                expect(function() {
                    statement.findInChain(25);
                }).to.throw('Invalid ID or pattern type');
            });
        });
    });

    describe('removeFromChain', () => {
        describe('successful', () => {
            it('pattern', () => {
                const s = 'echo "test"';
                const chainValue1 = 'grep -e "est"';
                const chainValue2 = new Statement('cut -d" " -f1');
                const chainValue3 = 'test.txt';
                const statement = new Statement(s);

                /* Prepare chain. */
                statement
                    .pipe(chainValue1)
                    .pipe(chainValue2)
                    .write(chainValue3);
                
                expect(statement.chain.length).to.be.equal(3);
                expect(statement.removeFromChain(chainValue2.id)).to.be.equal(statement);

                expect(statement.chain.length).to.be.equal(2);
                expect(statement.chain[0].target.value).to.be.equal(chainValue1);
                expect(statement.chain[1].target.value).to.be.equal(chainValue3);
            });

            it('pattern with type', () => {
                const s = 'echo "test"';
                const chainValue1 = 'grep -e "est"';
                const chainValue2 = 'cut -d" " -f1';
                const chainValue3 = 'test.txt';
                const statement = new Statement(s);

                /* Prepare chain. */
                statement
                    .pipe(chainValue1)
                    .pipe(chainValue2)
                    .write(chainValue3);
                
                    expect(statement.chain.length).to.be.equal(3);
                    expect(statement.removeFromChain(/.+/, ChainType.Pipe)).to.be.equal(statement);
    
                    expect(statement.chain.length).to.be.equal(1);
                    expect(statement.chain[0].target.value).to.be.equal(chainValue3);
            });

            it('only type', () => {
                const s = 'echo "test"';
                const chainValue1 = 'grep -e "est"';
                const chainValue2 = 'cut -d" " -f1';
                const chainValue3 = 'test.txt';
                const statement = new Statement(s);

                /* Prepare chain. */
                statement
                    .pipe(chainValue1)
                    .pipe(chainValue2)
                    .write(chainValue3);
                
                    expect(statement.chain.length).to.be.equal(3);
                    expect(statement.removeFromChain(ChainType.Pipe)).to.be.equal(statement);
    
                    expect(statement.chain.length).to.be.equal(1);
                    expect(statement.chain[0].target.value).to.be.equal(chainValue3);
            });
        });

        describe('failed', () => {
            it('invalid ID or pattern type', () => {
                const statement = new Statement('echo "test"').write('test.txt');
                
                expect(function() {
                    statement.removeFromChain(25);
                }).to.throw('Invalid ID or pattern type');
            });
        });
    });

    describe('clearChain', () => {
        describe('successful', () => {
            it('clear', () => {
                const s = 'echo "test"';
                const chainValue1 = 'grep -e "est"';
                const chainValue2 = 'cut -d" " -f1';
                const chainValue3 = 'test.txt';
                const statement = new Statement(s);

                /* Prepare chain. */
                statement
                    .pipe(chainValue1)
                    .pipe(chainValue2)
                    .write(chainValue3);
                
                expect(statement.chain.length).to.be.equal(3);
                expect(statement.clearChain()).to.be.equal(statement);
                expect(statement.chain.length).to.be.equal(0);
            });
        });
    });

    describe('compareIdOrPattern', () => {
        describe('successful', () => {
            it('invalid compare object', () => {
                expect(function() {
                    Statement.compareIdOrPattern({} as any, /.+/);
                }).to.throw('Invalid compare object');
            });
        });
    });
});
