import { expect } from 'chai';
import {
    Base,
    MetaData,
} from '../src/base/base.mjs';
import { Statement } from '../src/base/statement.mjs';

/* Helper class to instantiate Base. */
class BaseHelper extends Base {
    protected _readPreProcessing(source: string): Base {
        return new Statement(source);
    }

    protected _writePreProcessing(target: string): Base {
        return new Statement(target);
    }

    protected _appendPreProcessing(target: string): Base {
        return new Statement(target);
    }

    protected _pipePreProcessing(target: string): Base {
        return new Statement(target);
    }
}

describe('Base tests', () => {
    describe('id', () => {
        describe('successful', () => {
            it('get', () => {
                const base = new BaseHelper();
                
                expect(base.id).to.match(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/); /* RegEx taken from https://ihateregex.io/expr/uuid/. */
            });
        });
    });

    describe('meta', () => {
        describe('successful', () => {
            it('get', () => {
                const statement = new Statement();
                const metaData = new MetaData();
                
                expect(statement.meta(metaData)).to.be.equal(statement);
                expect(metaData.id).to.be.equal(statement.id);
            });
        });
    });

    describe('setComment', () => {
        describe('successful', () => {
            it('set', () => {
                const comment = 'This is a comment';
                const base = new BaseHelper().setComment(comment);
                
                expect(base.comment).to.be.equal(comment);
            });
        });
    });

    describe('clearComment', () => {
        describe('successful', () => {
            it('delete', () => {
                const comment = 'This is a comment';
                const base = new BaseHelper().setComment(comment);
                const metaData = new MetaData();
                
                expect(base.meta(metaData)).to.be.equal(base);
                expect(metaData.comment).to.be.equal(comment);

                expect(base.clearComment()).to.be.equal(base);
                expect(base.meta(metaData)).to.be.equal(base);
                expect(metaData.comment).to.be.equal(undefined);
            });
        });
    });

    describe('read', () => {
        describe('successful', () => {
            it('valid path', () => {
                const source = 'test.txt';
                const base = new BaseHelper();

                expect(base.operations.read).to.be.undefined;
                expect(base.read(source)).to.be.equal(base);
                expect((base.operations.read as Statement)?.value).to.be.equal(source);
            });

            it('instance of Base', () => {
                const source = new Statement('test.txt');
                const base = new BaseHelper();

                expect(base.operations.read).to.be.undefined;
                expect(base.read(source)).to.be.equal(base);
                expect(base.operations.read).to.be.equal(source);
            });
        });

        describe('failed', () => {
            it('no input file provided', () => {
                expect(function() {
                    new BaseHelper().read('')
                }).to.throw('No source provided');
            });

            it('invalid file path type', () => {
                expect(function() {
                    new BaseHelper().read({} as any)
                }).to.throw('Invalid source type provided');
            });

            it('invalid conversion', () => {
                class InvalidBaseHelper extends BaseHelper {
                    protected override _readPreProcessing(_: string): Base {
                        return {} as Base;
                    }
                }

                expect(function() {
                    new InvalidBaseHelper().read('test.txt')
                }).to.throw('Conversion failed');
            });
        });
    });

    describe('write', () => {
        describe('successful', () => {
            it('valid path', () => {
                const target = 'test.txt';
                const base = new BaseHelper();

                expect(base.operations.write).to.be.undefined;
                expect(base.write(target)).to.be.equal(base);
                expect((base.operations.write as Statement)?.value).to.be.equal(target);
            });
        });
    });

    describe('append', () => {
        describe('successful', () => {
            it('valid path', () => {
                const target = 'test.txt';
                const base = new BaseHelper();

                expect(base.operations.append).to.be.undefined;
                expect(base.append(target)).to.be.equal(base);
                expect((base.operations.append as Statement)?.value).to.be.equal(target);
            });
        });
    });

    describe('pipe', () => {
        describe('successful', () => {
            it('valid path', () => {
                const target = 'test';
                const base = new BaseHelper();

                expect(base.operations.pipe).to.be.undefined;
                expect(base.pipe(target)).to.be.equal(base);
                expect((base.operations.pipe as Statement)?.value).to.be.equal(target);
            });
        });
    });
});
