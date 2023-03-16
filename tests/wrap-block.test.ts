import { expect } from 'chai';
import { MetaData } from '../src/base/base.mjs';
import { Statement } from '../src/base/statement.mjs';
import { WrapBlock } from '../src/blocks/wrap-block.mjs';

/* Helper class to instantiate WrapBlock. */
class WrapBlockHelper extends WrapBlock {
    public constructor(openingStatement: string, content?: any, closingStatement?: string) {
        super(openingStatement, content, closingStatement);
    }
}

describe('WrapBlock tests', () => {
    describe('constructor', () => {
        describe('successful', () => {
            it('opening statement', () => {
                const openingStatement = 'if';
                const block = new WrapBlockHelper(openingStatement);

                expect(block.openingStatement.value).to.be.equal(openingStatement);
            });

            it('opening + closing statement', () => {
                const openingStatement = 'if';
                const closingStatement = 'fi';
                const block = new WrapBlockHelper(openingStatement, undefined, closingStatement);

                expect(block.openingStatement.value).to.be.equal(openingStatement);
                expect(block.closingStatement?.value).to.be.equal(closingStatement);
            });
        });

        describe('failed', () => {
            it('No opening statement', () => {
                try {
                    new WrapBlockHelper('');
                } catch (e: any) {
                    expect((e as Error).message).to.be.equal('Missing opening statement');
                }
            });
        });
    });

    describe('content', () => {
        describe('successful', () => {
            it('get', () => {
                const content = 'echo "test"';
                const block = new WrapBlockHelper('if', content);

                expect(block.content.length).to.be.equal(1);
                expect((block.content[0] as Statement).value).to.be.equal(content);
            });
        });
    });

    describe('findContent', () => {
        describe('successful', () => {
            it('non recursive', () => {
                const metaData = new MetaData();
                const statement = new Statement('echo "Simple statement"').meta(metaData);
                const block = new WrapBlockHelper('if', [
                    statement,
                ]);

                expect(block.content?.length).to.be.equal(1);

                const found = block.findContent(metaData.id);

                expect(found.length).to.be.equal(1);
                expect(found[0]).to.be.equal(statement);
            });
        });
    });

    describe('removeContent', () => {
        describe('successful', () => {
            it('non recursive', () => {
                const metaData = new MetaData();
                const block = new WrapBlockHelper('if', [
                    new Statement('echo "Simple statement"').meta(metaData),
                ]);

                expect(block.content?.length).to.be.equal(1);
                expect(block.removeContent(metaData.id)).to.be.equal(block);
                expect(block.content.length).to.be.equal(0);
            });
        });
    });

    describe('clearContent', () => {
        describe('successful', () => {
            it('clear', () => {
                const content = 'echo "test"';
                const block = new WrapBlockHelper('if', content);

                expect(block.content.length).to.be.equal(1);
                expect((block.content[0] as Statement).value).to.be.equal(content);

                expect(block.clearContent()).to.be.equal(block);
                expect(block.content.length).to.be.equal(0);
            });
        });
    });

    describe('insertContent', () => {
        describe('successful', () => {
            it('insert string statement', () => {
                const content = 'echo "test"';
                const block = new WrapBlockHelper('if');

                expect(block.insertContent(10, content)).to.be.equal(block); /* Insert content at any position to append it. */
                expect(block.content.length).to.be.equal(1);
                expect((block.content[0] as Statement).value).to.be.equal(content);
            });
        });

        describe('failed', () => {
            it('insert undefined', () => {
                const block = new WrapBlockHelper('if');

                expect(block.insertContent(0, undefined as any)).to.be.equal(null);
            });
        });
    });

    describe('addContent', () => {
        describe('successful', () => {
            it('add string statement', () => {
                const content = 'echo "test"';
                const block = new WrapBlockHelper('if');

                expect(block.addContent(content)).to.be.equal(block);
                expect(block.content.length).to.be.equal(1);
                expect((block.content[0] as Statement).value).to.be.equal(content);
            });
        });

        describe('failed', () => {
            it('add undefined', () => {
                const block = new WrapBlockHelper('if');

                expect(block.addContent(undefined as any)).to.be.equal(null);
            });
        });
    });
});
