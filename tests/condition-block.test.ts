import { expect } from 'chai';
import { Statement } from '../src/base/statement.mjs';
import {
    ConditionBlock,
    BracketType,
} from '../src/blocks/condition-block.mjs';
import { Conditions } from '../src/components/condition/conditions.mjs';
import {
    Link,
    LinkedCondition,
} from '../src/components/condition/linked-condition.mjs';

/* Helper class to instantiate ConditionBlock. */
class ConditionBlockHelper extends ConditionBlock {
    constructor(conditionKeyword: string, bracketType: BracketType, condition: any, blockStartKeyword: string, content?: any, blockEndKeyword?: string) {
        super(conditionKeyword, bracketType, condition, blockStartKeyword, content, blockEndKeyword);
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
                    BracketType.Square,
                    condition,
                    blockStartKeyword,
                    undefined,
                    blockEndKeyword,
                );

                expect(block.raw.length).to.be.equal(3); /* Start-condition statement, body, end-condition statement. */
                expect((block.raw[0] as Statement).value).to.be.equal(`${conditionKeyword} [ ${condition} ]; ${blockStartKeyword}`);
                expect((block.raw[2] as Statement).value).to.be.equal(blockEndKeyword);
            });

            it('construct if with round brackets', () => {
                const conditionKeyword = 'if';
                const blockStartKeyword = 'then';
                const condition = '1 -eq 1';
                const blockEndKeyword = 'fi';
                const block = new ConditionBlockHelper(
                    conditionKeyword,
                    BracketType.Round,
                    condition,
                    blockStartKeyword,
                    undefined,
                    blockEndKeyword,
                );

                expect(block.raw.length).to.be.equal(3); /* Start-condition statement, body, end-condition statement. */
                expect((block.raw[0] as Statement).value).to.be.equal(`${conditionKeyword} ( ${condition} ); ${blockStartKeyword}`);
                expect((block.raw[2] as Statement).value).to.be.equal(blockEndKeyword);
            });

            it('construct if without brackets', () => {
                const conditionKeyword = 'if';
                const blockStartKeyword = 'then';
                const condition = '1 -eq 1';
                const blockEndKeyword = 'fi';
                const block = new ConditionBlockHelper(
                    conditionKeyword,
                    BracketType.None,
                    condition,
                    blockStartKeyword,
                    undefined,
                    blockEndKeyword,
                );

                expect(block.raw.length).to.be.equal(3); /* Start-condition statement, body, end-condition statement. */
                expect((block.raw[0] as Statement).value).to.be.equal(`${conditionKeyword} ${condition}; ${blockStartKeyword}`);
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
                    BracketType.Square,
                    new Conditions(condition1, new LinkedCondition(Link.And, condition2)),
                    blockStartKeyword,
                    undefined,
                    blockEndKeyword,
                );

                expect(block.raw.length).to.be.equal(3); /* Start-condition statement, body, end-condition statement. */
                expect((block.raw[0] as Statement).value).to.be.equal(
                    `${conditionKeyword} [ ${condition1} ] && [ ${condition2} ]; ${blockStartKeyword}`
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
                    BracketType.Square,
                    new Conditions(condition1, new LinkedCondition(Link.Or, condition2)),
                    blockStartKeyword,
                    undefined,
                    blockEndKeyword,
                );

                expect(block.raw.length).to.be.equal(3); /* Start-condition statement, body, end-condition statement. */
                expect((block.raw[0] as Statement).value).to.be.equal(
                    `${conditionKeyword} [ ${condition1} ] || [ ${condition2} ]; ${blockStartKeyword}`
                );
                expect((block.raw[2] as Statement).value).to.be.equal(blockEndKeyword);
            });
        });

        describe('failed', () => {
            it('missing condition', () => {
                expect(function() {
                    new ConditionBlockHelper('', BracketType.None, '1 -eq 1', 'then')
                }).to.throw('Missing condition');
            });

            it('missing block-start keyword', () => {
                expect(function() {
                    new ConditionBlockHelper('if', BracketType.None, '1 -eq 1', '')
                }).to.throw('Missing block-start keyword');
            });
        });
    });

    describe('conditions', () => {
        describe('successful', () => {
            it('get', () => {
                const condition = '1 -eq 1';
                const block = new ConditionBlockHelper(
                    'if',
                    BracketType.Square,
                    condition,
                    'then',
                    undefined,
                    'fi',
                );
                expect(block.conditions.condition.value).to.be.equal(condition);
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
                    BracketType.Square,
                    condition,
                    blockStartKeyword,
                    undefined,
                    blockEndKeyword,
                ).read(file);

                expect(block.raw.length).to.be.equal(3); /* Start-condition statement, body, end-condition statement. */
                expect((block.raw[0] as Statement).value).to.be.equal(`${conditionKeyword} ${condition}; ${blockStartKeyword}`);
                expect((block.raw[2] as Statement).value).to.be.equal(blockEndKeyword);
            });

            it('disable', () => {
                const conditionKeyword = 'if';
                const blockStartKeyword = 'then';
                const condition = '1 -eq 1';
                const blockEndKeyword = 'fi';
                const file = 'test.txt';
                const block = new ConditionBlockHelper(
                    conditionKeyword,
                    BracketType.Square,
                    condition,
                    blockStartKeyword,
                    undefined,
                    blockEndKeyword,
                ).read(file);

                expect(block.raw.length).to.be.equal(3); /* Start-condition statement, body, end-condition statement. */
                expect((block.raw[0] as Statement).value).to.be.equal(`${conditionKeyword} ${condition}; ${blockStartKeyword}`);
                expect((block.raw[2] as Statement).value).to.be.equal(blockEndKeyword);

                /* Disable read. */
                block.read();

                expect((block.raw[0] as Statement).value).to.be.equal(`${conditionKeyword} [ ${condition} ]; ${blockStartKeyword}`);
                expect((block.raw[2] as Statement).value).to.be.equal(blockEndKeyword);
            });
        });
    });

    describe('test', () => {
        describe('successful', () => {
            it('get', () => {
                const conditionKeyword = 'if';
                const blockStartKeyword = 'then';
                const condition = '1 -eq 1';
                const blockEndKeyword = 'fi';
                const block = new ConditionBlockHelper(
                    conditionKeyword,
                    BracketType.Square,
                    condition,
                    blockStartKeyword,
                    undefined,
                    blockEndKeyword,
                )
                block.dontTest; /* Deactivate testing. */

                expect(block.raw.length).to.be.equal(3); /* Start-condition statement, body, end-condition statement. */

                expect((block.raw[0] as Statement).value).to.be.equal(`${conditionKeyword} ${condition}; ${blockStartKeyword}`);
                expect((block.raw[2] as Statement).value).to.be.equal(blockEndKeyword);

                block.test; /* Activate testing. */

                expect((block.raw[0] as Statement).value).to.be.equal(`${conditionKeyword} [ ${condition} ]; ${blockStartKeyword}`);
                expect((block.raw[2] as Statement).value).to.be.equal(blockEndKeyword);
            });
        });
    });
});
