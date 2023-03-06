import { expect } from 'chai';
import {
    Base,
    MetaData,
} from '../src/base/base.mjs';
import { Statement } from '../src/base/statement.mjs';

/* Helper class to instantiate Identifyable. */
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

    describe('metaData', () => {
        describe('successful', () => {
            it('get', () => {
                const statement = new Statement();
                const metaData = new MetaData();
                
                expect(statement.metaData(metaData)).to.be.equal(statement);
                expect(metaData.id).to.be.equal(statement.id);
            });
        });
    });
});
