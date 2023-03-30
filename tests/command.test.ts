import { expect } from 'chai';
import { Command } from '../src/base/command.mjs';
import { Statement } from '../src/base/statement.mjs';
import { LogicalConnectType } from '../src/interfaces/logically-connectable.mjs';
import { OperationalConnectType } from '../src/interfaces/operationally-connectable.mjs';

/**
 * Helper class to instantiate a simple Statement.
 */
class StatementHelper extends Statement {
    /**
     * Returns the statement.
     */
    public get value(): string {
        return this.statement;
    }
}

describe('Command tests', () => {
    describe('value', () => {
        describe('successful', () => {
            it('get read chained', () => {
                const statementValue = 'echo "Hello World"';
                const chainValue = 'test.txt';
                const statement = new Command(statementValue).read(chainValue);

                expect(statement.value).to.be.equal(`${statementValue} < ${chainValue}`);
            });

            it('get write chained', () => {
                const statementValue = 'echo "Hello World"';
                const chainValue = 'test.txt';
                const statement = new Command(statementValue).write(chainValue);

                expect(statement.value).to.be.equal(`${statementValue} > ${chainValue}`);
            });

            it('get append chained', () => {
                const statementValue = 'echo "Hello World"';
                const chainValue = 'test.txt';
                const statement = new Command(statementValue).append(chainValue);

                expect(statement.value).to.be.equal(`${statementValue} >> ${chainValue}`);
            });

            it('get pipe chained', () => {
                const statementValue = 'echo "Hello World"';
                const chainValue = 'cat';
                const statement = new Command(statementValue).pipe(chainValue);

                expect(statement.value).to.be.equal(`${statementValue} | ${chainValue}`);
            });

            it('get pipe and write chained', () => {
                const statementValue = 'echo "Hello World"';
                const chainValue1 = 'grep -e "He"';
                const chainValue2 = 'test.txt';
                const statement = new Command(statementValue).pipe(chainValue1).write(chainValue2);

                expect(statement.value).to.be.equal(`${statementValue} | ${chainValue1} > ${chainValue2}`);
            });
        });

        describe('failed', () => {
            it('unsupported operator', () => {
                const statement = new Command('echo "Hello World")').write('test.txt');

                expect(statement.chain.length).to.be.equal(1);
                statement.chain[0].type = 'nevermind' as OperationalConnectType; /* Set invalid type. */

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
                const statement = new Command('echo "hello"');

                expect(statement.chain.length).to.be.equal(0);
                expect(statement.read(source)).to.be.equal(statement);

                expect(statement.chain.length).to.be.equal(1);
                expect(statement.chain[0].type).to.be.equal(OperationalConnectType.Read);
                expect((statement.chain[0].target as Command)?.statement).to.be.equal(source);

                expect(statement.value).to.be.equal(`${statement.statement} < ${source}`);
            });

            it('instance of Command', () => {
                const source = new Command('test.txt');
                const statement = new Command('echo "hello"');

                expect(statement.chain.length).to.be.equal(0);
                expect(statement.read(source)).to.be.equal(statement);

                expect(statement.chain.length).to.be.equal(1);
                expect(statement.chain[0].type).to.be.equal(OperationalConnectType.Read);
                expect(statement.chain[0].target).to.be.equal(source);
            });

            it('instance of Statement', () => {
                const source = new StatementHelper('test.txt');
                const statement = new Command('echo "hello"');

                expect(statement.chain.length).to.be.equal(0);
                expect(statement.read(source)).to.be.equal(statement);

                expect(statement.chain.length).to.be.equal(1);
                expect(statement.chain[0].type).to.be.equal(OperationalConnectType.Read);
                expect(statement.chain[0].target.value).to.be.equal(source.value);
            });
        });

        describe('failed', () => {
            it('an empty statement cannot be chained', () => {
                expect(function() {
                    new Command().read('cat')
                }).to.throw('An empty statement cannot be chained');
            });

            it('no input file provided', () => {
                expect(function() {
                    new Command('echo "hello"').read('')
                }).to.throw('No source provided');
            });

            it('invalid file path type', () => {
                expect(function() {
                    new Command('echo "hello"').read({} as any)
                }).to.throw('Invalid source type provided');
            });
        });
    });

    describe('write', () => {
        describe('successful', () => {
            it('valid path', () => {
                const target = 'test.txt';
                const statement = new Command('echo "hello"');

                expect(statement.chain.length).to.be.equal(0);
                expect(statement.write(target)).to.be.equal(statement);

                expect(statement.chain.length).to.be.equal(1);
                expect(statement.chain[0].type).to.be.equal(OperationalConnectType.Write);
                expect((statement.chain[0].target as Command)?.statement).to.be.equal(target);

                expect(statement.value).to.be.equal(`${statement.statement} > ${target}`);
            });
        });
    });

    describe('append', () => {
        describe('successful', () => {
            it('valid path', () => {
                const target = 'test.txt';
                const statement = new Command('echo "hello"');

                expect(statement.chain.length).to.be.equal(0);
                expect(statement.append(target)).to.be.equal(statement);

                expect(statement.chain.length).to.be.equal(1);
                expect(statement.chain[0].type).to.be.equal(OperationalConnectType.Append);
                expect((statement.chain[0].target as Command)?.statement).to.be.equal(target);

                expect(statement.value).to.be.equal(`${statement.statement} >> ${target}`);
            });
        });
    });

    describe('pipe', () => {
        describe('successful', () => {
            it('valid path', () => {
                const target = 'test';
                const statement = new Command('echo "hello"');

                expect(statement.chain.length).to.be.equal(0);
                expect(statement.pipe(target)).to.be.equal(statement);

                expect(statement.chain.length).to.be.equal(1);
                expect(statement.chain[0].type).to.be.equal(OperationalConnectType.Pipe);
                expect((statement.chain[0].target as Command)?.statement).to.be.equal(target);

                expect(statement.value).to.be.equal(`${statement.statement} | ${target}`);
            });
        });
    });

    describe('and', () => {
        describe('successful', () => {
            it('valid path', () => {
                const target = 'test';
                const statement = new Command('echo "hello"');

                expect(statement.chain.length).to.be.equal(0);
                expect(statement.and(target)).to.be.equal(statement);

                expect(statement.chain.length).to.be.equal(1);
                expect(statement.chain[0].type).to.be.equal(LogicalConnectType.And);
                expect((statement.chain[0].target as Command)?.statement).to.be.equal(target);

                expect(statement.value).to.be.equal(`${statement.statement} && ${target}`);
            });
        });
    });

    describe('or', () => {
        describe('successful', () => {
            it('valid path', () => {
                const target = 'test';
                const statement = new Command('echo "hello"');

                expect(statement.chain.length).to.be.equal(0);
                expect(statement.or(target)).to.be.equal(statement);

                expect(statement.chain.length).to.be.equal(1);
                expect(statement.chain[0].type).to.be.equal(LogicalConnectType.Or);
                expect((statement.chain[0].target as Command)?.statement).to.be.equal(target);

                expect(statement.value).to.be.equal(`${statement.statement} || ${target}`);
            });
        });
    });

    describe('subshell', () => {
        describe('successful', () => {
            it('check result', () => {
                const command = new Command('echo "hello"');

                expect(command.subshell().value).to.be.equal(`(${command.value})`);
            });
        });
    });

    describe('eval', () => {
        describe('successful', () => {
            it('check result', () => {
                const command = new Command('echo "hello"');

                expect(command.eval().value).to.be.equal(`$(${command.value})`);
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
                const statement = new Command(s);

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
                const statement = new Command(s);

                /* Prepare chain. */
                statement
                    .pipe(chainValue1)
                    .pipe(chainValue2)
                    .write(chainValue3);
                
                expect(statement.chain.length).to.be.equal(3);
                const found = statement.findInChain(/.*/, OperationalConnectType.Pipe);

                expect(found.length).to.be.equal(2);
                expect(found[0].target.value).to.be.equal(chainValue1);
                expect(found[1].target.value).to.be.equal(chainValue2);
            });

            it('only type', () => {
                const s = 'echo "test"';
                const chainValue1 = 'grep -e "est"';
                const chainValue2 = 'cut -d" " -f1';
                const chainValue3 = 'test.txt';
                const statement = new Command(s);

                /* Prepare chain. */
                statement
                    .pipe(chainValue1)
                    .pipe(chainValue2)
                    .write(chainValue3);
                
                expect(statement.chain.length).to.be.equal(3);
                const found = statement.findInChain(OperationalConnectType.Write);

                expect(found.length).to.be.equal(1);
                expect(found[0].target.value).to.be.equal(chainValue3);
            });
        });

        describe('failed', () => {
            it('invalid ID or pattern type', () => {
                const statement = new Command('echo "test"').write('test.txt');
                
                expect(function() {
                    statement.findInChain(35 as any);
                }).to.throw('Invalid ID or pattern type');
            });
        });
    });

    describe('removeFromChain', () => {
        describe('successful', () => {
            it('pattern', () => {
                const s = 'echo "test"';
                const chainValue1 = 'grep -e "est"';
                const chainValue2 = new Command('cut -d" " -f1');
                const chainValue3 = 'test.txt';
                const statement = new Command(s);

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
                const statement = new Command(s);

                /* Prepare chain. */
                statement
                    .pipe(chainValue1)
                    .pipe(chainValue2)
                    .write(chainValue3);
                
                    expect(statement.chain.length).to.be.equal(3);
                    expect(statement.removeFromChain(/.+/, OperationalConnectType.Pipe)).to.be.equal(statement);
    
                    expect(statement.chain.length).to.be.equal(1);
                    expect(statement.chain[0].target.value).to.be.equal(chainValue3);
            });

            it('only type', () => {
                const s = 'echo "test"';
                const chainValue1 = 'grep -e "est"';
                const chainValue2 = 'cut -d" " -f1';
                const chainValue3 = 'test.txt';
                const statement = new Command(s);

                /* Prepare chain. */
                statement
                    .pipe(chainValue1)
                    .pipe(chainValue2)
                    .write(chainValue3);
                
                    expect(statement.chain.length).to.be.equal(3);
                    expect(statement.removeFromChain(OperationalConnectType.Pipe)).to.be.equal(statement);
    
                    expect(statement.chain.length).to.be.equal(1);
                    expect(statement.chain[0].target.value).to.be.equal(chainValue3);
            });
        });

        describe('failed', () => {
            it('invalid ID or pattern type', () => {
                const statement = new Command('echo "test"').write('test.txt');
                
                expect(function() {
                    statement.removeFromChain(25 as any);
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
                const statement = new Command(s);

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
});
