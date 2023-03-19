import {
    convertToString,
    ConvertToStringError,
} from '../../helpers/string.mjs';

/**
 * Represents a condition.
 */
export class Condition {
    protected _condition: string;

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
        this._condition = Condition._convertToConditionString(condition);
    }

    /**
     * Returns the condition string.
     */
    public get value(): string {
        return this._condition;
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
        }

        return convertToString(condition, (e: ConvertToStringError) => {
            switch(e) {
                case ConvertToStringError.EmptyValue: throw new Error('No condition provided');
                case ConvertToStringError.InvalidType: throw new Error('Invalid condition type');
            }
        });
    }
}
