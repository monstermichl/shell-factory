import { expect } from 'chai';
import { MetaData } from '../src/base/base.mjs';
import { Block } from '../src/base/block.mjs';
import { Statement } from '../src/base/statement.mjs';

/* Helper class to instantiate Block. */
class BlockHelper extends Block {
    constructor(content?: any) {
        super(content);
    }
}

describe('Block tests', () => {
    describe('constructor/content', () => {
        describe('successful', () => {
            it('get string statement content', () => {
                const statement = 'echo 123';
                const block = new BlockHelper(statement);
                const content = block.content;

                expect(content.length).to.be.equal(1);
                expect((content[0] as Statement).value).to.be.equal(statement);
            });

            it('get Statement content', () => {
                const statement = new Statement('echo 123');
                const block = new BlockHelper(statement);
                const content = block.content;

                expect(content.length).to.be.equal(1);
                expect(content[0]).to.be.equal(statement);
            });

            it('get Block content', () => {
                const statementsBlock = new BlockHelper('test');
                const block = new BlockHelper(statementsBlock);
                const content = block.content;

                expect(content.length).to.be.equal(1);
                expect(content[0]).to.be.equal(statementsBlock);
            });

            it('get string statements content', () => {
                const statements = ['echo 123', 'echo 456'];
                const block = new BlockHelper(statements);
                const content = block.content;

                expect(content.length).to.be.equal(2);
                content.forEach((value, index) => {
                    expect((value as Statement).value).to.be.equal(statements[index]);
                });
            });

            it('get Statements content', () => {
                const statements = [
                    new Statement('echo 123'),
                    new Statement('echo 456'),
                ];
                const block = new BlockHelper(statements);
                const content = block.content;

                expect(content.length).to.be.equal(2);
                content.forEach((value, index) => {
                    expect(value).to.be.equal(statements[index]);
                });
            });

            it('get Blocks content', () => {
                const statements = [
                    new BlockHelper('echo 123'),
                    new BlockHelper('echo 456'),
                ];
                const block = new BlockHelper(statements);
                const content = block.content;

                expect(content.length).to.be.equal(2);
                content.forEach((value, index) => {
                    expect(value).to.be.equal(statements[index]);
                });
            });

            it('get Statement or Blocks or String content', () => {
                const statements = [
                    new Statement('echo 123'),
                    new BlockHelper('echo 456'),
                    'echo 789',
                ];
                const block = new BlockHelper(statements);
                const content = block.content;

                expect(content.length).to.be.equal(3);
                expect(content[0]).to.be.equal(statements[0]);
                expect(content[1]).to.be.equal(statements[1]);
                expect((content[2] as Statement).value).to.be.equal(statements[2]);
            });

            it('get undefined content', () => {
                const block = new BlockHelper(undefined);
                const content = block.content;

                expect(content.length).to.be.equal(0);
            });
        });
    });

    describe('raw', () => {
        describe('successful', () => {
            it('get raw string statement content', () => {
                const statement = 'echo 123';
                const block = new BlockHelper(statement);
                const content = block.raw;

                expect(content.length).to.be.equal(1);
                expect((content[0] as Statement).value).to.be.equal(statement);
            });

            it('get raw Statement content', () => {
                const statement = new Statement('echo 123');
                const block = new BlockHelper(statement);
                const content = block.raw;

                expect(content.length).to.be.equal(1);
                expect(content[0]).to.be.equal(statement);
            });

            it('get raw Block content', () => {
                const statementsBlock = new BlockHelper('test');
                const block = new BlockHelper(statementsBlock);
                const content = block.raw;

                expect(content.length).to.be.equal(1);
                expect(content[0]).to.be.equal(statementsBlock);
            });

            it('get raw string statements content', () => {
                const statements = ['echo 123', 'echo 456'];
                const block = new BlockHelper(statements);
                const content = block.raw;

                expect(content.length).to.be.equal(2);
                content.forEach((value, index) => {
                    expect((value as Statement).value).to.be.equal(statements[index]);
                });
            });

            it('get raw Statements content', () => {
                const statements = [
                    new Statement('echo 123'),
                    new Statement('echo 456'),
                ];
                const block = new BlockHelper(statements);
                const content = block.raw;

                expect(content.length).to.be.equal(2);
                content.forEach((value, index) => {
                    expect(value).to.be.equal(statements[index]);
                });
            });

            it('get raw Blocks content', () => {
                const statements = [
                    new BlockHelper('echo 123'),
                    new BlockHelper('echo 456'),
                ];
                const block = new BlockHelper(statements);
                const content = block.raw;

                expect(content.length).to.be.equal(2);
                content.forEach((value, index) => {
                    expect(value).to.be.equal(statements[index]);
                });
            });

            it('get raw Statement or Blocks or String content', () => {
                const statements = [
                    new Statement('echo 123'),
                    new BlockHelper('echo 456'),
                    'echo 789',
                ];
                const block = new BlockHelper(statements);
                const content = block.raw;

                expect(content.length).to.be.equal(3);
                expect(content[0]).to.be.equal(statements[0]);
                expect(content[1]).to.be.equal(statements[1]);
                expect((content[2] as Statement).value).to.be.equal(statements[2]);
            });

            it('get raw undefined content', () => {
                const block = new BlockHelper(undefined);
                const content = block.raw;

                expect(content.length).to.be.equal(0);
            });
        });
    });

    describe('addContent', () => {
        describe('successful', () => {
            it('add string statement content', () => {
                const statement = 'echo 123';
                const block = new BlockHelper();

                block.addContent(statement);
                const content = block.content;

                expect(content.length).to.be.equal(1);
                expect((content[0] as Statement).value).to.be.equal(statement);
            });

            it('add Statement content', () => {
                const statement = new Statement('echo 123');
                const block = new BlockHelper();

                block.addContent(statement);
                const content = block.content;

                expect(content.length).to.be.equal(1);
                expect(content[0]).to.be.equal(statement);
            });

            it('add Block content', () => {
                const statementsBlock = new BlockHelper('test');
                const block = new BlockHelper();

                block.addContent(statementsBlock);
                const content = block.content;

                expect(content.length).to.be.equal(1);
                expect(content[0]).to.be.equal(statementsBlock);
            });

            it('add string statements content', () => {
                const statements = ['echo 123', 'echo 456'];
                const block = new BlockHelper();

                block.addContent(statements);
                const content = block.content;

                expect(content.length).to.be.equal(2);
                content.forEach((value, index) => {
                    expect((value as Statement).value).to.be.equal(statements[index]);
                });
            });

            it('add Statements content', () => {
                const statements = [
                    new Statement('echo 123'),
                    new Statement('echo 456'),
                ];
                const block = new BlockHelper();

                block.addContent(statements);
                const content = block.content;

                expect(content.length).to.be.equal(2);
                content.forEach((value, index) => {
                    expect(value).to.be.equal(statements[index]);
                });
            });

            it('add Blocks content', () => {
                const statements = [
                    new BlockHelper('echo 123'),
                    new BlockHelper('echo 456'),
                ];
                const block = new BlockHelper();

                block.addContent(statements);
                const content = block.content;

                expect(content.length).to.be.equal(2);
                content.forEach((value, index) => {
                    expect(value).to.be.equal(statements[index]);
                });
            });

            it('add Statement or Blocks or String content', () => {
                const statements = [
                    new Statement('echo 123'),
                    new BlockHelper('echo 456'),
                    'echo 789',
                ];
                const block = new BlockHelper();

                block.addContent(statements);
                const content = block.content;

                expect(content.length).to.be.equal(3);
                expect(content[0]).to.be.equal(statements[0]);
                expect(content[1]).to.be.equal(statements[1]);
                expect((content[2] as Statement).value).to.be.equal(statements[2]);
            });

            it('add undefined content', () => {
                const block = new BlockHelper();

                block.addContent(undefined as any);
                const content = block.content;

                expect(content.length).to.be.equal(0);
            });
        });

        describe('failed', () => {
            it('add neither Statement nor Block content', () => {
                expect(function() {
                    new BlockHelper().addContent({} as any)
                }).to.throw('Added content is neither a Statement nor a Block');
            });
        });
    });

    describe('insertContent', () => {
        describe('successful', () => {
            it('insert string statement content', () => {
                const statement = 'echo 123';
                const block = new BlockHelper();

                block.insertContent(0, statement);
                const content = block.content;

                expect(content.length).to.be.equal(1);
                expect((content[0] as Statement).value).to.be.equal(statement);
            });

            it('insert Statement content', () => {
                const statement = new Statement('echo 123');
                const block = new BlockHelper();

                block.insertContent(0, statement);
                const content = block.content;

                expect(content.length).to.be.equal(1);
                expect(content[0]).to.be.equal(statement);
            });

            it('insert Block content', () => {
                const statementsBlock = new BlockHelper('test');
                const block = new BlockHelper();

                block.insertContent(0, statementsBlock);
                const content = block.content;

                expect(content.length).to.be.equal(1);
                expect(content[0]).to.be.equal(statementsBlock);
            });

            it('insert string statements content', () => {
                const statements = ['echo 123', 'echo 456'];
                const block = new BlockHelper();

                block.insertContent(0, statements);
                const content = block.content;

                expect(content.length).to.be.equal(2);
                content.forEach((value, index) => {
                    expect((value as Statement).value).to.be.equal(statements[index]);
                });
            });

            it('insert Statements content', () => {
                const statements = [
                    new Statement('echo 123'),
                    new Statement('echo 456'),
                ];
                const block = new BlockHelper();

                block.insertContent(0, statements);
                const content = block.content;

                expect(content.length).to.be.equal(2);
                content.forEach((value, index) => {
                    expect(value).to.be.equal(statements[index]);
                });
            });

            it('insert Blocks content', () => {
                const statements = [
                    new BlockHelper('echo 123'),
                    new BlockHelper('echo 456'),
                ];
                const block = new BlockHelper();

                block.insertContent(0, statements);
                const content = block.content;

                expect(content.length).to.be.equal(2);
                content.forEach((value, index) => {
                    expect(value).to.be.equal(statements[index]);
                });
            });

            it('insert Statement or Blocks or String content', () => {
                const statements = [
                    new Statement('echo 123'),
                    new BlockHelper('echo 456'),
                    'echo 789',
                ];
                const block = new BlockHelper();

                block.insertContent(0, statements);
                const content = block.content;

                expect(content.length).to.be.equal(3);
                expect(content[0]).to.be.equal(statements[0]);
                expect(content[1]).to.be.equal(statements[1]);
                expect((content[2] as Statement).value).to.be.equal(statements[2]);
            });

            it('insert undefined content', () => {
                const block = new BlockHelper();

                block.insertContent(0, undefined as any);
                const content = block.content;

                expect(content.length).to.be.equal(0);
            });

            it('insert outside of range positive', () => {
                const statement = 'echo 123';
                const block = new BlockHelper();

                block.insertContent(10, statement);
                const content = block.content;

                expect(content.length).to.be.equal(1);
                expect((content[0] as Statement).value).to.be.equal(statement);
            });

            it('insert outside of range negative', () => {
                const statement = 'echo 123';
                const block = new BlockHelper();

                block.insertContent(-10, statement);
                const content = block.content;

                expect(content.length).to.be.equal(1);
                expect((content[0] as Statement).value).to.be.equal(statement);
            });
        });
    });

    describe('removeContent', () => {
        describe('successful', () => {
            it('non recursive', () => {
                const metaData = new MetaData();
                const block = new BlockHelper([
                    new Statement('echo "Simple statement"').meta(metaData),
                ]);

                expect(block.content?.length).to.be.equal(1);
                expect(block.removeContent(metaData.id)).to.be.equal(block);
                expect(block.content.length).to.be.equal(0);
            });

            it('recursive', () => {
                const metaData = new MetaData();
                const block = new BlockHelper([
                    new BlockHelper([
                        new BlockHelper([
                            new Statement('echo "Nested statement"').meta(metaData),
                        ]),
                    ]),
                ]);

                expect(block.content?.length).to.be.equal(1);
                expect((block.content[0] as Block)?.content?.length).to.be.equal(1);
                expect(((block.content[0] as Block).content[0] as Block).content.length).to.be.equal(1);
                expect(((block.content[0] as Block).content[0] as Block).content[0].id).to.be.equal(metaData.id);

                expect(block.removeContent(metaData.id, true)).to.be.equal(block);
                expect(((block.content[0] as Block)?.content[0] as Block)?.content.length).to.be.equal(0);
            });

            it('string pattern', () => {
                const echoOutput = 'Simple statement';
                const metaData = new MetaData();
                const block = new BlockHelper([
                    new Statement(`echo "${echoOutput}"`).meta(metaData),
                ]);

                expect(block.content?.length).to.be.equal(1);
                expect(block.removeContent(`.*${echoOutput}`)).to.be.equal(block);
                expect(block.content.length).to.be.equal(0);
            });
        });

        describe('failed', () => {
            it('no ID or pattern provided', () => {
                expect(function() {
                    new BlockHelper([
                        'echo "Hello World"',
                    ]).removeContent(undefined as any)
                }).to.throw('No ID or pattern provided');
            });

            it('invalid ID or pattern type', () => {
                expect(function() {
                    new BlockHelper([
                        'echo "Hello World"',
                    ]).removeContent({} as any)
                }).to.throw('Invalid ID or pattern type');
            });
        });
    });

    describe('findContent', () => {
        describe('successful', () => {
            it('non recursive', () => {
                const metaData = new MetaData();
                const statement = new Statement('echo "Simple statement"').meta(metaData);
                const block = new BlockHelper([
                    statement,
                ]);

                expect(block.content?.length).to.be.equal(1);

                const found = block.findContent(metaData.id);

                expect(found.length).to.be.equal(1);
                expect(found[0]).to.be.equal(statement);
            });

            it('recursive', () => {
                const metaData = new MetaData();
                const statement = new Statement('echo "Simple statement"').meta(metaData);
                const block = new BlockHelper([
                    new BlockHelper([
                        new BlockHelper([
                            statement,
                        ]),
                    ]),
                ]);

                expect(block.content?.length).to.be.equal(1);
                expect((block.content[0] as Block)?.content?.length).to.be.equal(1);
                expect(((block.content[0] as Block).content[0] as Block).content.length).to.be.equal(1);
                expect(((block.content[0] as Block).content[0] as Block).content[0].id).to.be.equal(metaData.id);

                const found = block.findContent(metaData.id, true);

                expect(found.length).to.be.equal(1);
                expect(found[0]).to.be.equal(statement);
            });
        });
    });

    describe('clearContent', () => {
        describe('successful', () => {
            it('clear', () => {
                const block = new BlockHelper('echo 123');
                const content = block.content;

                expect(content.length).to.be.equal(1);
                expect(block.clearContent()).to.be.equal(block);
                expect(block.content.length).to.be.equal(0);
            });
        });
    });

    describe('clearRaw', () => {
        describe('successful', () => {
            it('clear', () => {
                const block = new BlockHelper('echo 123');
                const raw = block.raw;

                expect(raw.length).to.be.equal(1);
                expect(block.clearRaw()).to.be.equal(block);
                expect(block.raw.length).to.be.equal(0);
            });
        });
    });
});
