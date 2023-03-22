import { expect } from 'chai';
import {
    ChainType,
    Statement,
} from '../src/base/statement.mjs';

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
        });

        describe('failed', () => {
            it('set invalid type', () => {
                expect(function() {
                    new Statement(4 as any)
                }).to.throw('Invalid Statement value type provided');
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
                expect((statement.chain[0].target as Statement)?.value).to.be.equal(source);
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
                expect((statement.chain[0].target as Statement)?.value).to.be.equal(target);
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
                expect((statement.chain[0].target as Statement)?.value).to.be.equal(target);
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
                expect((statement.chain[0].target as Statement)?.value).to.be.equal(target);
            });
        });
    });
});
