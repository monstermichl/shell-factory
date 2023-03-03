import {
    Block,
    StatementOrBlock,
    StatementOrBlockOrString,
} from '../base/block.mjs';
import { Statement } from '../base/statement.mjs';
import { StatementsBlock } from './statements-block.mjs';

/**
 * Serves as the base for all code parts that somehow change the
 * execution flow.
 */
export abstract class FlowBlock extends Block {
    protected _body = new StatementsBlock();
    protected _openingStatement: Statement;
    protected _closingStatement: Statement | null;

    /**
     * FlowBlock constructor.
     *
     * @param openingStatement FlowBlock opening statement.
     * @param statement        FlowBlock content.
     * @param closingStatement FlowBlock closing statement.
     */
    protected constructor(openingStatement: string, statement?: Statement, closingStatement?: string);
    /**
     * FlowBlock constructor.
     *
     * @param openingStatement FlowBlock opening statement.
     * @param statement        FlowBlock content.
     * @param closingStatement FlowBlock closing statement.
     */
    protected constructor(openingStatement: string, statement?: string, closingStatement?: string);
    /**
     * FlowBlock constructor.
     *
     * @param openingStatement FlowBlock opening statement.
     * @param statement        FlowBlock content.
     * @param closingStatement FlowBlock closing statement.
     */
    protected constructor(openingStatement: string, block?: Block, closingStatement?: string);
    /**
     * FlowBlock constructor.
     *
     * @param openingStatement FlowBlock opening statement.
     * @param statement        FlowBlock content.
     * @param closingStatement FlowBlock closing statement.
     */
    protected constructor(openingStatement: string, statements?: Statement[], closingStatement?: string);
    /**
     * FlowBlock constructor.
     *
     * @param openingStatement FlowBlock opening statement.
     * @param statement        FlowBlock content.
     * @param closingStatement FlowBlock closing statement.
     */
    protected constructor(openingStatement: string, statements?: string[], closingStatement?: string);
    /**
     * FlowBlock constructor.
     *
     * @param openingStatement FlowBlock opening statement.
     * @param statement        FlowBlock content.
     * @param closingStatement FlowBlock closing statement.
     */
    protected constructor(openingStatement: string, blocks?: Block[], closingStatement?: string);
    /**
     * FlowBlock constructor.
     *
     * @param openingStatement FlowBlock opening statement.
     * @param statement        FlowBlock content.
     * @param closingStatement FlowBlock closing statement.
     */
    protected constructor(openingStatement: string, content?: StatementOrBlockOrString[], closingStatement?: string);
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    protected constructor(openingStatement: string, content?: any, closingStatement?: string) {
        if (!openingStatement) {
            throw new Error('Missing opening statement');
        }
        const openingStatementTemp = new Statement(openingStatement);
        const closingStatementTemp = closingStatement ? new Statement(closingStatement) : null;

        super(openingStatementTemp);
        super.addContent(this._body);

        if (closingStatementTemp) {
            super.addContent(closingStatementTemp);
        }
        this._addBodyContent(content);

        this._openingStatement = openingStatementTemp;
        this._closingStatement = closingStatementTemp;
    }

    /**
     * Returns the opening Statement.
     */
    public get openingStatement(): Statement {
        return this._openingStatement;
    }

    /**
     * Returns the closing Statement (could be null).
     */
    public get closingStatement(): Statement | null {
        return this._closingStatement;
    }

    /**
     * Returns the block's body content.
     */
    public override get content(): StatementOrBlock[] {
        return this._body.content;
    }

    /**
     * Clears the block's body content.
     *
     * @return If successful, the current object is returned. Otherwise, null is returned.
     */
    public override clearContent(): FlowBlock {
        this._body.clearContent();
        return this;
    }

    /**
     * Inserts new content at the given position into the block's body.
     *
     * @param position  Insertion position.
     * @param statement Content to add.
     *
     * @return If successful, the current object is returned. Otherwise, null is returned.
     */
    public override insertContent(position: number, statement: string): FlowBlock;
    /**
     * Inserts new content at the given position into the block's body.
     *
     * @param position  Insertion position.
     * @param statement Content to add.
     *
     * @return If successful, the current object is returned. Otherwise, null is returned.
     */
    public override insertContent(position: number, statement: Statement): FlowBlock;
    /**
     * Inserts new content at the given position into the block's body.
     *
     * @param position Insertion position.
     * @param block    Content to add.
     *
     * @return If successful, the current object is returned. Otherwise, null is returned.
     */
    public override insertContent(position: number, block: Block): FlowBlock;
    /**
     * Inserts new content at the given position into the block's body.
     *
     * @param position   Insertion position.
     * @param statements Content to add.
     *
     * @return If successful, the current object is returned. Otherwise, null is returned.
     */
    public override insertContent(position: number, statements: string[]): FlowBlock;
    /**
     * Inserts new content at the given position into the block's body.
     *
     * @param position   Insertion position.
     * @param statements Content to add.
     *
     * @return If successful, the current object is returned. Otherwise, null is returned.
     */
    public override insertContent(position: number, statements: Statement[]): FlowBlock;
    /**
     * Inserts new content at the given position into the block's body.
     *
     * @param position Insertion position.
     * @param blocks   Content to add.
     *
     * @return If successful, the current object is returned. Otherwise, null is returned.
     */
    public override insertContent(position: number, blocks: Block[]): FlowBlock;
    /**
     * Inserts new content at the given position into the block's body.
     *
     * @param position Insertion position.
     * @param content  Content to add.
     *
     * @return If successful, the current object is returned. Otherwise, null is returned.
     */
    public override insertContent(position: number, content: StatementOrBlockOrString[]): FlowBlock;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public override insertContent(position: number, content: any): FlowBlock | null {
        return this._insertBodyContent(position, content);
    }

    /**
     * Pushes new content to the end of the block's body.
     *
     * @param statement Content to add.
     * @return If successful, the current class is returned. Otherwise, null is returned.
     */
    public override addContent(statement: string): FlowBlock;
    /**
     * Pushes new content to the end of the block's body.
     *
     * @param statement Content to add.
     * @return If successful, the current class is returned. Otherwise, null is returned.
     */
    public override addContent(statement: Statement): FlowBlock;
    /**
     * Pushes new content to the end of the block's body.
     *
     * @param block Content to add.
     * @return If successful, the current class is returned. Otherwise, null is returned.
     */
    public override addContent(block: Block): FlowBlock;
    /**
     * Pushes new content to the end of the block's body.
     *
     * @param statements Content to add.
     * @return If successful, the current class is returned. Otherwise, null is returned.
     */
    public override addContent(statements: string[]): FlowBlock;
    /**
     * Pushes new content to the end of the block's body.
     *
     * @param statements Content to add.
     * @return If successful, the current class is returned. Otherwise, null is returned.
     */
    public override addContent(statements: Statement[]): FlowBlock;
    /**
     * Pushes new content to the end of the block's body.
     *
     * @param blocks Content to add.
     * @return If successful, the current class is returned. Otherwise, null is returned.
     */
    public override addContent(blocks: Block[]): FlowBlock;
    /**
     * Pushes new content to the end of the block's body.
     *
     * @param content Content to add.
     * @return If successful, the current class is returned. Otherwise, null is returned.
     */
    public override addContent(content: StatementOrBlockOrString[]): FlowBlock;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public override addContent(content: any): FlowBlock | null {
        return this._addBodyContent(content);
    }

    /**
     * Inserts new content at the given position into the block's body.
     *
     * @param position  Insertion position.
     * @param statement Content to add.
     *
     * @return If successful, the current object is returned. Otherwise, null is returned.
     */
    protected _insertBodyContent(position: number, statement: string): FlowBlock;
    /**
     * Inserts new content at the given position into the block's body.
     *
     * @param position  Insertion position.
     * @param statement Content to add.
     *
     * @return If successful, the current object is returned. Otherwise, null is returned.
     */
    protected _insertBodyContent(position: number, statement: Statement): FlowBlock;
    /**
     * Inserts new content at the given position into the block's body.
     *
     * @param position Insertion position.
     * @param block    Content to add.
     *
     * @return If successful, the current object is returned. Otherwise, null is returned.
     */
    protected _insertBodyContent(position: number, block: Block): FlowBlock;
    /**
     * Inserts new content at the given position into the block's body.
     *
     * @param position   Insertion position.
     * @param statements Content to add.
     *
     * @return If successful, the current object is returned. Otherwise, null is returned.
     */
    protected _insertBodyContent(position: number, statements: string[]): FlowBlock;
    /**
     * Inserts new content at the given position into the block's body.
     *
     * @param position   Insertion position.
     * @param statements Content to add.
     *
     * @return If successful, the current object is returned. Otherwise, null is returned.
     */
    protected _insertBodyContent(position: number, statements: Statement[]): FlowBlock;
    /**
     * Inserts new content at the given position into the block's body.
     *
     * @param position Insertion position.
     * @param blocks   Content to add.
     *
     * @return If successful, the current object is returned. Otherwise, null is returned.
     */
    protected _insertBodyContent(position: number, blocks: Block[]): FlowBlock;
    /**
     * Inserts new content at the given position into the block's body.
     *
     * @param position Insertion position.
     * @param content  Content to add.
     *
     * @return If successful, the current object is returned. Otherwise, null is returned.
     */
    protected _insertBodyContent(position: number, content: StatementOrBlockOrString[]): FlowBlock;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    protected _insertBodyContent(position: number, content: any): FlowBlock | null {
        return this._body.insertContent(position, content) ? this : null;
    }

    /**
     * Pushes new content to the end of the block's body.
     *
     * @param statement Content to add.
     * @return If successful, the current class is returned. Otherwise, null is returned.
     */
    protected _addBodyContent(statement: string): FlowBlock;
    /**
     * Pushes new content to the end of the block's body.
     *
     * @param statement Content to add.
     * @return If successful, the current class is returned. Otherwise, null is returned.
     */
    protected _addBodyContent(statement: Statement): FlowBlock;
    /**
     * Pushes new content to the end of the block's body.
     *
     * @param block Content to add.
     * @return If successful, the current class is returned. Otherwise, null is returned.
     */
    protected _addBodyContent(block: Block): FlowBlock;
    /**
     * Pushes new content to the end of the block's body.
     *
     * @param statements Content to add.
     * @return If successful, the current class is returned. Otherwise, null is returned.
     */
    protected _addBodyContent(statements: FlowBlock[]): FlowBlock;
    /**
     * Pushes new content to the end of the block's body.
     *
     * @param statements Content to add.
     * @return If successful, the current class is returned. Otherwise, null is returned.
     */
    protected _addBodyContent(statements: Statement[]): FlowBlock;
    /**
     * Pushes new content to the end of the block's body.
     *
     * @param blocks Content to add.
     * @return If successful, the current class is returned. Otherwise, null is returned.
     */
    protected _addBodyContent(blocks: Block[]): FlowBlock;
    /**
     * Pushes new content to the end of the block's body.
     *
     * @param content Content to add.
     * @return If successful, the current class is returned. Otherwise, null is returned.
     */
    protected _addBodyContent(content: StatementOrBlockOrString[]): FlowBlock;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    protected _addBodyContent(content: any): FlowBlock | null {
        return this._body.addContent(content) ? this : null;
    }
}
