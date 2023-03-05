import { expect } from 'chai';
import { Statement } from '../src/base/statement.mjs';
import { ElseIf } from '../src/components/flow/if/else-if.mjs';
import { Else } from '../src/components/flow/if/else.mjs';
import { If } from '../src/components/flow/if/if.mjs';

describe('If tests', () => {
    describe('constructor', () => {
        describe('successful', () => {
            it('construct', () => {
                const condition = '1 -eq 1';
                const content = 'echo 123';
                const ifBlock = new If(condition, content);

                expect(ifBlock.raw.length).to.be.equal(3);
                expect((ifBlock.raw[0] as Statement).value).to.be.equal(`if [ ${condition} ]; then`);
                expect((ifBlock.raw[2] as Statement).value).to.be.equal(`fi`);

                expect(ifBlock.content.length).to.be.equal(1);
                expect((ifBlock.content[0] as Statement).value).to.be.equal(content);
            });
        });
    });

    describe('elseIf', () => {
        describe('successful', () => {
            it('add one', () => {
                const ifBlock = new If('1 -eq 1');

                expect(ifBlock.elseIf('2 -eq 2')).to.be.equal(ifBlock);
            });

            it('add two', () => {
                const ifBlock = new If('1 -eq 1');

                expect(ifBlock.elseIf('2 -eq 2')).to.be.equal(ifBlock);
                expect(ifBlock.elseIf('3 -eq 3')).to.be.equal(ifBlock);
            });

            it('replace', () => {
                const ifBlock = new If('1 -eq 1');

                expect(ifBlock.elseIf('2 -eq 2')).to.be.equal(ifBlock);
                expect(ifBlock.elseIf('2 -eq 2', undefined, true)).to.be.equal(ifBlock);
            });

            it('add one before and one after else', () => {
                const ifBlock = new If('1 -eq 1');

                expect(ifBlock.elseIf('2 -eq 2')).to.be.equal(ifBlock);
                expect(ifBlock.else('echo "Intermediate else"')).to.be.equal(ifBlock);
                expect(ifBlock.elseIf('3 -eq 3')).to.be.equal(ifBlock);

                expect(ifBlock.raw.at(-4) instanceof ElseIf).to.be.equal(true);
                expect(ifBlock.raw.at(-3) instanceof ElseIf).to.be.equal(true);
                expect(ifBlock.raw.at(-2) instanceof Else).to.be.equal(true);
            });
        });

        describe('failed', () => {
            it('don\'t replace', () => {
                const ifBlock = new If('1 -eq 1');

                expect(ifBlock.elseIf('2 -eq 2')).to.be.equal(ifBlock);
                expect(ifBlock.elseIf('2 -eq 2')).to.be.equal(null);
            });

            it('If covers condition', () => {
                try {
                    const condition = '1 -eq 1';
                    const ifBlock = new If(condition);

                    ifBlock.elseIf(condition);
                } catch (e: any) {
                    expect((e as Error).message).to.be.equal('Condition already covered by "if"');
                }
            });
        });
    });

    describe('else', () => {
        describe('successful', () => {
            it('add', () => {
                const ifBlock = new If('1 -eq 1');

                expect(ifBlock.else('echo "test"')).to.be.equal(ifBlock);
            });

            it('replace', () => {
                const ifBlock = new If('1 -eq 1');

                expect(ifBlock.else('echo "test"')).to.be.equal(ifBlock);
                expect(ifBlock.else('echo "test"', true)).to.be.equal(ifBlock);
            });
        });

        describe('failed', () => {
            it('don\'t replace', () => {
                const ifBlock = new If('1 -eq 1');

                expect(ifBlock.else('echo "test"')).to.be.equal(ifBlock);
                expect(ifBlock.else('echo "test"')).to.be.equal(null);
            });
        });
    });

    describe('parts', () => {
        describe('successful', () => {
            it('if only', () => {
                const ifBlock = new If('1 -eq 1');
                const parts = ifBlock.parts;

                expect(parts.if).to.be.equal(ifBlock);
                expect(parts.elseIfs).to.be.equal(undefined);
                expect(parts.else).to.be.equal(undefined);
            });

            it('if + elseIfs', () => {
                const condition2 = '2 -eq 2';
                const condition3 = '3 -eq 3';
                const ifBlock = new If('1 -eq 1').elseIf(condition2).elseIf(condition3);
                const parts = ifBlock.parts;

                expect(parts.if).to.be.equal(ifBlock);
                expect(parts.elseIfs?.length).to.be.equal(2);
                expect(parts.elseIfs![0].conditions.condition.value).to.be.equal(condition2);
                expect(parts.elseIfs![1].conditions.condition.value).to.be.equal(condition3);
                expect(parts.else).to.be.equal(undefined);
            });

            it('if + else', () => {
                const ifBlock = new If('1 -eq 1').else('echo "test"');
                const parts = ifBlock.parts;

                expect(parts.if).to.be.equal(ifBlock);
                expect(parts.elseIfs).to.be.equal(undefined);
                expect(parts.else).to.be.not.equal(undefined);
            });
        });
    });
});
