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
    constructor(condition: unknown) {
        const oneString = '1';
        const zeroString = '0';

        /* Convert numbers and booleans to string condition. */
        if (['number', 'bigint'].includes(typeof condition)) {
            condition = (condition !== 0) ? oneString : zeroString;
        } else if (typeof condition === 'boolean') {
            condition = condition ? oneString : zeroString;
        } else if (typeof condition !== 'string') {
            throw new Error('No or invalid condition provided');
        }
        this._condition = condition as string;
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
}
