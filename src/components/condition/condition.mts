import { Statement } from '../../base/statement.mjs';
import { isAnyConnectType } from '../../helpers/connect.mjs';
import {
    convertToString,
    ConvertToStringError,
} from '../../helpers/string.mjs';
import { ISubshellable } from '../../interfaces/subshellable.mjs';
import { IEvaluable } from '../../interfaces/evaluable.mjs';
import {
    ChainElement,
    IChainable,
} from '../../interfaces/chainable.mjs';
import { IConditionable } from '../../interfaces/conditionable.mjs';
import {
    LogicalConnectType,
    ILogicallyConnectable,
} from '../../interfaces/logically-connectable.mjs';
import { EvalSubshellStatement } from '../subshell/eval-subshell-statement.mjs';
import { SubshellStatement } from '../subshell/subshell-statement.mjs';

/**
 * Represents a condition.
 */
export class Condition extends Statement implements IConditionable,
                                                    ILogicallyConnectable,
                                                    IChainable<LogicalConnectType, Condition>,
                                                    ISubshellable,
                                                    IEvaluable {
    protected _chain = [] as ChainElement<LogicalConnectType, Condition>[];
    private _test = true;

    /**
     * Condition constructor.
     *
     * @param condition Condition Statement.
     */
    constructor(condition: Statement);
    /**
     * Condition constructor.
     *
     * @param condition Condition string.
     */
    constructor(condition: string);
    /**
     * Condition constructor.
     *
     * @param condition Boolean as condition (everything except
     *                  false will be converted to 1).
     */
    constructor(condition: boolean);
    /**
     * Condition constructor.
     *
     * @param condition Number as condition (everything except
     *                  0 will be converted to 1).
     */
    constructor(condition: number);
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    constructor(condition: any) {
        const conditionString = (condition instanceof Condition) ? condition.statement : Condition._convertToConditionString(condition);

        super(conditionString);
    }

    /**
     * Returns the full condition string.
     *
     * @returns The full condition string.
     */
    public get value(): string {
        return this._getValue(this.getTest());
    }

    /**
     * Returns the original condition string.
     * 
     * @returns The original condition string.
     */
    public get condition(): string {
        return this.statement;
    }

    /**
     * Returns the applied chain.
     */
    public get chain(): ChainElement<LogicalConnectType, Condition>[] {
        return this._chain;
    }

    /**
     * Returns if the condition gets tested.
     *
     * @returns True if the gets tested.
     */
    public getTest(): boolean {
        return this._test;
    }

    /**
     * Sets if the condition shall be tested.
     *
     * @param test Sets if the condition shall be tested.
     */
    public setTest(test: boolean): this {
        this._test = !!test;
        return this;
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
        return this._addToChain(LogicalConnectType.And, condition);
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
        return this._addToChain(LogicalConnectType.Or, condition);
    }

    /**
     * Finds all elements based on the provided ID or pattern in the chain.
     * 
     * @param idOrPattern Content ID or Statement pattern.
     * @param type        If provided, the type must also match.
     *
     * @returns List of found chain elements.
     */
    public findInChain(idOrPattern: string, type?: LogicalConnectType): ChainElement<LogicalConnectType, Condition>[];
    /**
     * Finds all elements based on the provided ID or pattern in the chain.
     * 
     * @param pattern Content ID or Statement pattern.
     * @param type    If provided, the type must also match.
     *
     * @returns List of found chain elements.
     */
    public findInChain(pattern: RegExp, type?: LogicalConnectType): ChainElement<LogicalConnectType, Condition>[];
    /**
     * Finds all elements based on the provided type.
     * 
     * @param type Type to look for.
     * @returns List of found chain elements.
     */
    public findInChain(type: LogicalConnectType): ChainElement<LogicalConnectType, Condition>[];
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public findInChain(arg1: any, arg2?: LogicalConnectType): ChainElement<LogicalConnectType, Condition>[] {
        /* Check if arg1 is a OperationalConnectType or LogicalConnectType value. */
        if (isAnyConnectType(arg1)) {
            arg2 = arg1; /* Set arg2 to type value. */
            arg1 = /.*/; /* Set arg1 to match everything. */
        }

        return this.chain.filter((element) =>
            element.target.compareIdOrPattern(arg1) && (!arg2 || (element.type === arg2)),
        );
    }

    /**
     * Removes all elements based on the provided ID or pattern from the chain.
     * 
     * @param idOrPattern Content ID or Statement pattern.
     * @param type        If provided, the type must also match.
     *
     * @returns The current instance.
     */
    public removeFromChain(idOrPattern: string, type?: LogicalConnectType): this;
    /**
     * Removes all elements based on the provided ID or pattern from the chain.
     * 
     * @param pattern Content ID or Statement pattern.
     * @param type    If provided, the type must also match.
     *
     * @returns The current instance.
     */
    public removeFromChain(pattern: RegExp, type?: LogicalConnectType): this;
    /**
     * Removes all elements based on the provided type.
     * 
     * @param type Type to remove.
     * @returns The current instance.
     */
    public removeFromChain(type: LogicalConnectType): this;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public removeFromChain(arg1: any, arg2?: LogicalConnectType): this {
        /* Check if arg1 is a OperationalConnectType or LogicalConnectType value. */
        if (isAnyConnectType(arg1)) {
            arg2 = arg1; /* Set arg2 to type value. */
            arg1 = /.*/; /* Set arg1 to match everything. */
        }

        for (let i = this.chain.length - 1; i >= 0; --i) {
            const element = this.chain[i];

            if (element.target.compareIdOrPattern(arg1) && (!arg2 || (element.type === arg2))) {
                this.chain.splice(i, 1);
            }
        }
        return this;
    }

    /**
     * Clears the whole chain.
     *
     * @returns The current instance.
     */
    public clearChain(): this {
        this._chain = [];
        return this;
    }

    /**
     * Compares if the provided condition is equal.
     *
     * @param condition Condition to compare.
     * @returns true if equal, otherwise false.
     */
    public equal(condition: Condition): boolean {
        return condition?.value === this.value;
    }

    /**
     * Returns the statement in a subshell statement.
     *
     * @returns A new SubshellStatement instance.
     */
    public subshell(): SubshellStatement {
        return new SubshellStatement(this);
    }

    /**
     * Returns the statement in an evaluation-subshell statement.
     *
     * @returns A new EvalSubshellStatement instance.
     */
    eval(): EvalSubshellStatement {
        return this.subshell().eval();
    }

    /**
     * Creates a Condition object out of a string.
     *
     * @param condition Condition string.
     * @returns Condition object.
     */
    public static fromString(condition: string): Condition;
    /**
     * Creates a Condition object out of a Statement.
     *
     * @param condition Condition Statement.
     * @returns Condition object.
     */
    public static fromString(condition: Statement): Condition;
    /**
     * Creates a Condition object out of a Condition object. (Does.
     * nothing. This signature exists just to make the function callable
     * with a Condition object without throwing a compiler error).
     *
     * @param condition Condition object.
     * @returns Condition object.
     */
    public static fromString(condition: Condition): Condition;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public static fromString(condition: any): Condition {
        return (condition instanceof Condition) ? condition : new Condition(Condition._convertToConditionString(condition));
    }

    /**
     * Converts a Statement to a condition string.
     *
     * @param condition Condition string.
     */
    private static _convertToConditionString(condition: Statement): string;
    /**
     * Converts a string to a condition string.
     *
     * @param condition Condition string.
     */
    private static _convertToConditionString(condition: string): string;
    /**
     * Converts a boolean to a condition string.
     *
     * @param condition Boolean as condition (everything except
     *                  false will be converted to 1).
     */
    private static _convertToConditionString(condition: boolean): string;
    /**
     * Converts a number to a condition string.
     *
     * @param condition Number as condition (everything except
     *                  0 will be converted to 1).
     */
    private static _convertToConditionString(condition: number): string;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    private static _convertToConditionString(condition: any): string {
        const oneString = '1';
        const zeroString = '0';

        /* Convert numbers and booleans to string condition. */
        if (['number', 'bigint'].includes(typeof condition)) {
            condition = (condition !== 0) ? oneString : zeroString;
        } else if (typeof condition === 'boolean') {
            condition = condition ? oneString : zeroString;
        } else if (condition instanceof Statement) {
            condition = condition.value;
        }

        return convertToString(condition, (e: ConvertToStringError) => {
            switch(e) {
                case ConvertToStringError.EmptyValue: throw new Error('No condition provided');
                case ConvertToStringError.InvalidType: throw new Error('Invalid condition type');
            }
        });
    }

    /**
     * Returns the full condition string.
     *
     * @param test Specifies if condition shall be tested.
     * @returns The full condition string.
     */
    protected _getValue(test: boolean): string {
        let conditionString = `${test ? '[ ' : ''}${this.condition}`; /* If tested, surround with brackets. */

        /* Add linked conditions. */
        this._chain.forEach((element) => {
            conditionString += ` ${element.type === LogicalConnectType.And ? '-a' : '-o'} ${element.target._getValue(false)}`;
        });
        return `${conditionString}${test ? ' ]' : ''}`;  /* If tested, surround with brackets. */
    }

    /**
     * Adds a new connected condition to the condition chain.
     *
     * @param condition Condition to add.
     * @returns The current instance.
     */
    private _addToChain(linkType: LogicalConnectType, condition: Condition): this;
    /**
     * Adds a new connected condition to the condition chain.
     *
     * @param condition Condition to add.
     * @returns The current instance.
     */
    private _addToChain(linkType: LogicalConnectType, condition: string): this;
    /**
     * Adds a new connected condition to the condition chain.
     *
     * @param condition Condition to add.
     * @returns The current instance.
     */
    private _addToChain(linkType: LogicalConnectType, condition: boolean): this;
    /**
     * Adds a new connected condition to the condition chain.
     *
     * @param condition Condition to add.
     * @returns The current instance.
     */
    private _addToChain(linkType: LogicalConnectType, condition: number): this;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    private _addToChain(linkType: LogicalConnectType, condition: any): this {
        this._chain.push(new ChainElement(
            linkType,
            Condition.fromString(condition),
        ));
        return this;
    }
}
