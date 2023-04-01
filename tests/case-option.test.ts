import { expect } from 'chai';
import { Block } from '../src/base/block.mjs';
import { Statement } from '../src/base/statement.mjs';
import { CaseOption } from '../src/components/flow/case/case-option.mjs';

describe('CaseOption tests', () => {
    describe('constructor', () => {
        describe('successful', () => {
            it('construct', () => {
                const pattern = '/files';
                const content = 'found files';
                const caseOption = new CaseOption(pattern, content);

                expect(caseOption.raw.length).to.be.equal(3);
                expect((caseOption.raw[0] as Statement).value).to.be.equal(`${pattern})`);
                expect((caseOption.raw[2] as Block).content.length).to.be.equal(1);
                expect(((caseOption.raw[2] as Block).content[0] as Statement).value).to.be.equal(';;');

                expect(caseOption.content.length).to.be.equal(1);
                expect((caseOption.content[0] as Statement).value).to.be.equal(content);
            });

            it('pattern with whitespaces', () => {
                const pattern = 'whitespace test';
                const content = 'found files';
                const caseOption = new CaseOption(pattern, content);

                expect(caseOption.raw.length).to.be.equal(3);
                expect((caseOption.raw[0] as Statement).value).to.be.equal(`"${pattern}")`);
                expect((caseOption.raw[2] as Block).content.length).to.be.equal(1);
                expect(((caseOption.raw[2] as Block).content[0] as Statement).value).to.be.equal(';;');

                expect(caseOption.content.length).to.be.equal(1);
                expect((caseOption.content[0] as Statement).value).to.be.equal(content);
            });
        });

        describe('failed', () => {
            it('missing pattern', () => {
                expect(function() {
                    new CaseOption(undefined as any)
                }).to.throw('Missing pattern');
            });

            it('invalid pattern type', () => {
                expect(function() {
                    new CaseOption({} as any)
                }).to.throw('Invalid pattern type');
            });
        });
    });

    describe('pattern', () => {
        describe('successful', () => {
            it('get', () => {
                const pattern = '/files';
                const caseOption = new CaseOption(pattern);

                expect(caseOption.pattern).to.be.equal(pattern);
            });
        });
    });
});
