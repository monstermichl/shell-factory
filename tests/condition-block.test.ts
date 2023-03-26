import { expect } from 'chai';
import { Command } from '../src/base/command.mjs';
import { Statement } from '../src/base/statement.mjs';
import { ConditionBlock } from '../src/blocks/condition-block.mjs';
import { Condition } from '../src/components/condition/condition.mjs';

/* Helper class to instantiate ConditionBlock. */
class ConditionBlockHelper extends ConditionBlock {
    constructor(conditionKeyword: string, condition: any, blockStartKeyword: string, content?: any, blockEndKeyword?: string) {
        super(conditionKeyword, condition, blockStartKeyword, content, blockEndKeyword);
    }
}

describe('ConditionBlock tests', () => {
    describe('constructor', () => {
        describe('successful', () => {
            it('construct if with square brackets', () => {
                const conditionKeyword = 'if';
                const blockStartKeyword = 'then';
                const condition = '1 -eq 1';
                const blockEndKeyword = 'fi';
                const block = new ConditionBlockHelper(
                    conditionKeyword,
                    condition,
                    blockStartKeyword,
                    undefined,
                    blockEndKeyword,
                );

                expect(block.raw.length).to.be.equal(3); /* Start-condition statement, body, end-condition statement. */
                expect((block.raw[0] as Statement).value).to.be.equal(`${conditionKeyword} [ ${condition} ]; ${blockStartKeyword}`);
                expect((block.raw[2] as Statement).value).to.be.equal(blockEndKeyword);
            });

            it('construct if with multiple and-connected conditions', () => {
                const conditionKeyword = 'if';
                const blockStartKeyword = 'then';
                const condition1 = '1 -eq 1';
                const condition2 = '2 -eq 2';
                const blockEndKeyword = 'fi';
                const block = new ConditionBlockHelper(
                    conditionKeyword,
                    new Condition(condition1).and(condition2),
                    blockStartKeyword,
                    undefined,
                    blockEndKeyword,
                );

                expect(block.raw.length).to.be.equal(3); /* Start-condition statement, body, end-condition statement. */
                expect((block.raw[0] as Statement).value).to.be.equal(
                    `${conditionKeyword} [ ${condition1} -a ${condition2} ]; ${blockStartKeyword}`
                );
                expect((block.raw[2] as Statement).value).to.be.equal(blockEndKeyword);
            });

            it('construct if with multiple or-connected conditions', () => {
                const conditionKeyword = 'if';
                const blockStartKeyword = 'then';
                const condition1 = '1 -eq 1';
                const condition2 = '2 -eq 2';
                const blockEndKeyword = 'fi';
                const block = new ConditionBlockHelper(
                    conditionKeyword,
                    new Condition(condition1).or(condition2),
                    blockStartKeyword,
                    undefined,
                    blockEndKeyword,
                );

                expect(block.raw.length).to.be.equal(3); /* Start-condition statement, body, end-condition statement. */
                expect((block.raw[0] as Statement).value).to.be.equal(
                    `${conditionKeyword} [ ${condition1} -o ${condition2} ]; ${blockStartKeyword}`
                );
                expect((block.raw[2] as Statement).value).to.be.equal(blockEndKeyword);
            });
        });

        describe('failed', () => {
            it('missing condition keyword', () => {
                expect(function() {
                    new ConditionBlockHelper('', '1 -eq 1', 'then')
                }).to.throw('Missing condition keyword');
            });

            it('invalid condition keyword type provided', () => {
                expect(function() {
                    new ConditionBlockHelper({} as any, '1 -eq 1', 'then')
                }).to.throw('Invalid condition keyword type provided');
            });

            it('missing block-start keyword', () => {
                expect(function() {
                    new ConditionBlockHelper('if', '1 -eq 1', '')
                }).to.throw('Missing block-start keyword');
            });

            it('invalid block-start keyword type provided', () => {
                expect(function() {
                    new ConditionBlockHelper('if', '1 -eq 1', {} as any)
                }).to.throw('Invalid block-start keyword type provided');
            });
        });
    });

    describe('conditions', () => {
        describe('successful', () => {
            it('get', () => {
                const condition = '1 -eq 1';
                const block = new ConditionBlockHelper(
                    'if',
                    condition,
                    'then',
                    undefined,
                    'fi',
                );
                expect(block.condition.value).to.be.equal(`[ ${condition} ]`);
            });
        });
    });

    describe('read', () => {
        describe('successful', () => {
            it('enable', () => {
                const conditionKeyword = 'if';
                const blockStartKeyword = 'then';
                const condition = '1 -eq 1';
                const blockEndKeyword = 'fi';
                const file = 'test.txt';
                const block = new ConditionBlockHelper(
                    conditionKeyword,
                    condition,
                    blockStartKeyword,
                    undefined,
                    blockEndKeyword,
                ).read(file);

                expect(block.raw.length).to.be.equal(3); /* Start-condition statement, body, end-condition statement. */
                expect((block.raw[0] as Statement).value).to.be.equal(`${conditionKeyword} ${condition}; ${blockStartKeyword}`);
                expect((block.raw[2] as Statement).value).to.be.equal(`${blockEndKeyword} < ${file}`);
            });
        });
    });

    describe('write', () => {
        describe('successful', () => {
            it('enable', () => {
                const conditionKeyword = 'if';
                const blockStartKeyword = 'then';
                const condition = '1 -eq 1';
                const blockEndKeyword = 'fi';
                const file = 'test.txt';
                const block = new ConditionBlockHelper(
                    conditionKeyword,
                    condition,
                    blockStartKeyword,
                    undefined,
                    blockEndKeyword,
                ).write(file);

                expect(block.raw.length).to.be.equal(3); /* Start-condition statement, body, end-condition statement. */
                expect((block.raw[0] as Statement).value).to.be.equal(`${conditionKeyword} [ ${condition} ]; ${blockStartKeyword}`);
                expect((block.raw[2] as Statement).value).to.be.equal(`${blockEndKeyword} > ${file}`);
            });
        });
    });

    describe('append', () => {
        describe('successful', () => {
            it('enable', () => {
                const conditionKeyword = 'if';
                const blockStartKeyword = 'then';
                const condition = '1 -eq 1';
                const blockEndKeyword = 'fi';
                const file = 'test.txt';
                const block = new ConditionBlockHelper(
                    conditionKeyword,
                    condition,
                    blockStartKeyword,
                    undefined,
                    blockEndKeyword,
                ).append(file);

                expect(block.raw.length).to.be.equal(3); /* Start-condition statement, body, end-condition statement. */
                expect((block.raw[0] as Statement).value).to.be.equal(`${conditionKeyword} [ ${condition} ]; ${blockStartKeyword}`);
                expect((block.raw[2] as Statement).value).to.be.equal(`${blockEndKeyword} >> ${file}`);
            });
        });
    });

    describe('pipe', () => {
        describe('successful', () => {
            it('enable', () => {
                const conditionKeyword = 'if';
                const blockStartKeyword = 'then';
                const condition = '1 -eq 1';
                const blockEndKeyword = 'fi';
                const command = 'cat';
                const block = new ConditionBlockHelper(
                    conditionKeyword,
                    condition,
                    blockStartKeyword,
                    undefined,
                    blockEndKeyword,
                ).pipe(command);

                expect(block.raw.length).to.be.equal(3); /* Start-condition statement, body, end-condition statement. */
                expect((block.raw[0] as Statement).value).to.be.equal(`${conditionKeyword} [ ${condition} ]; ${blockStartKeyword}`);
                expect((block.raw[2] as Statement).value).to.be.equal(`${blockEndKeyword} | ${command}`);
            });
        });
    });

    describe('findInChain', () => {
        describe('successful', () => {
            it('pattern', () => {
                const chainValue1 = 'grep -e "est"';
                const chainValue2 = 'cut -d" " -f1';
                const chainValue3 = 'test.txt';
                const block = new ConditionBlockHelper(
                    'if',
                    '1 -eq 1',
                    'then',
                    undefined,
                    'fi',
                );

                /* Prepare chain. */
                block
                    .pipe(chainValue1)
                    .pipe(chainValue2)
                    .write(chainValue3);
                
                expect(block.chain.length).to.be.equal(3);
                const found = block.findInChain(/cut/);

                expect(found.length).to.be.equal(1);
                expect(found[0].target.value).to.be.equal(chainValue2);
            });
        });
    });

    describe('removeFromChain', () => {
        describe('successful', () => {
            it('pattern', () => {
                const chainValue1 = 'grep -e "est"';
                const chainValue2 = new Command('cut -d" " -f1');
                const chainValue3 = 'test.txt';
                const block = new ConditionBlockHelper(
                    'if',
                    '1 -eq 1',
                    'then',
                    undefined,
                    'fi',
                );

                /* Prepare chain. */
                block
                    .pipe(chainValue1)
                    .pipe(chainValue2)
                    .write(chainValue3);
                
                expect(block.chain.length).to.be.equal(3);
                expect(block.removeFromChain(chainValue2.id)).to.be.equal(block);

                expect(block.chain.length).to.be.equal(2);
                expect(block.chain[0].target.value).to.be.equal(chainValue1);
                expect(block.chain[1].target.value).to.be.equal(chainValue3);
            });
        });
    });

    describe('clearChain', () => {
        describe('successful', () => {
            it('clear', () => {
                const chainValue1 = 'grep -e "est"';
                const chainValue2 = 'cut -d" " -f1';
                const chainValue3 = 'test.txt';
                const block = new ConditionBlockHelper(
                    'if',
                    '1 -eq 1',
                    'then',
                    undefined,
                    'fi',
                );

                /* Prepare chain. */
                block
                    .pipe(chainValue1)
                    .pipe(chainValue2)
                    .write(chainValue3);
                
                expect(block.chain.length).to.be.equal(3);
                expect(block.clearChain()).to.be.equal(block);
                expect(block.chain.length).to.be.equal(0);
            });
        });
    });

    describe('setTest', () => {
        describe('successful', () => {
            it('get', () => {
                const conditionKeyword = 'if';
                const blockStartKeyword = 'then';
                const condition = '1 -eq 1';
                const blockEndKeyword = 'fi';
                const block = new ConditionBlockHelper(
                    conditionKeyword,
                    condition,
                    blockStartKeyword,
                    undefined,
                    blockEndKeyword,
                )
                block.setTest(false); /* Deactivate testing. */
                expect(block.getTest()).to.be.false;

                expect(block.raw.length).to.be.equal(3); /* Start-condition statement, body, end-condition statement. */

                expect((block.raw[0] as Statement).value).to.be.equal(`${conditionKeyword} ${condition}; ${blockStartKeyword}`);
                expect((block.raw[2] as Statement).value).to.be.equal(blockEndKeyword);

                block.setTest(true); /* Activate testing. */
                expect(block.getTest()).to.be.true;

                expect((block.raw[0] as Statement).value).to.be.equal(`${conditionKeyword} [ ${condition} ]; ${blockStartKeyword}`);
                expect((block.raw[2] as Statement).value).to.be.equal(blockEndKeyword);
            });
        });
    });

    describe('and', () => {
        describe('successful', () => {
            it('add condition', () => {
                const conditionKeyword = 'if';
                const blockStartKeyword = 'then';
                const condition1 = '1 -eq 1';
                const condition2 = '2 -eq 2';
                const blockEndKeyword = 'fi';
                const block = new ConditionBlockHelper(
                    conditionKeyword,
                    condition1,
                    blockStartKeyword,
                    undefined,
                    blockEndKeyword,
                )
                expect(block.raw.length).to.be.equal(3); /* Start-condition statement, body, end-condition statement. */
                expect((block.raw[0] as Statement).value).to.be.equal(`${conditionKeyword} [ ${condition1} ]; ${blockStartKeyword}`);

                /* Add additional condition. */
                expect(block.and(condition2)).to.be.equal(block);

                expect((block.raw[0] as Statement).value).to.be.equal(`${conditionKeyword} [ ${condition1} -a ${condition2} ]; ${blockStartKeyword}`);
                expect((block.raw[2] as Statement).value).to.be.equal(blockEndKeyword);
            });
        });
    });

    describe('and', () => {
        describe('successful', () => {
            it('add condition', () => {
                const conditionKeyword = 'if';
                const blockStartKeyword = 'then';
                const condition1 = '1 -eq 1';
                const condition2 = '2 -eq 2';
                const blockEndKeyword = 'fi';
                const block = new ConditionBlockHelper(
                    conditionKeyword,
                    condition1,
                    blockStartKeyword,
                    undefined,
                    blockEndKeyword,
                )
                expect(block.raw.length).to.be.equal(3); /* Start-condition statement, body, end-condition statement. */
                expect((block.raw[0] as Statement).value).to.be.equal(`${conditionKeyword} [ ${condition1} ]; ${blockStartKeyword}`);

                /* Add additional condition. */
                expect(block.or(condition2)).to.be.equal(block);

                expect((block.raw[0] as Statement).value).to.be.equal(`${conditionKeyword} [ ${condition1} -o ${condition2} ]; ${blockStartKeyword}`);
                expect((block.raw[2] as Statement).value).to.be.equal(blockEndKeyword);
            });
        });
    });
});
