import { expect } from 'chai';
import {
    Link,
    LinkedCondition,
} from '../src/components/condition/linked-condition.mjs';

describe('LinkedCondition tests', () => {
    describe('consructor', () => {
        describe('failed', () => {
            it('invalid link', () => {
                expect(function() {
                    new LinkedCondition(5, '1 -eq 1')
                }).to.throw('Invalid condition link provided');
            });
        });
    });

    describe('link', () => {
        describe('successful', () => {
            it('link', () => {
                const condition = new LinkedCondition(Link.And, '1 -eq 1');

                expect(condition.link).to.be.equal(Link.And);
            });
        });
    });

    describe('equal', () => {
        describe('successful', () => {
            it('equal', () => {
                const condition1 = new LinkedCondition(Link.And, '1 -eq 1');
                const condition2 = new LinkedCondition(Link.And, '1 -eq 1');

                expect(condition1.equal(condition2)).to.be.equal(true);
            });

            it('unequal link', () => {
                const condition1 = new LinkedCondition(Link.And, '1 -eq 1');
                const condition2 = new LinkedCondition(Link.Or, '1 -eq 1');

                expect(condition1.equal(condition2)).to.be.equal(false);
            });

            it('unequal condition', () => {
                const condition1 = new LinkedCondition(Link.And, '1 -eq 1');
                const condition2 = new LinkedCondition(Link.And, '1 -eq 2');

                expect(condition1.equal(condition2)).to.be.equal(false);
            });

            it('unequal link and condition', () => {
                const condition1 = new LinkedCondition(Link.And, '1 -eq 2');
                const condition2 = new LinkedCondition(Link.Or, '1 -eq 1');

                expect(condition1.equal(condition2)).to.be.equal(false);
            });

            it('compare undefined', () => {
                const condition1 = new LinkedCondition(Link.And, '1 -eq 2');
                const condition2 = new LinkedCondition(Link.Or, '1 -eq 1');

                expect(condition1.equal(condition2)).to.be.equal(false);
            });
        });
    });
});
