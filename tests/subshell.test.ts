import { expect } from 'chai';
import { Block } from '../src/base/block.mjs';
import { Statement } from '../src/base/statement.mjs';
import { Subshell } from '../src/components/subshell/subshell.mjs';

describe('Subshell tests', () => {
    describe('constructor', () => {
        describe('successful', () => {
            it('string value', () => {
                const value = 'echo "test"';
                const subshell = Subshell.call(value);

                expect(subshell.value).to.be.equal(`(${value})`);
            });

            it('array value', () => {
                const values = ['echo "test"', 'echo "test2"'];
                const subshell = Subshell.call(values);

                expect(subshell.raw.length).to.be.equal(3);
                expect((subshell.raw[0] as Statement).value).to.be.equal('(');
                expect((subshell.raw[2] as Statement).value).to.be.equal(')');
            });
        });
    });

    describe('eval', () => {
        describe('successful', () => {
            it('string value', () => {
                const value = 'echo "test"';
                const subshell = Subshell.eval(value);

                expect(subshell.value).to.be.equal(`$(${value})`);
            });
        });
    });
});
