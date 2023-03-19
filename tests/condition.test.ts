import { expect } from 'chai';
import { Condition } from '../src/components/condition/condition.mjs';

describe('Condition tests', () => {
    describe('constructor', () => {
        describe('successful', () => {
            it('string condition', () => {
                const condition = '1 -eq 1';
                const object = new Condition(condition);

                expect(object.value).to.be.equal(condition);
            });

            it('boolean true condition', () => {
                const condition = true;
                const object = new Condition(condition);

                expect(object.value).to.be.equal('1');
            });

            it('boolean false condition', () => {
                const condition = false;
                const object = new Condition(condition);

                expect(object.value).to.be.equal('0');
            });

            it('number unequal 0 condition', () => {
                const condition = 5;
                const object = new Condition(condition);

                expect(object.value).to.be.equal('1');
            });

            it('number equal 0 condition', () => {
                const condition = 0;
                const object = new Condition(condition);

                expect(object.value).to.be.equal('0');
            });
        });

        describe('failed', () => {
            it('create empty condition', () => {
                expect(function() {
                    new Condition('');
                }).to.throw('No condition provided');
            });

            it('invalid condition type', () => {
                expect(function() {
                    new Condition({} as any);
                }).to.throw('Invalid condition type');
            });
        });
    });

    describe('value', () => {
        describe('successful', () => {
            it('get', () => {
                const s = '1 -eq 1';
                const condition = new Condition(s);

                expect(condition.value).to.equal(s);
            });
        });
    });

    describe('equal', () => {
        describe('successful', () => {
            it('equal', () => {
                const condition1 = new Condition('1 -eq 1');
                const condition2 = new Condition('1 -eq 1');

                expect(condition1.equal(condition2)).to.be.equal(true);
            });

            it('unequal', () => {
                const condition1 = new Condition('1 -eq 1');
                const condition2 = new Condition('1 -eq 2');

                expect(condition1.equal(condition2)).to.be.equal(false);
            });

            it('compare undefined', () => {
                const condition1 = new Condition('1 -eq 1');

                expect(condition1.equal(undefined as any)).to.be.equal(false);
            });
        });
    });
});
