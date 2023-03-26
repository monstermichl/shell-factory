/**
 * Chain type.
 */
export enum ChainType {
    Read   = (1 << 0), /*  1 */
    Write  = (1 << 1), /*  2 */
    Append = (1 << 2), /*  4 */
    Pipe   = (1 << 3), /*  8 */
    And    = (1 << 4), /* 16 */
    Or     = (1 << 5), /* 32 */
}

/**
 * Chain element.
 */
export class ChainElement<T> {
    type: ChainType;
    target: T;

    constructor(type: ChainType, target: T) {
        this.type = type;
        this.target = target;
    }
}

export interface IChainable<T> {
    /**
     * Returns a the applied chain.
     */
    get chain(): ChainElement<T>[];

    /**
     * Read from source.
     * 
     * @param source Source to read from.
     * @returns The current instance.
     */
    read(source: string): this;
    /**
     * Read from source.
     * 
     * @param source Source to read from.
     * @returns The current instance.
     */
    read(source: number): this;
    /**
     * Read from source.
     * 
     * @param source Source to read from.
     * @returns The current instance.
     */
    read(source: boolean): this;

    /**
     * Write to target.
     * 
     * @param target Target to write to.
     * @returns The current instance.
     */
    write(target: string): this;
    /**
     * Write to target.
     * 
     * @param target Target to write to.
     * @returns The current instance.
     */
    write(target: number): this;
    /**
     * Write to target.
     * 
     * @param target Target to write to.
     * @returns The current instance.
     */
    write(target: boolean): this;

    /**
     * Append to target.
     * 
     * @param target Target to append to.
     * @returns The current instance.
     */
    append(target: string): this;
    /**
     * Append to target.
     * 
     * @param target Target to append to.
     * @returns The current instance.
     */
    append(target: number): this;
    /**
     * Append to target.
     * 
     * @param target Target to append to.
     * @returns The current instance.
     */
    append(target: boolean): this;

    /**
     * Pipes the output into another command.
     * 
     * @param target Command to pipe to.
     * @returns The current instance.
     */
    pipe(target: string): this;
    /**
     * Pipes the output into another command.
     * 
     * @param target Command to pipe to.
     * @returns The current instance.
     */
    pipe(target: number): this;
    /**
     * Pipes the output into another command.
     * 
     * @param target Command to pipe to.
     * @returns The current instance.
     */
    pipe(target: boolean): this;

    /**
     * Logically and-connects the result to another command.
     * 
     * @param target Command to connect to.
     * @returns The current instance.
     */
    and(target: unknown): this;
    /**
     * Logically and-connects the result to another command.
     * 
     * @param target Command to connect to.
     * @returns The current instance.
     */
    and(target: string): this;
    /**
     * Logically and-connects the result to another command.
     * 
     * @param target Command to connect to.
     * @returns The current instance.
     */
    and(target: boolean): this;
    /**
     * Logically and-connects the result to another command.
     * 
     * @param target Command to connect to.
     * @returns The current instance.
     */
    and(target: number): this;

    /**
     * Logically or-connects the result to another command.
     * 
     * @param target Command to connect to.
     * @returns The current instance.
     */
    or(target: unknown): this;
    /**
     * Logically or-connects the result to another command.
     * 
     * @param target Command to connect to.
     * @returns The current instance.
     */
    or(target: string): this;
    /**
     * Logically or-connects the result to another command.
     * 
     * @param target Command to connect to.
     * @returns The current instance.
     */
    or(target: boolean): this;
    /**
     * Logically or-connects the result to another command.
     * 
     * @param target Command to connect to.
     * @returns The current instance.
     */
    or(target: number): this;

    /**
     * Finds all elements based on the provided ID or pattern in the chain.
     * 
     * @param idOrPattern Content ID or Statement pattern.
     * @param type        If provided, the type must also match.
     *
     * @returns List of found chain elements.
     */
    findInChain(idOrPattern: string, type?: ChainType): ChainElement<T>[];
    /**
     * Finds all elements based on the provided ID or pattern in the chain.
     * 
     * @param pattern Content ID or Statement pattern.
     * @param type    If provided, the type must also match.
     *
     * @returns List of found chain elements.
     */
    findInChain(pattern: RegExp, type?: ChainType): ChainElement<T>[];
    /**
     * Finds all elements based on the provided type.
     * 
     * @param type Type to look for.
     * @returns List of found chain elements.
     */
    findInChain(type: ChainType): ChainElement<T>[];

    /**
     * Removes all elements based on the provided ID or pattern from the chain.
     * 
     * @param idOrPattern Content ID or Statement pattern.
     * @param type        If provided, the type must also match.
     *
     * @returns The current instance.
     */
    removeFromChain(idOrPattern: string, type?: ChainType): this;
    /**
     * Removes all elements based on the provided ID or pattern from the chain.
     * 
     * @param pattern Content ID or Statement pattern.
     * @param type    If provided, the type must also match.
     *
     * @returns The current instance.
     */
    removeFromChain(pattern: RegExp, type?: ChainType): this;
    /**
     * Removes all elements based on the provided type.
     * 
     * @param type Type to remove.
     * @returns The current instance.
     */
    removeFromChain(type: ChainType): this;

    /**
     * Clears the whole chain.
     *
     * @returns The current instance.
     */
    clearChain(): this;
}
