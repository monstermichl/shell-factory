import { expect } from 'chai';
import { Statement } from '../src/base/statement.mjs';
import { CaseOption } from '../src/components/flow/case/case-option.mjs';
import { Case } from '../src/components/flow/case/case.mjs';

describe('Case tests', () => {
    describe('constructor/addContent', () => {
        describe('successful', () => {
            it('construct with CaseOption', () => {
                const variable = '$value';
                const caseOption = new CaseOption('*', 'echo whatever');
                const caseBlock = new Case(`${variable}`, caseOption);

                expect(caseBlock.raw.length).to.be.equal(3);
                expect((caseBlock.raw[0] as Statement).value).to.be.equal(`case ${variable} in`);
                expect((caseBlock.raw[2] as Statement).value).to.be.equal(`esac`);

                expect(caseBlock.cases.length).to.be.equal(1);
                expect(caseBlock.cases[0].content).to.be.equal(caseOption.content);
            });

            it('construct with pattern and statement', () => {
                const variable = '$value';
                const pattern = '*';
                const statement = 'echo whatever';
                const caseBlock = new Case(`${variable}`, pattern, statement);

                expect(caseBlock.raw.length).to.be.equal(3);
                expect((caseBlock.raw[0] as Statement).value).to.be.equal(`case ${variable} in`);
                expect((caseBlock.raw[2] as Statement).value).to.be.equal(`esac`);

                expect(caseBlock.cases.length).to.be.equal(1);
                expect(caseBlock.cases[0].pattern).to.be.equal(pattern);
                expect((caseBlock.cases[0].content[0] as Statement).value).to.be.equal(statement);
            });

            it('add to last case', () => {
                const variable = '$value';
                const statement1 = 'echo whatever';
                const statement2 = 'echo whatever again';
                const caseOption = new CaseOption('*', statement1);
                const caseBlock = new Case(`${variable}`, caseOption);

                expect(caseBlock.raw.length).to.be.equal(3);
                expect((caseBlock.raw[0] as Statement).value).to.be.equal(`case ${variable} in`);
                expect((caseBlock.raw[2] as Statement).value).to.be.equal(`esac`);

                expect(caseBlock.cases.length).to.be.equal(1);
                expect(caseBlock.cases[0].pattern).to.be.equal(caseOption.pattern);
                expect((caseBlock.cases[0].content[0] as Statement).value).to.be.equal(statement1);

                caseBlock.addContent(statement2);

                expect(caseBlock.cases.length).to.be.equal(1);
                expect(caseBlock.cases[0].pattern).to.be.equal(caseOption.pattern);
                expect((caseBlock.cases[0].content[0] as Statement).value).to.be.equal(statement1);
                expect((caseBlock.cases[0].content[1] as Statement).value).to.be.equal(statement2);
            });
        });

        describe('failed', () => {
            it('undefined value', () => {
                expect(function() {
                    new Case(undefined as any)
                }).to.throw('Missing value');
            });

            it('add to last case but no last case exists', () => {
                expect(function() {
                    new Case('$variable').addContent('echo "Test"')
                }).to.throw('No cases to which content could be added');
            });
        });
    });
});
