import { expect } from 'chai';
import { Condition } from '../src/components/condition/condition.mjs';
import { Conditions } from '../src/components/condition/conditions.mjs';

describe('Conditions tests', () => {
    describe('constructor', () => {
        describe('successful', () => {
            it('string condition', () => {
                const condition = '1 -eq 1';
                const conditions = new Conditions(condition);

                expect(conditions.condition.value).to.be.equal(condition);
            });

            it('Condition condition', () => {
                const condition = new Condition('1 -eq 1');
                const conditions = new Conditions(condition);

                expect(conditions.condition.value).to.be.equal(condition.value);
            });
        });

        describe('failed', () => {
            it('undefined condition', () => {
                try {
                    new Condition(undefined as any);
                } catch (e: any) {
                    expect((e as Error).message).to.be.equal('No condition provided');
                }
            });
        });
    });

    describe('convert', () => {
        describe('successful', () => {
            it('string input', () => {
                const condition = '1 -eq 1';
                const conditions = Conditions.convert(condition);

                expect(conditions.conditions.length).to.be.equal(1);
                expect(conditions.conditions[0].value).to.be.equal(condition);
            });

            it('Condition input', () => {
                const condition = new Condition('1 -eq 1');
                const conditions = Conditions.convert(condition);

                expect(conditions.conditions.length).to.be.equal(1);
                expect(conditions.conditions[0].value).to.be.equal(condition.value);
            });

            it('Conditions input', () => {
                const condition = '1 -eq 1';
                const conditions = Conditions.convert(new Conditions(condition));

                expect(conditions.conditions.length).to.be.equal(1);
                expect(conditions.conditions[0].value).to.be.equal(condition);
            });
        });

        describe('failed', () => {
            it('undefined input', () => {
                try {
                    Conditions.convert(undefined as any);
                } catch (e: any) {
                    expect((e as Error).message).to.be.equal('No condition provided');
                }
            });
        });
    });

    describe('equal', () => {
        describe('successful', () => {
            it('equal', () => {
                const condition = '1 -eq 1';
                const conditions = Conditions.convert(condition);

                expect(conditions.equal(condition)).to.be.equal(true);
            });

            it('unequal', () => {
                const conditions = Conditions.convert('1 -eq 1');

                expect(conditions.equal('2 -eq 2')).to.be.equal(false);
            });
        });
    });
});
