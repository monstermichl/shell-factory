import { expect } from 'chai';
import { Identifyable } from '../src/base/identifyable.mjs';

/* Helper class to instantiate Identifyable. */
class IdentifyableHelper extends Identifyable {
    /* Nothing to do. */
}

describe('Identifyable tests', () => {
    describe('id', () => {
        describe('successful', () => {
            const identifyable = new IdentifyableHelper();
            
            expect(identifyable.id).to.match(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/); /* RegEx taken from https://ihateregex.io/expr/uuid/. */
        });
    });
});
