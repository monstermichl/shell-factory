export interface IConditionable {
    /**
     * Returns the original condition string.
     * 
     * @returns The original condition string.
     */
    get condition(): unknown;

    /**
     * Returns if the condition gets tested.
     *
     * @returns True if the gets tested.
     */
    getTest(): boolean;

    /**
     * Sets if the condition shall be tested.
     *
     * @param test Sets if the condition shall be tested.
     */
    setTest(test: boolean): this;

    /**
     * Adds a new and-connected condition to the condition.
     *
     * @param condition Condition to add.
     * @returns The current instance.
     */
    and(condition: unknown): this;
    /**
     * Adds a new and-connected condition to the condition.
     *
     * @param condition Condition to add.
     * @returns The current instance.
     */
    and(condition: string): this;
    /**
     * Adds a new and-connected condition to the condition.
     *
     * @param condition Condition to add.
     * @returns The current instance.
     */
    and(condition: boolean): this;
    /**
     * Adds a new and-connected condition to the condition.
     *
     * @param condition Condition to add.
     * @returns The current instance.
     */
    and(condition: number): this;

    /**
     * Adds a new or-connected condition to the condition.
     *
     * @param condition Condition to add.
     * @returns The current instance.
     */
    or(condition: unknown): this;
    /**
     * Adds a new or-connected condition to the condition.
     *
     * @param condition Condition to add.
     * @returns The current instance.
     */
    or(condition: string): this;
    /**
     * Adds a new or-connected condition to the condition.
     *
     * @param condition Condition to add.
     * @returns The current instance.
     */
    or(condition: boolean): this;
    /**
     * Adds a new or-connected condition to the condition.
     *
     * @param condition Condition to add.
     * @returns The current instance.
     */
    or(condition: number): this;
}
