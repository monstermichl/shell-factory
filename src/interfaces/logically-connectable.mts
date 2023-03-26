/**
 * LogicalConnect type.
 */
export enum LogicalConnectType {
    And = 'and',
    Or = 'or',
}

export interface ILogicallyConnectable {
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
     * Logically and-connects the result to another command.
     * 
     * @param target Command to connect to.
     * @returns The current instance.
     */
    and(target: unknown): this;

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
     * Logically or-connects the result to another command.
     * 
     * @param target Command to connect to.
     * @returns The current instance.
     */
    or(target: unknown): this;
}
