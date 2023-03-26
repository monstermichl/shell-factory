import { Statement } from '../../base/statement.mjs';
import {
    convertToString,
    ConvertToStringError,
} from '../../helpers/string.mjs';
import { IConditionable } from '../../interfaces/conditionable.mjs';

/**
 * Condition chain link type.
 */
enum ConditionChainLink {
    And,
    Or,
}

/**
 * Condition chain element.
 */
class ConditionChainElement {
    type: ConditionChainLink;
    target: Condition;

    constructor(type: ConditionChainLink, target: Condition) {
        this.type = type;
        this.target = target;
    }
}

/**
 * Represents a condition.
 */
export class Condition extends Statement implements IConditionable {
    protected _chain = [] as ConditionChainElement[];
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
        const conditionString = Condition._convertToConditionString(condition);

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
        return this._addToChain(ConditionChainLink.And, condition);
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
        return this._addToChain(ConditionChainLink.Or, condition);
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
            conditionString += ` ${element.type === ConditionChainLink.And ? '-a' : '-o'} ${element.target._getValue(false)}`;
        });
        return `${conditionString}${test ? ' ]' : ''}`;  /* If tested, surround with brackets. */
    }

    /**
     * Adds a new connected condition to the condition chain.
     *
     * @param condition Condition to add.
     * @returns The current instance.
     */
    private _addToChain(linkType: ConditionChainLink, condition: Condition): this;
    /**
     * Adds a new connected condition to the condition chain.
     *
     * @param condition Condition to add.
     * @returns The current instance.
     */
    private _addToChain(linkType: ConditionChainLink, condition: string): this;
    /**
     * Adds a new connected condition to the condition chain.
     *
     * @param condition Condition to add.
     * @returns The current instance.
     */
    private _addToChain(linkType: ConditionChainLink, condition: boolean): this;
    /**
     * Adds a new connected condition to the condition chain.
     *
     * @param condition Condition to add.
     * @returns The current instance.
     */
    private _addToChain(linkType: ConditionChainLink, condition: number): this;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    private _addToChain(linkType: ConditionChainLink, condition: any): this {
        this._chain.push(new ConditionChainElement(
            linkType,
            new Condition(
                Condition._convertToConditionString(condition),
            ),
        ));
        return this;
    }
}
