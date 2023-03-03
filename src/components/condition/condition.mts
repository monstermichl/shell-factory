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
    constructor(condition: string) {
        if (!condition) {
            throw new Error('No condition provided');
        }
        this._condition = condition;
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
     * @return true if equal, otherwise false.
     */
    public equal(condition: Condition): boolean {
        return condition?.value === this.value;
    }
}
