import { expect } from 'chai';
import { Statement } from '../src/base/statement.mjs';

describe('Statement tests', () => {
    describe('value', () => {
        describe('successful', () => {
            it('get', () => {
                const s = 'echo "test"';
                const statement = new Statement(s);

                expect(statement.value).to.be.equal(s);
            });

            it('get undefined', () => {
                const statement = new Statement();

                expect(statement.value).to.be.equal('');
            });
        });

        describe('failed', () => {
            it('set invalid type', () => {
                try {
                    new Statement(4 as any);
                } catch (e: any) {
                    expect((e as Error).message).to.be.equal('Invalid Statement value type provided');
                }
            });
        });
    });
});
