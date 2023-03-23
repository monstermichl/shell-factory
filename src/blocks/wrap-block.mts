import {
    Block,
    StatementOrBlock,
    StatementOrBlockOrString,
} from '../base/block.mjs';
import { Command } from '../base/command.mjs';
import { Statement } from '../base/statement.mjs';

export class OpeningStatement extends Command {
    /* Nothing to do. */
}

export class ClosingStatement extends Command {
    /* Nothing to do. */
}

/**
 * Serves as the body of a WrapBlock.
 */
export class Body extends Block {
    constructor() {
        super();
    }
}

/**
 * Serves as the base for all code parts that somehow change the
 * execution flow.
 */
export abstract class WrapBlock extends Block {
    protected _body = new Body();
    protected _openingStatement: OpeningStatement;
    protected _closingStatement: ClosingStatement | null;

    /**
     * WrapBlock constructor.
     *
     * @param openingStatement WrapBlock opening statement.
     * @param statement        WrapBlock content.
     * @param closingStatement WrapBlock closing statement.
     */
    protected constructor(openingStatement: string, statement?: Statement, closingStatement?: string);
    /**
     * WrapBlock constructor.
     *
     * @param openingStatement WrapBlock opening statement.
     * @param statement        WrapBlock content.
     * @param closingStatement WrapBlock closing statement.
     */
    protected constructor(openingStatement: string, statement?: string, closingStatement?: string);
    /**
     * WrapBlock constructor.
     *
     * @param openingStatement WrapBlock opening statement.
     * @param statement        WrapBlock content.
     * @param closingStatement WrapBlock closing statement.
     */
    protected constructor(openingStatement: string, block?: Block, closingStatement?: string);
    /**
     * WrapBlock constructor.
     *
     * @param openingStatement WrapBlock opening statement.
     * @param statement        WrapBlock content.
     * @param closingStatement WrapBlock closing statement.
     */
    protected constructor(openingStatement: string, statements?: Statement[], closingStatement?: string);
    /**
     * WrapBlock constructor.
     *
     * @param openingStatement WrapBlock opening statement.
     * @param statement        WrapBlock content.
     * @param closingStatement WrapBlock closing statement.
     */
    protected constructor(openingStatement: string, statements?: string[], closingStatement?: string);
    /**
     * WrapBlock constructor.
     *
     * @param openingStatement WrapBlock opening statement.
     * @param statement        WrapBlock content.
     * @param closingStatement WrapBlock closing statement.
     */
    protected constructor(openingStatement: string, blocks?: Block[], closingStatement?: string);
    /**
     * WrapBlock constructor.
     *
     * @param openingStatement WrapBlock opening statement.
     * @param statement        WrapBlock content.
     * @param closingStatement WrapBlock closing statement.
     */
    protected constructor(openingStatement: string, content?: StatementOrBlockOrString[], closingStatement?: string);
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    protected constructor(openingStatement: string, content?: any, closingStatement?: string) {
        if (!openingStatement) {
            throw new Error('Missing opening statement');
        }
        const openingStatementTemp = new OpeningStatement(openingStatement);
        const closingStatementTemp = closingStatement ? new ClosingStatement(closingStatement) : null;

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
    public get openingStatement(): OpeningStatement {
        return this._openingStatement;
    }

    /**
     * Returns the closing Statement (could be null).
     */
    public get closingStatement(): ClosingStatement | null {
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
     * @returns If successful, the current object is returned. Otherwise, null is returned.
     */
    public override clearContent(): this {
        this._body.clearContent();
        return this;
    }

    /**
     * Inserts new content at the given position into the block's body.
     *
     * @param position  Insertion position.
     * @param statement Content to add.
     *
     * @returns If successful, the current object is returned. Otherwise, null is returned.
     */
    public override insertContent(position: number, statement: string): this;
    /**
     * Inserts new content at the given position into the block's body.
     *
     * @param position  Insertion position.
     * @param statement Content to add.
     *
     * @returns If successful, the current object is returned. Otherwise, null is returned.
     */
    public override insertContent(position: number, statement: Statement): this;
    /**
     * Inserts new content at the given position into the block's body.
     *
     * @param position Insertion position.
     * @param block    Content to add.
     *
     * @returns If successful, the current object is returned. Otherwise, null is returned.
     */
    public override insertContent(position: number, block: Block): this;
    /**
     * Inserts new content at the given position into the block's body.
     *
     * @param position   Insertion position.
     * @param statements Content to add.
     *
     * @returns If successful, the current object is returned. Otherwise, null is returned.
     */
    public override insertContent(position: number, statements: string[]): this;
    /**
     * Inserts new content at the given position into the block's body.
     *
     * @param position   Insertion position.
     * @param statements Content to add.
     *
     * @returns If successful, the current object is returned. Otherwise, null is returned.
     */
    public override insertContent(position: number, statements: Statement[]): this;
    /**
     * Inserts new content at the given position into the block's body.
     *
     * @param position Insertion position.
     * @param blocks   Content to add.
     *
     * @returns If successful, the current object is returned. Otherwise, null is returned.
     */
    public override insertContent(position: number, blocks: Block[]): this;
    /**
     * Inserts new content at the given position into the block's body.
     *
     * @param position Insertion position.
     * @param content  Content to add.
     *
     * @returns If successful, the current object is returned. Otherwise, null is returned.
     */
    public override insertContent(position: number, content: StatementOrBlockOrString[]): this;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public override insertContent(position: number, content: any): this | null {
        return this._insertBodyContent(position, content);
    }

    /**
     * Pushes new content to the end of the block's body.
     *
     * @param statement Content to add.
     * @returns If successful, the current class is returned. Otherwise, null is returned.
     */
    public override addContent(statement: string): this;
    /**
     * Pushes new content to the end of the block's body.
     *
     * @param statement Content to add.
     * @returns If successful, the current class is returned. Otherwise, null is returned.
     */
    public override addContent(statement: Statement): this;
    /**
     * Pushes new content to the end of the block's body.
     *
     * @param block Content to add.
     * @returns If successful, the current class is returned. Otherwise, null is returned.
     */
    public override addContent(block: Block): this;
    /**
     * Pushes new content to the end of the block's body.
     *
     * @param statements Content to add.
     * @returns If successful, the current class is returned. Otherwise, null is returned.
     */
    public override addContent(statements: string[]): this;
    /**
     * Pushes new content to the end of the block's body.
     *
     * @param statements Content to add.
     * @returns If successful, the current class is returned. Otherwise, null is returned.
     */
    public override addContent(statements: Statement[]): this;
    /**
     * Pushes new content to the end of the block's body.
     *
     * @param blocks Content to add.
     * @returns If successful, the current class is returned. Otherwise, null is returned.
     */
    public override addContent(blocks: Block[]): this;
    /**
     * Pushes new content to the end of the block's body.
     *
     * @param content Content to add.
     * @returns If successful, the current class is returned. Otherwise, null is returned.
     */
    public override addContent(content: StatementOrBlockOrString[]): this;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public override addContent(content: any): this | null {
        return this._addBodyContent(content);
    }

    /**
     * Removes all entries based on the provided ID or Statement pattern from the block's body.
     * 
     * @param idOrPattern Content ID or Statement pattern.
     * @param recursive   The id will also be searched in all sub-blocks.
     *
     * @returns The current object.
     */
    public override removeContent(idOrPattern: string, recursive?: boolean): this;
    /**
     * Removes all entries based on the provided ID or Statement pattern from the block's body.
     * 
     * @param pattern   Content ID or Statement pattern.
     * @param recursive The id will also be searched in all sub-blocks.
     *
     * @returns The current object.
     */
    public override removeContent(pattern: RegExp, recursive?: boolean): this;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public override removeContent(arg: any, recursive=false): this {
        this._body.removeContent(arg, recursive);
        return this;
    }

    /**
     * Searches all entries based on the provided ID or Statement pattern in the
     * block's body.
     * 
     * @param idOrPattern Content ID or Statement pattern.
     * @param recursive   The id will also be searched in all sub-blocks.
     *
     * @returns List of found objects.
     */
    public override findContent(idOrPattern: string, recursive?: boolean): StatementOrBlock[];
    /**
     * Searches all entries based on the provided ID or Statement pattern in the
     * block's body.
     * 
     * @param pattern   Content ID or Statement pattern.
     * @param recursive The id will also be searched in all sub-blocks.
     *
     * @returns List of found objects.
     */
    public override findContent(pattern: RegExp, recursive?: boolean): StatementOrBlock[];
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public override findContent(arg: any, recursive=false): StatementOrBlock[] {
        return this._body.findContent(arg, recursive);
    }

    /**
     * Inserts new content at the given position into the block's body.
     *
     * @param position  Insertion position.
     * @param statement Content to add.
     *
     * @returns If successful, the current object is returned. Otherwise, null is returned.
     */
    protected _insertBodyContent(position: number, statement: string): this;
    /**
     * Inserts new content at the given position into the block's body.
     *
     * @param position  Insertion position.
     * @param statement Content to add.
     *
     * @returns If successful, the current object is returned. Otherwise, null is returned.
     */
    protected _insertBodyContent(position: number, statement: Statement): this;
    /**
     * Inserts new content at the given position into the block's body.
     *
     * @param position Insertion position.
     * @param block    Content to add.
     *
     * @returns If successful, the current object is returned. Otherwise, null is returned.
     */
    protected _insertBodyContent(position: number, block: Block): this;
    /**
     * Inserts new content at the given position into the block's body.
     *
     * @param position   Insertion position.
     * @param statements Content to add.
     *
     * @returns If successful, the current object is returned. Otherwise, null is returned.
     */
    protected _insertBodyContent(position: number, statements: string[]): this;
    /**
     * Inserts new content at the given position into the block's body.
     *
     * @param position   Insertion position.
     * @param statements Content to add.
     *
     * @returns If successful, the current object is returned. Otherwise, null is returned.
     */
    protected _insertBodyContent(position: number, statements: Statement[]): this;
    /**
     * Inserts new content at the given position into the block's body.
     *
     * @param position Insertion position.
     * @param blocks   Content to add.
     *
     * @returns If successful, the current object is returned. Otherwise, null is returned.
     */
    protected _insertBodyContent(position: number, blocks: Block[]): this;
    /**
     * Inserts new content at the given position into the block's body.
     *
     * @param position Insertion position.
     * @param content  Content to add.
     *
     * @returns If successful, the current object is returned. Otherwise, null is returned.
     */
    protected _insertBodyContent(position: number, content: StatementOrBlockOrString[]): this;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    protected _insertBodyContent(position: number, content: any): this | null {
        return this._body.insertContent(position, content) ? this : null;
    }

    /**
     * Pushes new content to the end of the block's body.
     *
     * @param statement Content to add.
     * @returns If successful, the current class is returned. Otherwise, null is returned.
     */
    protected _addBodyContent(statement: string): this;
    /**
     * Pushes new content to the end of the block's body.
     *
     * @param statement Content to add.
     * @returns If successful, the current class is returned. Otherwise, null is returned.
     */
    protected _addBodyContent(statement: Statement): this;
    /**
     * Pushes new content to the end of the block's body.
     *
     * @param block Content to add.
     * @returns If successful, the current class is returned. Otherwise, null is returned.
     */
    protected _addBodyContent(block: Block): this;
    /**
     * Pushes new content to the end of the block's body.
     *
     * @param statements Content to add.
     * @returns If successful, the current class is returned. Otherwise, null is returned.
     */
    protected _addBodyContent(statements: WrapBlock[]): this;
    /**
     * Pushes new content to the end of the block's body.
     *
     * @param statements Content to add.
     * @returns If successful, the current class is returned. Otherwise, null is returned.
     */
    protected _addBodyContent(statements: Statement[]): this;
    /**
     * Pushes new content to the end of the block's body.
     *
     * @param blocks Content to add.
     * @returns If successful, the current class is returned. Otherwise, null is returned.
     */
    protected _addBodyContent(blocks: Block[]): this;
    /**
     * Pushes new content to the end of the block's body.
     *
     * @param content Content to add.
     * @returns If successful, the current class is returned. Otherwise, null is returned.
     */
    protected _addBodyContent(content: StatementOrBlockOrString[]): this;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    protected _addBodyContent(content: any): this | null {
        return this._body.addContent(content) ? this : null;
    }
}
