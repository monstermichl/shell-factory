/**
 * Connect type.
 */
export enum OperationalConnectType {
    Read   = 'read',
    Write  = 'write',
    Append = 'append',
    Pipe   = 'pipe',
}

export interface IOperationallyConnectable {
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
}
