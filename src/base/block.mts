import { evaluateIdOrPattern } from '../helpers/pattern.mjs';
import { Base } from './base.mjs';
import { Command } from './command.mjs';
import { Statement } from './statement.mjs';

export type StatementOrBlock = Statement | Block;
export type StatementOrBlockOrString = StatementOrBlock | string;

type onAddCallback<T> = (block: T, content: StatementOrBlock[]) => void;
type onInsertCallback<T> = (block: T, position: number, content: StatementOrBlock[]) => void;
type onMoveCallback<T> = (block: T, target: Block, content: StatementOrBlock[]) => void;
type onRemoveCallback<T> = (block: T, content: StatementOrBlock[]) => void;

const EVENT_ADD = 'add';
const EVENT_INSERT = 'insert';
const EVENT_MOVE = 'move';
const EVENT_REMOVE = 'remove';
type EventType = typeof EVENT_ADD | typeof EVENT_INSERT | typeof EVENT_MOVE | typeof EVENT_REMOVE;

/**
 * Represents a container to group a list of Statement- and other
 * Block-objects. New content can be added dynamically.
 */
export abstract class Block extends Base {
    protected _contentList: StatementOrBlock[] = [];

    private _onCallbacks = {
        add: [] as onAddCallback<this>[],
        insert: [] as onInsertCallback<this>[],
        move: [] as onMoveCallback<this>[],
        remove: [] as onRemoveCallback<this>[],
    };

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
     * Moves content to a different block.
     *
     * @param searchId      Content ID or Statement pattern.
     * @param toId          ID of the block where to move the content to.
     * @param recursive     The id will also be searched in all sub-blocks.
     * @param maxEncounters Sets a content upper limit if more than one content
     *                      entry has been found. If it's less than 0, all
     *                      encounters will be moved.
     */
    public moveContent(searchIdOrPattern: string, toId: string, recursive=true, maxEncounters=-1): boolean {
        return this._moveContent(searchIdOrPattern, toId, recursive, maxEncounters);
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
     * Adds a callback that's triggered if content has been added to the block.
     *
     * @param event    Event name.
     * @param callback Callback function.
     */
    public on(event: typeof EVENT_ADD, callback: onAddCallback<this>): this;
    /**
     * Adds a callback that's triggered if content has been inserted into the block.
     *
     * @param event    Event name.
     * @param callback Callback function.
     */
    public on(event: typeof EVENT_INSERT, callback: onInsertCallback<this>): this;
    /**
     * Adds a callback that's triggered if content has been moved within the block.
     *
     * @param event    Event name.
     * @param callback Callback function.
     */
    public on(event: typeof EVENT_MOVE, callback: onMoveCallback<this>): this;
    /**
     * Adds a callback that's triggered if content has been removed from the block.
     *
     * @param event    Event name.
     * @param callback Callback function.
     */
    public on(event: typeof EVENT_REMOVE, callback: onRemoveCallback<this>): this;
    public on(event: EventType, callback: unknown): this {
        function addCallback<T>(list: T[]) {
            const found = !!list.find((entry) => entry === (callback as T));

            if (!found) {
                list.push(callback as T);
            }
        }

        if (event && callback) {
            switch (event) {
                case EVENT_ADD: addCallback(this._onCallbacks.add); break;
                case EVENT_INSERT: addCallback(this._onCallbacks.insert); break;
                case EVENT_MOVE: addCallback(this._onCallbacks.move); break;
                case EVENT_REMOVE: addCallback(this._onCallbacks.remove); break;
            }
        }
        return this;
    }

    /**
     * Removes a callback that's triggered if content has been added to the block.
     *
     * @param event    Event name.
     * @param callback Callback function.
     */
    public off(event: typeof EVENT_ADD, callback: onAddCallback<this>): this;
    /**
     * Removes a callback that's triggered if content has been inserted into the block.
     *
     * @param event    Event name.
     * @param callback Callback function.
     */
    public off(event: typeof EVENT_INSERT, callback: onInsertCallback<this>): this;
    /**
     * Removes a callback that's triggered if content has been moved within the block.
     *
     * @param event    Event name.
     * @param callback Callback function.
     */
    public off(event: typeof EVENT_MOVE, callback: onMoveCallback<this>): this;
    /**
     * Removes a callback that's triggered if content has been removed from the block.
     *
     * @param event    Event name.
     * @param callback Callback function.
     */
    public off(event: typeof EVENT_REMOVE, callback: onRemoveCallback<this>): this;
    public off(event: EventType, callback: unknown): this {
        function removeCallback<T>(list: T[]) {
            const foundIndex = list.findIndex((entry) => entry === (callback as T));

            if (foundIndex >= 0) {
                list.splice(foundIndex, 1);
            }
        }

        if (event && callback) {
            switch (event) {
                case EVENT_ADD: removeCallback(this._onCallbacks.add); break;
                case EVENT_INSERT: removeCallback(this._onCallbacks.insert); break;
                case EVENT_MOVE: removeCallback(this._onCallbacks.move); break;
                case EVENT_REMOVE: removeCallback(this._onCallbacks.remove); break;
            }
        }
        return this;
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
        let contentTyped: StatementOrBlock[] | null;

        /* No position check required, splice does that for us. */
        if (content) {
            contentTyped = this._correctContent(content);

            if (contentTyped) {
                this._contentList.splice(position, 0, ...contentTyped as StatementOrBlock[]);

                /* Inform subscribers. */
                this._onCallbacks.insert.forEach((callback) => callback(this, position, contentTyped));
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

            /* Inform subscribers. */
            this._onCallbacks.add.forEach((callback) => callback(this, contentTyped));
        }
        return contentTyped ? this : null;
    }

    /**
     * Moves content to a different block.
     *
     * @param searchId      Content ID or Statement pattern.
     * @param toId          ID of the block where to move the content to.
     * @param recursive     The id will also be searched in all sub-blocks.
     * @param maxEncounters Sets a content upper limit if more than one content
     *                      entry has been found. If it's less than 0, all
     *                      encounters will be moved.
     */
    public _moveContent(searchIdOrPattern: string, toId: string, recursive: boolean, maxEncounters: number): boolean {
        let ok = false;
        let foundContent = this.findContent(searchIdOrPattern, recursive); /* Find content to move. */

        if (foundContent.length) {
            const targetBlocks = this.findContent(toId);

            if (targetBlocks.length) {
                const targetBlock = targetBlocks[0];

                /* Make sure target is a block. */
                if (targetBlock instanceof Block) {
                    /* Limit encounters if necessary. */
                    if (maxEncounters >= 0) {
                        foundContent = foundContent.slice(0, maxEncounters);
                    }
                    ok = true;

                    /* Remove encountered content. */
                    foundContent.forEach((content) => this.removeContent(content.id, recursive));

                    /* Add content at new position. */
                    targetBlock.addContent(foundContent);

                    /* Inform subscribers. */
                    this._onCallbacks.move.forEach((callback) => callback(this, targetBlock, foundContent));
                }
            }
        }
        return ok;
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
        let found = [] as StatementOrBlock[];

        this._contentList.forEach((entry) => {
            if (this._compareIdOrPattern(entry, arg)) {
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
     * @param collected   Internal list to keep track of the deleted content.
     * @param level       Internal index to keep track of the recursion level.
     *
     * @returns The current object.
     */
    protected _removeContent(idOrPattern: string, recursive?: boolean, collected?: StatementOrBlock[], level?: number): this;
    /**
     * Removes all entries based on the provided ID or Statement pattern from the content-list.
     *
     * @param pattern   Content ID or Statement pattern.
     * @param recursive The id will also be searched in all sub-blocks.
     * @param collected Internal list to keep track of the deleted content.
     * @param level     Internal index to keep track of the recursion level.
     *
     * @returns The current object.
     */
    protected _removeContent(pattern: RegExp, recursive?: boolean, collected?: StatementOrBlock[], level?: number): this;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    protected _removeContent(arg: any, recursive=false, collected=[] as StatementOrBlock[], level=0): this {
        /* Iterate from back to front to be able to remove entries. */
        for (let i = this._contentList.length - 1; i >= 0; --i) {
            if (this._compareIdOrPattern(this._contentList[i], arg)) {
                collected.push(...this._contentList.splice(i, 1));
            }
        }

        /* Process all sub-blocks. */
        if (recursive) {
            this._contentList.forEach((entry) => {
                if (entry instanceof Block) {
                    entry._removeContent(arg, recursive, collected, level + 1);
                }
            });
        }

        if (level === 0) {
            /* Inform subscribers. */
            this._onCallbacks.remove.forEach((callback) => callback(this, collected));
        }
        return this;
    }

    /**
     * Checks if a Statement or Block matches an ID or a pattern (only Statements are compared
     * with a pattern).
     *
     * @param statementOrBlock StatementOrBlock to compare a ID or pattern with.
     * @param idOrPattern      ID or pattern to match against (pattern works only for Statements).
     *
     * @returns True if the ID or pattern matched.
     */
    private _compareIdOrPattern(statementOrBlock: StatementOrBlock, idOrPattern: string): boolean;
    /**
     * Checks if a Statement or Block matches an ID or a pattern (only Statements are compared
     * with a pattern).
     *
     * @param statementOrBlock StatementOrBlock to compare a ID or pattern with.
     * @param idOrPattern      ID or pattern to match against (pattern works only for Statements).
     *
     * @returns True if the ID or pattern matched.
     */
    private _compareIdOrPattern(statementOrBlock: StatementOrBlock, idOrPattern: RegExp): boolean;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    private _compareIdOrPattern(statementOrBlock: StatementOrBlock, idOrPattern: any): boolean {
        const idOrPatternEvaluationResult = evaluateIdOrPattern(idOrPattern);
        let matched = false;

        if (statementOrBlock instanceof Block) {
            matched = !!statementOrBlock.id.match(idOrPatternEvaluationResult.regex);
        } else {
            matched = Statement.compareIdOrPattern(statementOrBlock, idOrPattern);
        }
        return matched;
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
                /* Map each string to a new Command object. */
                if (typeof contentPart === 'string') {
                    contentTyped[index] = new Command(contentPart);
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
