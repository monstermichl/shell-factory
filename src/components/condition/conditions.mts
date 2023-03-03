import { LinkedCondition } from './linked-condition.mjs';
import { Condition } from './condition.mjs';

/**
 * Serves as a container which holds one or more conditions.
 */
export class Conditions {
    protected _condition: Condition;
    protected _linkedConditions: LinkedCondition[];

    /**
     * Conditions constructor.
     *
     * @param condition        Primary condition.
     * @param linkedConditions Logically linked conditions.
     */
    constructor(condition: string, ...linkedConditions: LinkedCondition[]);
    /**
     * Conditions constructor.
     *
     * @param condition        Primary condition.
     * @param linkedConditions Logically linked conditions.
     */
    constructor(condition: Condition, ...linkedConditions: LinkedCondition[]);
    constructor(condition: unknown, ...linkedConditions: LinkedCondition[]) {
        this._condition = (condition instanceof Condition) ? condition : new Condition(condition as string);
        this._linkedConditions = linkedConditions;
    }

    /**
     * Converts a condition string to a Conditions object.
     *
     * @param condition Condition string.
     * @return Conditions object.
     */
    public static convert(condition: string): Conditions;
    /**
     * Converts a Condition object to a Conditions object.
     *
     * @param condition Condition object.
     * @return Conditions object.
     */
    public static convert(condition: Condition): Conditions;
    /**
     * Converts a Conditions object to a Conditions object (nothing happens).
     *
     * @param conditions Conditions object.
     * @return Converted Conditions object.
     */
    public static convert(conditions: Conditions): Conditions;
    public static convert(arg: unknown): Conditions {
        let conditions: Conditions;

        if (!arg) {
            throw new Error('No condition provided');
        } else if (typeof arg === 'string') {
            conditions = new Conditions(arg);
        } else if (arg instanceof Condition) {
            conditions = new Conditions(arg.value);
        } else {
            const inputConditions = arg as Conditions;

            conditions = new Conditions(
                inputConditions.primaryCondition,
                ...inputConditions.linkedConditions,
            );
        }
        return conditions;
    }

    /**
     * Returns the primary condition.
     */
    public get condition(): Condition {
        return this.primaryCondition;
    }

    /**
     * Returns the primary condition.
     */
    public get primaryCondition(): Condition {
        return this._condition;
    }

    /**
     * Returns the linked conditions.
     */
    public get linkedConditions(): LinkedCondition[] {
        return this._linkedConditions;
    }

    /**
     * Returns all conditions (contains Condition and LinkedCondition objects).
     */
    public get conditions(): Condition[] {
        return [this.primaryCondition, ...this.linkedConditions];
    }

    /**
     * Compares if the provided condition string is equal the Conditions
     * object's condition.
     *
     * @param condition Condition to compare.
     * @return true if equal, otherwise false.
     */
    public equal(condition: string): boolean;
    /**
     * Compares if the provided Condition object's condition is equal
     * the Conditions object's condition.
     *
     * @param condition Condition to compare.
     * @return true if equal, otherwise false.
     */
    public equal(condition: Condition): boolean;
    /**
     * Compares if the provided conditions are equal the Conditions
     * object's conditions.
     *
     * @param condition Condition to compare.
     * @return true if equal, otherwise false.
     */
    public equal(conditions: Conditions): boolean;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public equal(arg: any): boolean {
        const conditions = Conditions.convert(arg);
        let equal = false;

        /* Conditions that don't have the same length can't be equal. */
        if (this.conditions.length === conditions?.conditions.length) {
            equal = this.conditions.every((condition, index) =>  condition.equal(conditions.conditions[index]));
        }
        return equal;
    }
}
