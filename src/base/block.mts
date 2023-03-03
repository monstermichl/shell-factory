import { Statement } from './statement.mjs';

export type StatementOrBlock = Statement | Block;
export type StatementOrBlockOrString = StatementOrBlock | string;

/**
 * Represents a container to group a list of Statement- and other
 * Block-objects. New content can be added dynamically.
 */
export abstract class Block {
    protected _contentList: StatementOrBlock[] = [];

    /**
     * Block constructor.
     *
     * @param statement Block content.
     */
    protected constructor(statement?: Statement);
    /**
     * Block constructor.
     *
     * @param statement Block content.
     */
    protected constructor(statement?: string);
    /**
     * Block constructor.
     *
     * @param block Block content.
     */
    protected constructor(block?: Block);
    /**
     * Block constructor.
     *
     * @param statements Block content.
     */
    protected constructor(statements?: Statement[]);
    /**
     * Block constructor.
     *
     * @param statements Block content.
     */
    protected constructor(statements?: string[]);
    /**
     * Block constructor.
     *
     * @param blocks Block content.
     */
    protected constructor(blocks?: Block[]);
    /**
     * Block constructor.
     *
     * @param content Block content.
     */
    protected constructor(content?: StatementOrBlockOrString[]);
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    protected constructor(content?: any) {
        this._addContent(content);
    }

    /**
     * Returns the block's content. Be aware thought, that this getter might
     * be overwritten by subclasses to adapt to their behaviour. Therefore,
     * content can differ from raw content. To get the actual block content,
     * use the raw-getter.
     */
    public get content(): StatementOrBlock[] {
        return this._content;
    }

    /**
     * Returns the block's unbiased content.
     */
    public get raw(): StatementOrBlock[] {
        return this._contentList;
    }

    /**
     * Clears the block's content. Be aware thought, that this function might
     * be overwritten by subclasses to adapt to their behaviour. Therefore, not
     * all content may be cleared. To clear the actual block content, use
     * the clearRaw-function.
     *
     * @return This block object.
     */
    public clearContent(): Block {
        return this._clearContent();
    }

    /**
     * Clears the block's unbiased content.
     *
     * @return This block object.
     */
    public clearRaw(): Block {
        this._contentList = [];
        return this;
    }

    /**
     * Inserts a new statement at the given position in the content list. Be aware though,
     * that this function might be overwritten by subclasses to fit their needs.
     *
     * @param position  Insertion position.
     * @param statement Statement to add.
     *
     * @return If successful, the current object is returned. Otherwise, null is returned.
     */
    public insertContent(position: number, statement: string): Block;
    /**
     * Inserts a new statement at the given position in the content list. Be aware though,
     * that this function might be overwritten by subclasses to fit their needs.
     *
     * @param position  Insertion position.
     * @param statement Statement to add.
     *
     * @return If successful, the current object is returned. Otherwise, null is returned.
     */
    public insertContent(position: number, statement: Statement): Block;
    /**
     * Inserts a new block at the given position in the content list. Be aware though,
     * that this function might be overwritten by subclasses to fit their needs.
     *
     * @param position Insertion position.
     * @param block    Block to add.
     *
     * @return If successful, the current object is returned. Otherwise, null is returned.
     */
    public insertContent(position: number, block: Block): Block;
    /**
     * Inserts new statements at the given position in the content list. Be aware though,
     * that this function might be overwritten by subclasses to fit their needs.
     *
     * @param position   Insertion position.
     * @param statements Statements to add.
     *
     * @return If successful, the current object is returned. Otherwise, null is returned.
     */
    public insertContent(position: number, statements: string[]): Block;
    /**
     * Inserts new statements at the given position in the content list. Be aware though,
     * that this function might be overwritten by subclasses to fit their needs.
     *
     * @param position   Insertion position.
     * @param statements Statements to add.
     *
     * @return If successful, the current object is returned. Otherwise, null is returned.
     */
    public insertContent(position: number, statements: Statement[]): Block;
    /**
     * Inserts new blocks at the given position in the content list. Be aware though,
     * that this function might be overwritten by subclasses to fit their needs.
     *
     * @param position Insertion position.
     * @param blocks   Blocks to add.
     *
     * @return If successful, the current object is returned. Otherwise, null is returned.
     */
    public insertContent(position: number, blocks: Block[]): Block;
    /**
     * Inserts new statements or blocks at the given position in the content list. Be aware though,
     * that this function might be overwritten by subclasses to fit their needs.
     *
     * @param position Insertion position.
     * @param content  Statements or blocks to add.
     *
     * @return If successful, the current object is returned. Otherwise, null is returned.
     */
    public insertContent(position: number, content: StatementOrBlockOrString[]): Block;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public insertContent(position: number, content: any): Block {
        return this._insertContent(position, content);
    }

    /**
     * Pushes a new statement to the end of the content list.
     *
     * @param statement Statement to add.
     * @return If successful, the current object is returned. Otherwise, null is returned.
     */
    public addContent(statement: string): Block;
    /**
     * Pushes a new statement to the end of the content list.
     *
     * @param statement Statement to add.
     * @return If successful, the current object is returned. Otherwise, null is returned.
     */
    public addContent(statement: Statement): Block;
    /**
     * Pushes a new block to the end of the content list.
     *
     * @param block Block to add.
     * @return If successful, the current object is returned. Otherwise, null is returned.
     */
    public addContent(block: Block): Block;
    /**
     * Pushes new statements to the end of the content list.
     *
     * @param statements Statements to add.
     * @return If successful, the current object is returned. Otherwise, null is returned.
     */
    public addContent(statements: string[]): Block;
    /**
     * Pushes new statements to the end of the content list.
     *
     * @param statements Statements to add.
     * @return If successful, the current object is returned. Otherwise, null is returned.
     */
    public addContent(statements: Statement[]): Block;
    /**
     * Pushes new blocks to the end of the content list.
     *
     * @param blocks Blocks to add.
     * @return If successful, the current object is returned. Otherwise, null is returned.
     */
    public addContent(blocks: Block[]): Block;
    /**
     * Pushes new statements or blocks to the end of the content list.
     *
     * @param content Statements or blocks to add.
     * @return If successful, the current object is returned. Otherwise, null is returned.
     */
    public addContent(content: StatementOrBlockOrString[]): Block;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public addContent(content: any): Block {
        return this._addContent(content);
    }

    /**
     * Returns the block's unbiased content.
     */
    protected get _content(): StatementOrBlock[] {
        return this._contentList;
    }

    /**
     * Clears the block's unbiased content.
     *
     * @return This block object.
     */
    protected _clearContent(): Block {
        this._contentList = [];
        return this;
    }

    /**
     * Inserts a new statement at the given position in the content list.
     *
     * @param statement Statement to add.
     * @param position Insertion position.
     *
     * @return If successful, the current object is returned. Otherwise, null is returned.
     */
    protected _insertContent(position: number, statement: string): Block;
    /**
     * Inserts a new statement at the given position in the content list.
     *
     * @param statement Statement to add.
     * @param position Insertion position.
     *
     * @return If successful, the current object is returned. Otherwise, null is returned.
     */
    protected _insertContent(position: number, statement: Statement): Block;
    /**
     * Inserts a new block at the given position in the content list.
     *
     * @param block Block to add.
     * @return If successful, the current object is returned. Otherwise, null is returned.
     */
    protected _insertContent(position: number, block: Block): Block;
    /**
     * Inserts new statements at the given position in the content list.
     *
     * @param statements Statements to add.
     * @param position Insertion position.
     *
     * @return If successful, the current object is returned. Otherwise, null is returned.
     */
    protected _insertContent(position: number, statements: string[]): Block;
    /**
     * Inserts new statements at the given position in the content list.
     *
     * @param statements Statements to add.
     * @param position Insertion position.
     *
     * @return If successful, the current object is returned. Otherwise, null is returned.
     */
    protected _insertContent(position: number, statements: Statement[]): Block;
    /**
     * Inserts new blocks at the given position in the content list.
     *
     * @param blocks Blocks to add.
     * @param position Insertion position.
     *
     * @return If successful, the current object is returned. Otherwise, null is returned.
     */
    protected _insertContent(position: number, blocks: Block[]): Block;
    /**
     * Inserts new statements or blocks at the given position in the content list.
     *
     * @param content Statements or blocks to add.
     * @param position Insertion position.
     *
     * @return If successful, the current object is returned. Otherwise, null is returned.
     */
    protected _insertContent(position: number, content: StatementOrBlockOrString[]): Block;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    protected _insertContent(position: number, content: any): Block | null {
        let contentTyped;

        /* No position check required, splice does that for us. */
        if (content) {
            contentTyped = this._correctContent(content);

            if (contentTyped) {
                this._contentList.splice(position, 0, ...contentTyped as StatementOrBlock[]);
            }
        }
        return contentTyped ? this : null;
    }

    /**
     * Pushes a new statement to the end of the content list.
     *
     * @param statement Statement to add.
     * @return If successful, the current class is returned. Otherwise, null is returned.
     */
    protected _addContent(statement: string): Block;
    /**
     * Pushes a new statement to the end of the content list.
     *
     * @param statement Statement to add.
     * @return If successful, the current class is returned. Otherwise, null is returned.
     */
    protected _addContent(statement: Statement): Block;
    /**
     * Pushes a new block to the end of the content list.
     *
     * @param block Block to add.
     * @return If successful, the current class is returned. Otherwise, null is returned.
     */
    protected _addContent(block: Block): Block;
    /**
     * Pushes new statements to the end of the content list.
     *
     * @param statements Statements to add.
     * @return If successful, the current class is returned. Otherwise, null is returned.
     */
    protected _addContent(statements: string[]): Block;
    /**
     * Pushes new statements to the end of the content list.
     *
     * @param statements Statements to add.
     * @return If successful, the current class is returned. Otherwise, null is returned.
     */
    protected _addContent(statements: Statement[]): Block;
    /**
     * Pushes new blocks to the end of the content list.
     *
     * @param blocks Blocks to add.
     * @return If successful, the current class is returned. Otherwise, null is returned.
     */
    protected _addContent(blocks: Block[]): Block;
    /**
     * Pushes new statements or blocks to the end of the content list.
     *
     * @param content Statements or blocks to add.
     * @return If successful, the current class is returned. Otherwise, null is returned.
     */
    protected _addContent(content: StatementOrBlockOrString[]): Block;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    protected _addContent(content: any): Block | null {
        const contentTyped = this._correctContent(content);

        if (contentTyped) {
            this._contentList.push(...contentTyped as StatementOrBlock[]);
        }
        return contentTyped ? this : null;
    }

    /**
     * Turns strings (either provided directly or as a list) into Statements. Statements
     * and Blocks remain untouched. If the input is not a list it is wrapped into one.
     *
     * @param content Content to be corrected.
     * @return Statement, Block or an list of those two types, depending on the input.
     */
    private _correctContent(content: StatementOrBlockOrString | StatementOrBlockOrString[]): StatementOrBlock[] {
        let contentTyped: StatementOrBlockOrString[];

        if (content) {
            contentTyped = ((!(content instanceof Array)) ? [content] : [...content]) as StatementOrBlockOrString[];

            contentTyped?.forEach((contentPart: unknown, index: number) => {
                /* Map each string to a new Statement object. */
                if (typeof contentPart === 'string') {
                    contentTyped[index] = new Statement(contentPart);
                }

                /* Make sure, the added content is a Statement or a Block. */
                if (!(contentTyped[index] instanceof Statement) && !(contentTyped[index] instanceof Block)) {
                    throw new Error('Added content is neither a Statement nor a Block');
                }
            });

        }
        return contentTyped as StatementOrBlock[];
    }
}
