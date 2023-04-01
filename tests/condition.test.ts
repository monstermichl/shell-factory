import { expect } from 'chai';
import { Command } from '../src/base/command.mjs';
import { Condition } from '../src/components/condition/condition.mjs';
import { LogicalConnectType } from '../src/interfaces/logically-connectable.mjs';

describe('Condition tests', () => {
    describe('constructor', () => {
        describe('successful', () => {
            it('string condition', () => {
                const condition = '1 -eq 1';
                const object = new Condition(condition);

                expect(object.value).to.be.equal(`[ ${condition} ]`);
            });

            it('boolean true condition', () => {
                const condition = true;
                const object = new Condition(condition);

                expect(object.value).to.be.equal('[ 1 ]');
            });

            it('boolean false condition', () => {
                const condition = false;
                const object = new Condition(condition);

                expect(object.value).to.be.equal('[ 0 ]');
            });

            it('number unequal 0 condition', () => {
                const condition = 5;
                const object = new Condition(condition);

                expect(object.value).to.be.equal('[ 1 ]');
            });

            it('number equal 0 condition', () => {
                const condition = 0;
                const object = new Condition(condition);

                expect(object.value).to.be.equal('[ 0 ]');
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

                expect(condition.value).to.equal(`[ ${s} ]`);
            });
        });
    });

    describe('test', () => {
        describe('successful', () => {
            it('set test', () => {
                const s = '1 -eq 1';
                const condition = new Condition(s).setTest(true);

                expect(condition.value).to.equal(`[ ${s} ]`);
            });

            it('set don\'t test', () => {
                const s = '1 -eq 1';
                const condition = new Condition(s).setTest(false);

                expect(condition.value).to.equal(s);
            });
        });
    });

    describe('and', () => {
        describe('successful', () => {
            it('add condition', () => {
                const condition1 = '1 -eq 1';
                const condition2 = '2 -eq 2';
                const condition = new Condition(condition1).and(condition2);

                expect(condition.value).to.equal(`[ ${condition1} -a ${condition2} ]`);
            });
        });
    });

    describe('or', () => {
        describe('successful', () => {
            it('add condition', () => {
                const condition1 = '1 -eq 1';
                const condition2 = '2 -eq 2';
                const condition = new Condition(condition1).or(condition2);

                expect(condition.value).to.equal(`[ ${condition1} -o ${condition2} ]`);
            });
        });
    });

    describe('findInChain', () => {
        describe('successful', () => {
            it('pattern', () => {
                const condition1 = new Condition('2 -eq 2');
                const condition2 = new Condition('1 -eq 1');
                const condition3 = new Condition('3 -ne 0');
                const condition = new Condition(condition1);

                /* Prepare chain. */
                expect(condition
                    .and(condition2)
                    .or(condition3)
                ).to.be.equal(condition);
                
                expect(condition.chain.length).to.be.equal(2);
                const found = condition.findInChain(condition2.statement);

                expect(found.length).to.be.equal(1);
                expect(found[0].target.value).to.be.equal(condition2.value);
            });

            it('pattern with type', () => {
                const condition1 = new Condition('2 -eq 2');
                const condition2 = new Condition('1 -eq 1');
                const condition3 = new Condition('3 -ne 0');
                const condition = new Condition(condition1);

                /* Prepare chain. */
                expect(condition
                    .and(condition2)
                    .or(condition3)
                ).to.be.equal(condition);
                
                expect(condition.chain.length).to.be.equal(2);
                const found = condition.findInChain(/.*/, LogicalConnectType.And);

                expect(found.length).to.be.equal(1);
                expect(found[0].target.value).to.be.equal(condition2.value);
            });

            it('only type', () => {
                const condition1 = new Condition('2 -eq 2');
                const condition2 = new Condition('1 -eq 1');
                const condition3 = new Condition('3 -ne 0');
                const condition = new Condition(condition1);

                /* Prepare chain. */
                expect(condition
                    .and(condition2)
                    .or(condition3)
                ).to.be.equal(condition);
                
                expect(condition.chain.length).to.be.equal(2);
                const found = condition.findInChain(LogicalConnectType.Or);

                expect(found.length).to.be.equal(1);
                expect(found[0].target.value).to.be.equal(condition3.value);
            });
        });
    });

    describe('removeFromChain', () => {
        describe('successful', () => {
            it('pattern', () => {
                const condition1 = new Condition('2 -eq 2');
                const condition2 = new Condition('1 -eq 1');
                const condition = new Condition(condition1);

                /* Prepare chain. */
                expect(condition.and(condition2)).to.be.equal(condition);
                
                expect(condition.chain.length).to.be.equal(1);
                expect(condition.removeFromChain(condition2.statement)).to.be.equal(condition);

                expect(condition.chain.length).to.be.equal(0);
            });


            it('pattern with type', () => {
                const condition1 = new Condition('2 -eq 2');
                const condition2 = new Condition('1 -eq 1');
                const condition3 = new Condition('3 -ne 0');
                const condition = new Condition(condition1);

                /* Prepare chain. */
                expect(condition
                    .and(condition2)
                    .or(condition3)
                ).to.be.equal(condition);
                
                expect(condition.chain.length).to.be.equal(2);
                expect(condition.removeFromChain(/.*/, LogicalConnectType.And)).to.be.equal(condition);

                expect(condition.chain.length).to.be.equal(1);
                expect(condition.chain[0].target.value).to.be.equal(condition3.value);
            });

            it('only type', () => {
                const condition1 = new Condition('2 -eq 2');
                const condition2 = new Condition('1 -eq 1');
                const condition3 = new Condition('3 -ne 0');
                const condition = new Condition(condition1);

                /* Prepare chain. */
                expect(condition
                    .and(condition2)
                    .or(condition3)
                ).to.be.equal(condition);
                
                expect(condition.chain.length).to.be.equal(2);
                expect(condition.removeFromChain(LogicalConnectType.Or)).to.be.equal(condition);

                expect(condition.chain.length).to.be.equal(1);
                expect(condition.chain[0].target.value).to.be.equal(condition2.value);
            });
        });
    });

    describe('clearChain', () => {
        describe('successful', () => {
            it('clear', () => {
                const condition = new Condition('2 -eq 2');

                /* Prepare chain. */
                expect(condition.and('1 -eq 1')).to.be.equal(condition);
                
                expect(condition.chain.length).to.be.equal(1);
                expect(condition.clearChain()).to.be.equal(condition);
                expect(condition.chain.length).to.be.equal(0);
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

    describe('subshell', () => {
        describe('successful', () => {
            it('string value', () => {
                const conditionValue = '1 -eq 1';
                const condition = new Condition(conditionValue);

                expect(condition.subshell().value).to.be.equal(`([ ${conditionValue} ])`);
            });
        });
    });

    describe('eval', () => {
        describe('successful', () => {
            it('string value', () => {
                const conditionValue = '1 -eq 1';
                const condition = new Condition(conditionValue);

                expect(condition.eval().value).to.be.equal(`$([ ${conditionValue} ])`);
            });
        });
    });

    describe('fromString', () => {
        describe('successful', () => {
            it('string condition', () => {
                const condition1 = '1 -eq 1';
                const condition = Condition.fromString(condition1);

                expect(condition.value).to.equal(`[ ${condition1} ]`);
            });

            it('condition from Statement instance', () => {
                const condition1 = new Command('1 -eq 1');
                const condition = Condition.fromString(condition1);

                expect(condition.value).to.equal(`[ ${condition1.value} ]`);
            });

            it('condition from Condition instance', () => {
                const condition1 = new Condition('1 -eq 1');
                const condition = Condition.fromString(condition1);

                expect(condition.value).to.equal(condition1.value);
            });
        });
    });
});
