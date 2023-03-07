import { expect } from 'chai';
import {
    Base,
    MetaData,
} from '../src/base/base.mjs';
import { Statement } from '../src/base/statement.mjs';

/* Helper class to instantiate Base. */
class BaseHelper extends Base {
    /* Nothing to do. */
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

    describe('deleteComment', () => {
        describe('successful', () => {
            it('delete', () => {
                const comment = 'This is a comment';
                const base = new BaseHelper().setComment(comment);
                const metaData = new MetaData();
                
                expect(base.meta(metaData)).to.be.equal(base);
                expect(metaData.comment).to.be.equal(comment);

                expect(base.deleteComment()).to.be.equal(base);
                expect(base.meta(metaData)).to.be.equal(base);
                expect(metaData.comment).to.be.equal(undefined);
            });
        });
    });
});
