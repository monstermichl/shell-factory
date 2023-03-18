import { Base } from './base.mjs';
import { Statement } from './statement.mjs';

export type StatementOrBlock = Statement | Block;
export type StatementOrBlockOrString = StatementOrBlock | string;

class IdOrPatternEvaluationResult {
    isId: boolean;
    regex: RegExp;
}

/**
 * Represents a container to group a list of Statement- and other
 * Block-objects. New content can be added dynamically.
 */
export abstract class Block extends Base {
    private readonly _UUID_PATTERN = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/; /* RegEx taken from https://ihateregex.io/expr/uuid/. */

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
        super();
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
     * @returns This block object.
     */
    public clearContent(): this {
        return this._clearContent();
    }

    /**
     * Clears the block's unbiased content.
     *
     * @returns This block object.
     */
    public clearRaw(): this {
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
     * @returns If successful, the current object is returned. Otherwise, null is returned.
     */
    public insertContent(position: number, statement: string): this;
    /**
     * Inserts a new statement at the given position in the content list. Be aware though,
     * that this function might be overwritten by subclasses to fit their needs.
     *
     * @param position  Insertion position.
     * @param statement Statement to add.
     *
     * @returns If successful, the current object is returned. Otherwise, null is returned.
     */
    public insertContent(position: number, statement: Statement): this;
    /**
     * Inserts a new block at the given position in the content list. Be aware though,
     * that this function might be overwritten by subclasses to fit their needs.
     *
     * @param position Insertion position.
     * @param block    Block to add.
     *
     * @returns If successful, the current object is returned. Otherwise, null is returned.
     */
    public insertContent(position: number, block: Block): this;
    /**
     * Inserts new statements at the given position in the content list. Be aware though,
     * that this function might be overwritten by subclasses to fit their needs.
     *
     * @param position   Insertion position.
     * @param statements Statements to add.
     *
     * @returns If successful, the current object is returned. Otherwise, null is returned.
     */
    public insertContent(position: number, statements: string[]): this;
    /**
     * Inserts new statements at the given position in the content list. Be aware though,
     * that this function might be overwritten by subclasses to fit their needs.
     *
     * @param position   Insertion position.
     * @param statements Statements to add.
     *
     * @returns If successful, the current object is returned. Otherwise, null is returned.
     */
    public insertContent(position: number, statements: Statement[]): this;
    /**
     * Inserts new blocks at the given position in the content list. Be aware though,
     * that this function might be overwritten by subclasses to fit their needs.
     *
     * @param position Insertion position.
     * @param blocks   Blocks to add.
     *
     * @returns If successful, the current object is returned. Otherwise, null is returned.
     */
    public insertContent(position: number, blocks: Block[]): this;
    /**
     * Inserts new statements or blocks at the given position in the content list. Be aware though,
     * that this function might be overwritten by subclasses to fit their needs.
     *
     * @param position Insertion position.
     * @param content  Statements or blocks to add.
     *
     * @returns If successful, the current object is returned. Otherwise, null is returned.
     */
    public insertContent(position: number, content: StatementOrBlockOrString[]): this;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public insertContent(position: number, content: any): this {
        return this._insertContent(position, content);
    }

    /**
     * Pushes a new statement to the end of the content list.
     *
     * @param statement Statement to add.
     * @returns If successful, the current object is returned. Otherwise, null is returned.
     */
    public addContent(statement: string): this;
    /**
     * Pushes a new statement to the end of the content list.
     *
     * @param statement Statement to add.
     * @returns If successful, the current object is returned. Otherwise, null is returned.
     */
    public addContent(statement: Statement): this;
    /**
     * Pushes a new block to the end of the content list.
     *
     * @param block Block to add.
     * @returns If successful, the current object is returned. Otherwise, null is returned.
     */
    public addContent(block: Block): this;
    /**
     * Pushes new statements to the end of the content list.
     *
     * @param statements Statements to add.
     * @returns If successful, the current object is returned. Otherwise, null is returned.
     */
    public addContent(statements: string[]): this;
    /**
     * Pushes new statements to the end of the content list.
     *
     * @param statements Statements to add.
     * @returns If successful, the current object is returned. Otherwise, null is returned.
     */
    public addContent(statements: Statement[]): this;
    /**
     * Pushes new blocks to the end of the content list.
     *
     * @param blocks Blocks to add.
     * @returns If successful, the current object is returned. Otherwise, null is returned.
     */
    public addContent(blocks: Block[]): this;
    /**
     * Pushes new statements or blocks to the end of the content list.
     *
     * @param content Statements or blocks to add.
     * @returns If successful, the current object is returned. Otherwise, null is returned.
     */
    public addContent(content: StatementOrBlockOrString[]): this;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public addContent(content: any): this {
        return this._addContent(content);
    }

    /**
     * Searches all entries based on the provided ID or Statement pattern in the
     * content-list.
     * 
     * @param idOrPattern Content ID or Statement pattern.
     * @param recursive   The id will also be searched in all sub-blocks.
     *
     * @returns List of found objects.
     */
    public findContent(idOrPattern: string, recursive?: boolean): StatementOrBlock[];
    /**
     * Searches all entries based on the provided ID or Statement pattern in the
     * content-list.
     * 
     * @param pattern   Content ID or Statement pattern.
     * @param recursive The id will also be searched in all sub-blocks.
     *
     * @returns List of found objects.
     */
    public findContent(pattern: RegExp, recursive?: boolean): StatementOrBlock[];
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public findContent(arg: any, recursive=false): StatementOrBlock[] {
        return this._findContent(arg, recursive);
    }

    /**
     * Removes all entries based on the provided ID or Statement pattern from the content-list.
     * 
     * @param idOrPattern Content ID or Statement pattern.
     * @param recursive   The id will also be searched in all sub-blocks.
     *
     * @returns The current object.
     */
    public removeContent(idOrPattern: string, recursive?: boolean): this;
    /**
     * Removes all entries based on the provided ID or Statement pattern from the content-list.
     * 
     * @param pattern   Content ID or Statement pattern.
     * @param recursive The id will also be searched in all sub-blocks.
     *
     * @returns The current object.
     */
    public removeContent(pattern: RegExp, recursive?: boolean): this;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public removeContent(arg: any, recursive=false): this {
        return this._removeContent(arg, recursive);
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
     * @returns This block object.
     */
    protected _clearContent(): this {
        this._contentList = [];
        return this;
    }

    /**
     * Inserts a new statement at the given position in the content list.
     *
     * @param statement Statement to add.
     * @param position Insertion position.
     *
     * @returns If successful, the current object is returned. Otherwise, null is returned.
     */
    protected _insertContent(position: number, statement: string): this;
    /**
     * Inserts a new statement at the given position in the content list.
     *
     * @param statement Statement to add.
     * @param position Insertion position.
     *
     * @returns If successful, the current object is returned. Otherwise, null is returned.
     */
    protected _insertContent(position: number, statement: Statement): this;
    /**
     * Inserts a new block at the given position in the content list.
     *
     * @param block Block to add.
     * @returns If successful, the current object is returned. Otherwise, null is returned.
     */
    protected _insertContent(position: number, block: Block): this;
    /**
     * Inserts new statements at the given position in the content list.
     *
     * @param statements Statements to add.
     * @param position Insertion position.
     *
     * @returns If successful, the current object is returned. Otherwise, null is returned.
     */
    protected _insertContent(position: number, statements: string[]): this;
    /**
     * Inserts new statements at the given position in the content list.
     *
     * @param statements Statements to add.
     * @param position Insertion position.
     *
     * @returns If successful, the current object is returned. Otherwise, null is returned.
     */
    protected _insertContent(position: number, statements: Statement[]): this;
    /**
     * Inserts new blocks at the given position in the content list.
     *
     * @param blocks Blocks to add.
     * @param position Insertion position.
     *
     * @returns If successful, the current object is returned. Otherwise, null is returned.
     */
    protected _insertContent(position: number, blocks: Block[]): this;
    /**
     * Inserts new statements or blocks at the given position in the content list.
     *
     * @param content Statements or blocks to add.
     * @param position Insertion position.
     *
     * @returns If successful, the current object is returned. Otherwise, null is returned.
     */
    protected _insertContent(position: number, content: StatementOrBlockOrString[]): this;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    protected _insertContent(position: number, content: any): this | null {
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
     * @returns If successful, the current class is returned. Otherwise, null is returned.
     */
    protected _addContent(statement: string): this;
    /**
     * Pushes a new statement to the end of the content list.
     *
     * @param statement Statement to add.
     * @returns If successful, the current class is returned. Otherwise, null is returned.
     */
    protected _addContent(statement: Statement): this;
    /**
     * Pushes a new block to the end of the content list.
     *
     * @param block Block to add.
     * @returns If successful, the current class is returned. Otherwise, null is returned.
     */
    protected _addContent(block: Block): this;
    /**
     * Pushes new statements to the end of the content list.
     *
     * @param statements Statements to add.
     * @returns If successful, the current class is returned. Otherwise, null is returned.
     */
    protected _addContent(statements: string[]): this;
    /**
     * Pushes new statements to the end of the content list.
     *
     * @param statements Statements to add.
     * @returns If successful, the current class is returned. Otherwise, null is returned.
     */
    protected _addContent(statements: Statement[]): this;
    /**
     * Pushes new blocks to the end of the content list.
     *
     * @param blocks Blocks to add.
     * @returns If successful, the current class is returned. Otherwise, null is returned.
     */
    protected _addContent(blocks: Block[]): this;
    /**
     * Pushes new statements or blocks to the end of the content list.
     *
     * @param content Statements or blocks to add.
     * @returns If successful, the current class is returned. Otherwise, null is returned.
     */
    protected _addContent(content: StatementOrBlockOrString[]): this;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    protected _addContent(content: any): this | null {
        const contentTyped = this._correctContent(content);

        if (contentTyped) {
            this._contentList.push(...contentTyped as StatementOrBlock[]);
        }
        return contentTyped ? this : null;
    }

    /**
     * Searches all entries based on the provided ID or Statement pattern in the
     * content-list.
     * 
     * @param idOrPattern Content ID or Statement pattern.
     * @param recursive   The id will also be searched in all sub-blocks.
     *
     * @returns List of found objects.
     */
    protected _findContent(idOrPattern: string, recursive?: boolean): StatementOrBlock[];
    /**
     * Searches all entries based on the provided ID or Statement pattern in the
     * content-list.
     * 
     * @param pattern   Content ID or Statement pattern.
     * @param recursive The id will also be searched in all sub-blocks.
     *
     * @returns List of found objects.
     */
    protected _findContent(pattern: RegExp, recursive?: boolean): StatementOrBlock[];
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    protected _findContent(arg: any, recursive=false): StatementOrBlock[] {
        const idOrPatternEvaluationResult = this._evaluateIdOrPattern(arg);
        let found = [] as StatementOrBlock[];

        this._contentList.forEach((entry) => {
            if (this._compareIdOrPattern(entry, idOrPatternEvaluationResult)) {
                found.push(entry);
            }

            if (recursive && (entry instanceof Block)) {
                found.push(...entry._findContent(arg, recursive));
            }
            /* Remove doubles. */
            found = [...new Set(found)];
        });
        return found;
    }

    /**
     * Removes all entries based on the provided ID or Statement pattern from the content-list.
     * 
     * @param idOrPattern Content ID or Statement pattern.
     * @param recursive   The id will also be searched in all sub-blocks.
     *
     * @returns The current object.
     */
    protected _removeContent(idOrPattern: string, recursive?: boolean): this;
    /**
     * Removes all entries based on the provided ID or Statement pattern from the content-list.
     * 
     * @param pattern   Content ID or Statement pattern.
     * @param recursive The id will also be searched in all sub-blocks.
     *
     * @returns The current object.
     */
    protected _removeContent(pattern: RegExp, recursive?: boolean): this;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    protected _removeContent(arg: any, recursive=false): this {
        const idOrPatternEvaluationResult = this._evaluateIdOrPattern(arg);

        /* Iterate from back to front to be able to remove entries. */
        for (let i = this._contentList.length - 1; i >= 0; --i) {
            if (this._compareIdOrPattern(this._contentList[i], idOrPatternEvaluationResult)) {
                this._contentList.splice(i, 1);
            }
        }

        /* Process all sub-blocks. */
        if (recursive) {
            this._contentList.forEach((entry) => {
                if (entry instanceof Block) {
                    entry.removeContent(arg, recursive);
                }
            });
        }
        return this;
    }

    /**
     * Checks if the provided string/RegExp is a UUID or a pattern to look for.
     *
     * @param idOrPattern UUID or pattern to look for.
     * @returns IdOrPatternEvaluationResult
     */
    private _evaluateIdOrPattern(idOrPattern: string | RegExp): IdOrPatternEvaluationResult {
        let result: IdOrPatternEvaluationResult;

        /* Make sure an ID or pattern has been provided. */
        if (!idOrPattern) {
            throw new Error('No ID or pattern provided');
        }

        /* If string has been provided convert it to a RegExp. */
        if (typeof idOrPattern === 'string') {
            idOrPattern = new RegExp(idOrPattern);
        }

        /* Make sure a RegExp has been provided or the provided string has
           been converted to a RegExp for easier further processing. */
        if (idOrPattern instanceof RegExp) {
            result = new IdOrPatternEvaluationResult();

            result.isId = !!idOrPattern.source.match(this._UUID_PATTERN); /* Check if RegExp source matches UUID pattern. */
            result.regex = idOrPattern;
        } else {
            throw new Error('Invalid ID or pattern type');
        }
        return result;
    }

    /**
     * Checks if a Statement or Block matches an ID or a pattern (only Statements are compared
     * with a pattern.
     *
     * @param statementOrBlock            StatementOrBlock to compare a ID or pattern with.
     * @param idOrPatternEvaluationResult IdOrPatternEvaluationResult.
     *
     * @returns True if the ID or pattern matched.
     */
    private _compareIdOrPattern(statementOrBlock: StatementOrBlock, idOrPatternEvaluationResult: IdOrPatternEvaluationResult): boolean {
        if (!(idOrPatternEvaluationResult instanceof IdOrPatternEvaluationResult)) {
            throw new Error('Invalid ID or pattern evaluation result object');
        } else if (!(statementOrBlock instanceof Statement) && !(statementOrBlock instanceof Block)) {
            throw new Error('Invalid compare object');
        }
        const { isId, regex } = idOrPatternEvaluationResult;

        return (
            (isId && !!statementOrBlock.id.match(regex)) ||
            (!isId && (statementOrBlock instanceof Statement) && !!(statementOrBlock as Statement).value.match(regex))
        );
    }

    /**
     * Turns strings (either provided directly or as a list) into Statements. Statements
     * and Blocks remain untouched. If the input is not a list it is wrapped into one.
     *
     * @param content Content to be corrected.
     * @returns Statement, Block or an list of those two types, depending on the input.
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
