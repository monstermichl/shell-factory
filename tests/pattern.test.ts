import { expect } from 'chai';
import { v4 } from 'uuid';
import { evaluateIdOrPattern } from '../src/helpers/pattern.mjs';

describe('pattern tests', () => {
    describe('evaluateIdOrPattern', () => {
        describe('successful', () => {
            it('id', () => {
                const uuid = v4();
                const result = evaluateIdOrPattern(uuid);

                expect(result.isId).to.be.true;
                expect(result.regex.source).to.be.equal(uuid);
            });

            it('pattern', () => {
                const pattern = 'ello';
                const result = evaluateIdOrPattern(pattern);

                expect(result.isId).to.be.false;
                expect(result.regex.source).to.be.equal(pattern);
            });
        });

        describe('failed', () => {
            it('no ID or pattern provided', () => {
                expect(function() {
                    evaluateIdOrPattern(undefined as any)
                }).to.throw('No ID or pattern provided');
            });

            it('invalid ID or pattern type', () => {
                expect(function() {
                    evaluateIdOrPattern({} as any)
                }).to.throw('Invalid ID or pattern type');
            });
        });
    });
});
