import { WrapBlock } from './wrap-block.mjs';
import { Statement } from '../base/statement.mjs';
import {
    Block,
    StatementOrBlockOrString,
} from '../base/block.mjs';
import { Condition } from '../components/condition/condition.mjs';
import {
    ChainElement,
    ChainType,
    IChainable,
} from '../interfaces/chainable.mjs';
import { Command } from '../base/command.mjs';
import { IConditionable } from '../interfaces/conditionable.mjs';

/**
 * Serves as the base for all blocks that require to handle conditions
 * (e.g., If, While, ...).
 */
export abstract class ConditionBlock extends WrapBlock implements IChainable<Command>, IConditionable {
    protected _condition: Condition;

    private _testOverwritten: boolean;
    private _conditionKeyword: string;
    private _blockStartKeyword: string;
    private _blockEndKeyword: string;

    /**
     * ConditionBlock constructor.
     *
     * @param conditionKeyword  ConditionBlock start keyword (e.g., 'if', 'while', 'for', ...).
     * @param blockStartKeyword ConditionBlock body start keyword (e.g. 'then', 'do', ...).
     * @param condition         Actual condition.
     * @param statement         ConditionBlock body content.
     * @param blockEndKeyword   ConditionBlock body end keyword (e.g. 'fi', 'done', ...).
     */
    protected constructor(conditionKeyword: string, condition: string, blockStartKeyword: string, statement?: Statement, blockEndKeyword?: string);
    /**
     * ConditionBlock constructor.
     *
     * @param conditionKeyword  ConditionBlock start keyword (e.g., 'if', 'while', 'for', ...).
     * @param blockStartKeyword ConditionBlock body start keyword (e.g. 'then', 'do', ...).
     * @param condition         Actual condition.
     * @param statement         ConditionBlock body content.
     * @param blockEndKeyword   ConditionBlock body end keyword (e.g. 'fi', 'done', ...).
     */
    protected constructor(conditionKeyword: string, condition: string, blockStartKeyword: string, statement?: string, blockEndKeyword?: string);
    /**
     * ConditionBlock constructor.
     *
     * @param conditionKeyword  ConditionBlock start keyword (e.g., 'if', 'while', 'for', ...).
     * @param blockStartKeyword ConditionBlock body start keyword (e.g. 'then', 'do', ...).
     * @param condition         Actual condition.
     * @param block             ConditionBlock body content.
     * @param blockEndKeyword   ConditionBlock body end keyword (e.g. 'fi', 'done', ...).
     */
    protected constructor(conditionKeyword: string, condition: string, blockStartKeyword: string, block?: Block, blockEndKeyword?: string);
    /**
     * ConditionBlock constructor.
     *
     * @param conditionKeyword  ConditionBlock start keyword (e.g., 'if', 'while', 'for', ...).
     * @param blockStartKeyword ConditionBlock body start keyword (e.g. 'then', 'do', ...).
     * @param condition         Actual condition.
     * @param statements        ConditionBlock body content.
     * @param blockEndKeyword   ConditionBlock body end keyword (e.g. 'fi', 'done', ...).
     */
    protected constructor(conditionKeyword: string, condition: string, blockStartKeyword: string, statements?: Statement[], blockEndKeyword?: string);
    /**
     * ConditionBlock constructor.
     *
     * @param conditionKeyword  ConditionBlock start keyword (e.g., 'if', 'while', 'for', ...).
     * @param blockStartKeyword ConditionBlock body start keyword (e.g. 'then', 'do', ...).
     * @param condition         Actual condition.
     * @param statements        ConditionBlock body content.
     * @param blockEndKeyword   ConditionBlock body end keyword (e.g. 'fi', 'done', ...).
     */
    protected constructor(conditionKeyword: string, condition: string, blockStartKeyword: string, statements?: string[], blockEndKeyword?: string);
    /**
     * ConditionBlock constructor.
     *
     * @param conditionKeyword  ConditionBlock start keyword (e.g., 'if', 'while', 'for', ...).
     * @param blockStartKeyword ConditionBlock body start keyword (e.g. 'then', 'do', ...).
     * @param condition         Actual condition.
     * @param blocks            ConditionBlock body content.
     * @param blockEndKeyword   ConditionBlock body end keyword (e.g. 'fi', 'done', ...).
     */
    protected constructor(conditionKeyword: string, condition: string, blockStartKeyword: string, blocks?: Block[], blockEndKeyword?: string);
    /**
     * ConditionBlock constructor.
     *
     * @param conditionKeyword  ConditionBlock start keyword (e.g., 'if', 'while', 'for', ...).
     * @param blockStartKeyword ConditionBlock body start keyword (e.g. 'then', 'do', ...).
     * @param condition         Actual condition.
     * @param content           ConditionBlock body content.
     * @param blockEndKeyword   ConditionBlock body end keyword (e.g. 'fi', 'done', ...).
     */
    protected constructor(conditionKeyword: string, condition: string, blockStartKeyword: string, content?: StatementOrBlockOrString[], blockEndKeyword?: string);
    /**
     * ConditionBlock constructor.
     *
     * @param conditionKeyword  ConditionBlock start keyword (e.g., 'if', 'while', 'for', ...).
     * @param blockStartKeyword ConditionBlock body start keyword (e.g. 'then', 'do', ...).
     * @param condition         Actual condition.
     * @param statement         ConditionBlock body content.
     * @param blockEndKeyword   ConditionBlock body end keyword (e.g. 'fi', 'done', ...).
     */
    protected constructor(conditionKeyword: string, condition: Condition, blockStartKeyword: string, statement?: Statement, blockEndKeyword?: string);
    /**
     * ConditionBlock constructor.
     *
     * @param conditionKeyword  ConditionBlock start keyword (e.g., 'if', 'while', 'for', ...).
     * @param blockStartKeyword ConditionBlock body start keyword (e.g. 'then', 'do', ...).
     * @param condition         Actual condition.
     * @param statement         ConditionBlock body content.
     * @param blockEndKeyword   ConditionBlock body end keyword (e.g. 'fi', 'done', ...).
     */
    protected constructor(conditionKeyword: string, condition: Condition, blockStartKeyword: string, statement?: string, blockEndKeyword?: string);
    /**
     * ConditionBlock constructor.
     *
     * @param conditionKeyword  ConditionBlock start keyword (e.g., 'if', 'while', 'for', ...).
     * @param blockStartKeyword ConditionBlock body start keyword (e.g. 'then', 'do', ...).
     * @param condition         Actual condition.
     * @param block             ConditionBlock body content.
     * @param blockEndKeyword   ConditionBlock body end keyword (e.g. 'fi', 'done', ...).
     */
    protected constructor(conditionKeyword: string, condition: Condition, blockStartKeyword: string, block?: Block, blockEndKeyword?: string);
    /**
     * ConditionBlock constructor.
     *
     * @param conditionKeyword  ConditionBlock start keyword (e.g., 'if', 'while', 'for', ...).
     * @param blockStartKeyword ConditionBlock body start keyword (e.g. 'then', 'do', ...).
     * @param condition         Actual condition.
     * @param statements        ConditionBlock body content.
     * @param blockEndKeyword   ConditionBlock body end keyword (e.g. 'fi', 'done', ...).
     */
    protected constructor(conditionKeyword: string, condition: Condition, blockStartKeyword: string, statements?: Statement[], blockEndKeyword?: string);
    /**
     * ConditionBlock constructor.
     *
     * @param conditionKeyword  ConditionBlock start keyword (e.g., 'if', 'while', 'for', ...).
     * @param blockStartKeyword ConditionBlock body start keyword (e.g. 'then', 'do', ...).
     * @param condition         Actual condition.
     * @param statements        ConditionBlock body content.
     * @param blockEndKeyword   ConditionBlock body end keyword (e.g. 'fi', 'done', ...).
     */
    protected constructor(conditionKeyword: string, condition: Condition, blockStartKeyword: string, statements?: string[], blockEndKeyword?: string);
    /**
     * ConditionBlock constructor.
     *
     * @param conditionKeyword  ConditionBlock start keyword (e.g., 'if', 'while', 'for', ...).
     * @param blockStartKeyword ConditionBlock body start keyword (e.g. 'then', 'do', ...).
     * @param condition         Actual condition.
     * @param blocks            ConditionBlock body content.
     * @param blockEndKeyword   ConditionBlock body end keyword (e.g. 'fi', 'done', ...).
     */
    protected constructor(conditionKeyword: string, condition: Condition, blockStartKeyword: string, blocks?: Block[], blockEndKeyword?: string);
    /**
     * ConditionBlock constructor.
     *
     * @param conditionKeyword  ConditionBlock start keyword (e.g., 'if', 'while', 'for', ...).
     * @param blockStartKeyword ConditionBlock body start keyword (e.g. 'then', 'do', ...).
     * @param condition         Actual condition.
     * @param content           ConditionBlock body content.
     * @param blockEndKeyword   ConditionBlock body end keyword (e.g. 'fi', 'done', ...).
     */
    protected constructor(conditionKeyword: string, condition: Condition, blockStartKeyword: string, content?: StatementOrBlockOrString[], blockEndKeyword?: string);
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    protected constructor(conditionKeyword: string, arg: any, blockStartKeyword: string, content?: any, blockEndKeyword?: string) {
        const condition = Condition.fromString(arg);
        const openingStatement = ConditionBlock._buildOpeningStatementString(conditionKeyword, condition, blockStartKeyword);

        super(openingStatement, content, blockEndKeyword);

        this._conditionKeyword = conditionKeyword;
        this._condition = condition;
        this._blockStartKeyword = blockStartKeyword;
        this._blockEndKeyword = blockEndKeyword;
    }

    /**
     * Returns the condition block's condition.
     */
    public get condition(): Condition {
        return this._condition;
    }

    /**
     * Returns a the applied chain.
     */
    public get chain(): ChainElement<Command>[] {
        return this.closingStatement?.chain;
    }

    /**
     * Returns if the condition gets tested.
     *
     * @returns True if the gets tested.
     */
    public getTest(): boolean {
        return this._condition.getTest();
    }

    /**
     * Sets if the condition shall be tested.
     *
     * @param test Sets if the condition shall be tested.
     */
    public setTest(test: boolean) {
        this._testOverwritten = true;
        return this._test(test);
    }

    /**
     * Adds a new and-connected condition to the condition.
     *
     * @param condition Condition to add.
     * @returns The current instance.
     */
    public and(condition: Condition): this;
    /**
     * Adds a new and-connected condition to the condition.
     *
     * @param condition Condition to add.
     * @returns The current instance.
     */
    public and(condition: string): this;
    /**
     * Adds a new and-connected condition to the condition.
     *
     * @param condition Condition to add.
     * @returns The current instance.
     */
    public and(condition: boolean): this;
    /**
     * Adds a new and-connected condition to the condition.
     *
     * @param condition Condition to add.
     * @returns The current instance.
     */
    public and(condition: number): this;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public and(condition: any): this {
        this._condition.and(condition);
        return this._updateOpeningStatement();
    }

    /**
     * Adds a new or-connected condition to the condition.
     *
     * @param condition Condition to add.
     * @returns The current instance.
     */
    public or(condition: Condition): this;
    /**
     * Adds a new or-connected condition to the condition.
     *
     * @param condition Condition to add.
     * @returns The current instance.
     */
    public or(condition: string): this;
    /**
     * Adds a new or-connected condition to the condition.
     *
     * @param condition Condition to add.
     * @returns The current instance.
     */
    public or(condition: boolean): this;
    /**
     * Adds a new or-connected condition to the condition.
     *
     * @param condition Condition to add.
     * @returns The current instance.
     */
    public or(condition: number): this;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public or(condition: any): this {
        this._condition.or(condition);
        return this._updateOpeningStatement();
    }

    /**
     * Read from source.
     * 
     * @param source File to read from.
     * @returns The current instance.
     */
    public read(source: string): this;
    /**
     * Read from source.
     * 
     * @param source File to read from.
     * @returns The current instance.
     */
    public read(source: number): this;
    /**
     * Read from source.
     * 
     * @param source File to read from.
     * @returns The current instance.
     */
    public read(source: boolean): this;
    /**
     * Read from source.
     * 
     * @param source File to read from.
     * @returns The current instance.
     */
    public read(source: Statement): this;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public read(source: any): this {
        return this._addToChain(source, ChainType.Read);
    }

    /**
     * Write to target.
     * 
     * @param target Target to write to.
     * @returns The current instance.
     */
    public write(target: string): this;
    /**
     * Write to target.
     * 
     * @param target Target to write to.
     * @returns The current instance.
     */
    public write(target: number): this;
    /**
     * Write to target.
     * 
     * @param target Target to write to.
     * @returns The current instance.
     */
    public write(target: boolean): this;
    /**
     * Write to target.
     * 
     * @param target Target to write to.
     * @returns The current instance.
     */
    public write(target: Statement): this;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public write(target: any): this {
        return this._addToChain(target, ChainType.Write);
    }

    /**
     * Append to target.
     * 
     * @param target Target to append to.
     * @returns The current instance.
     */
    public append(target: string): this;
    /**
     * Append to target.
     * 
     * @param target Target to append to.
     * @returns The current instance.
     */
    public append(target: number): this;
    /**
     * Append to target.
     * 
     * @param target Target to append to.
     * @returns The current instance.
     */
    public append(target: boolean): this;
    /**
     * Append to target.
     * 
     * @param target Target to append to.
     * @returns The current instance.
     */
    public append(target: Statement): this;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public append(target: any): this {
        return this._addToChain(target, ChainType.Append);
    }

    /**
     * Pipes the output into another command.
     * 
     * @param target Command to pipe to.
     * @returns The current instance.
     */
    public pipe(target: string): this;
    /**
     * Pipes the output into another command.
     * 
     * @param target Command to pipe to.
     * @returns The current instance.
     */
    public pipe(target: number): this;
    /**
     * Pipes the output into another command.
     * 
     * @param target Command to pipe to.
     * @returns The current instance.
     */
    public pipe(target: boolean): this;
    /**
     * Pipes the output into another command.
     * 
     * @param target Command to pipe to.
     * @returns The current instance.
     */
    public pipe(target: Statement): this;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public pipe(target: any): this {
        return this._addToChain(target, ChainType.Pipe);
    }

    /**
     * Finds all elements based on the provided ID or pattern in the chain.
     * 
     * @param idOrPattern Content ID or Statement pattern.
     * @param type        If provided, the type must also match.
     *
     * @returns List of found chain elements.
     */
    public findInChain(idOrPattern: string, type?: ChainType): ChainElement<Command>[];
    /**
     * Finds all elements based on the provided ID or pattern in the chain.
     * 
     * @param pattern Content ID or Statement pattern.
     * @param type    If provided, the type must also match.
     *
     * @returns List of found chain elements.
     */
    public findInChain(pattern: RegExp, type?: ChainType): ChainElement<Command>[];
    /**
     * Finds all elements based on the provided type.
     * 
     * @param type Type to look for.
     * @returns List of found chain elements.
     */
    public findInChain(type: ChainType): ChainElement<Command>[];
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public findInChain(arg1: any, arg2?: ChainType): ChainElement<Command>[] {
        return this.closingStatement?.findInChain(arg1, arg2);
    }


    /**
     * Removes all elements based on the provided ID or pattern from the chain.
     * 
     * @param idOrPattern Content ID or Statement pattern.
     * @param type        If provided, the type must also match.
     *
     * @returns The current instance.
     */
    public removeFromChain(idOrPattern: string, type?: ChainType): this;
    /**
     * Removes all elements based on the provided ID or pattern from the chain.
     * 
     * @param pattern Content ID or Statement pattern.
     * @param type    If provided, the type must also match.
     *
     * @returns The current instance.
     */
    public removeFromChain(pattern: RegExp, type?: ChainType): this;
    /**
     * Removes all elements based on the provided type.
     * 
     * @param type Type to remove.
     * @returns The current instance.
     */
    public removeFromChain(type: ChainType): this;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public removeFromChain(arg1: any, arg2?: ChainType): this {
        this.closingStatement?.removeFromChain(arg1, arg2);
        return this;
    }

    /**
     * Clears the whole chain.
     *
     * @returns The current instance.
     */
    public clearChain(): this {
        this.closingStatement?.clearChain();
        return this;
    }

    /**
     * Creates the opening statement.
     *
     * @param conditionKeyword  Condition keyword (e.g. if).
     * @param condition         Condition object to incorporate.
     * @param blockStartKeyword Block end-keyword (e.g. fi)
     *
     * @returns The built opening statement string.
     */
    private static _buildOpeningStatementString(conditionKeyword: string, condition: Condition, blockStartKeyword: string): string {
        if (!conditionKeyword) {
            throw new Error('Missing condition keyword');
        } else if (typeof conditionKeyword !== 'string') {
            throw new Error('Invalid condition keyword type provided');
        } else if (!blockStartKeyword) {
            throw new Error('Missing block-start keyword');
        } else if (typeof blockStartKeyword !== 'string') {
            throw new Error('Invalid block-start keyword type provided');
        } else if (!(condition instanceof Condition)) {
            throw new Error('Invalid condition type provided');
        }
        return `${conditionKeyword} ${condition.value}; ${blockStartKeyword}`;
    }

    /**
     * Sets if the condition shall be tested.
     *
     * @param test If true the condition is being tested (brackets).
     * @returns The current instance.
     */
    private _test(test: boolean): this {
        this._condition.setTest(test);
        return this._updateOpeningStatement();
    }

    /**
     * Updates the opening statement based on the test flag.
     *
     * @param test If true the condition is being tested (brackets).
     * @returns The current instance.
     */
    private _updateOpeningStatement(): this {
        this._openingStatement.statement = ConditionBlock._buildOpeningStatementString(
            this._conditionKeyword,
            this._condition,
            this._blockStartKeyword,
        );
        return this;
    }

    /**
     * Internal function to add a new chain statement.
     *
     * @param target Statement to add.
     * @param type   ChainType.
     *
     * @returns The current instance.
     */
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    private _addToChain(target: any, type: ChainType): this {
        if (this.closingStatement) {
            switch(type) {
                case ChainType.Read: this.closingStatement.read(target); break;
                case ChainType.Write: this.closingStatement.write(target); break;
                case ChainType.Append: this.closingStatement.append(target); break;
                case ChainType.Pipe: this.closingStatement.pipe(target); break;
            }

            /* If test has not been overwritten, dis-/enable it. */
            if (!this._testOverwritten) {
                const chain = this.closingStatement.chain;

                /* Disable testing if first chain element is of read-type. */
                if (chain.length && (chain[0].type === ChainType.Read)) {
                    /* Disable testing. */
                    this._test(false);
                } else {
                    /* Enable testing. */
                    this._test(true);
                }
            }
        }
        return this;
    }
}
