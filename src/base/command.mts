import {
    convertToString,
    ConvertToStringError,
} from '../helpers/string.mjs';
import {
    ChainElement,
    IChainable,
} from '../interfaces/chainable.mjs';
import { Statement } from './statement.mjs';
import {
    ILogicallyConnectable,
    LogicalConnectType,
} from '../interfaces/logically-connectable.mjs';
import { OperationalConnectType } from '../interfaces/operationally-connectable.mjs';

/**
 * Represents a shell command. Commands provide the ability to be
 * combined with other commands.
 */
export class Command extends Statement implements IChainable<OperationalConnectType | LogicalConnectType, Command>, ILogicallyConnectable {
    protected _chain = [] as ChainElement<OperationalConnectType | LogicalConnectType, Command>[];

    /**
     * Statement constructor.
     *
     * @param statement Statement value.
     */
    constructor(statement?: string) {
        super();
        this.statement = statement || '';
    }

    /**
     * Returns the complete Statement chain.
     *
     * @returns The Statement value.
     */
    public get value(): string {
        let s = this.statement;

        /* Handle operation (read, write, append, pipe, ...). */
        this.chain.forEach((element) => {
            const { type, target } = element;
            let operator;

            /* Decide which operator string to use. */
            switch(type) {
                case OperationalConnectType.Read: operator = '<'; break;
                case OperationalConnectType.Write: operator = '>'; break;
                case OperationalConnectType.Append: operator = '>>'; break;
                case OperationalConnectType.Pipe: operator = '|'; break;
                case LogicalConnectType.And: operator = '&&'; break;
                case LogicalConnectType.Or: operator = '||'; break;

                default: throw new Error('Unsupported operator');
            }
            s += ` ${operator} ${target.statement}`;
        });
        return s;
    }

    /**
     * Returns the applied chain.
     */
    public get chain(): ChainElement<OperationalConnectType | LogicalConnectType, Command>[] {
        return this._chain;
    }

    /**
     * Read from source.
     * 
     * @param source Source to read from.
     * @returns The current instance.
     */
    public read(source: string): this;
    /**
     * Read from source.
     * 
     * @param source Source to read from.
     * @returns The current instance.
     */
    public read(source: number): this;
    /**
     * Read from source.
     * 
     * @param source Source to read from.
     * @returns The current instance.
     */
    public read(source: boolean): this;
    /**
     * Read from source.
     * 
     * @param source Source to read from.
     * @returns The current instance.
     */
    public read(source: Statement): this;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public read(source: any): this {
        return this._addChainElement(OperationalConnectType.Read, source, 'source');
    }

    /**
     * Write to target.
     * 
     * @param target Target to write to.
     * @returns The current instance.
     */
    public write(target: string): this;
    /**
     * Write to target.
     * 
     * @param target Target to write to.
     * @returns The current instance.
     */
    public write(target: number): this;
    /**
     * Write to target.
     * 
     * @param target Target to write to.
     * @returns The current instance.
     */
    public write(target: boolean): this;
    /**
     * Write to target.
     * 
     * @param target Target to write to.
     * @returns The current instance.
     */
    public write(target: Statement): this;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public write(target: any): this {
        return this._addChainElement(OperationalConnectType.Write, target, 'target');
    }

    /**
     * Append to target.
     * 
     * @param target Target to append to.
     * @returns The current instance.
     */
    public append(target: string): this;
    /**
     * Append to target.
     * 
     * @param target Target to append to.
     * @returns The current instance.
     */
    public append(target: number): this;
    /**
     * Append to target.
     * 
     * @param target Target to append to.
     * @returns The current instance.
     */
    public append(target: boolean): this;
    /**
     * Append to target.
     * 
     * @param target Target to append to.
     * @returns The current instance.
     */
    public append(target: Statement): this;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public append(target: any): this {
        return this._addChainElement(OperationalConnectType.Append, target, 'target');
    }

    /**
     * Pipes the output into another command.
     * 
     * @param target Command to pipe to.
     * @returns The current instance.
     */
    public pipe(target: string): this;
    /**
     * Pipes the output into another command.
     * 
     * @param target Command to pipe to.
     * @returns The current instance.
     */
    public pipe(target: number): this;
    /**
     * Pipes the output into another command.
     * 
     * @param target Command to pipe to.
     * @returns The current instance.
     */
    public pipe(target: boolean): this;
    /**
     * Pipes the output into another command.
     * 
     * @param target Command to pipe to.
     * @returns The current instance.
     */
    public pipe(target: Statement): this;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public pipe(target: any): this {
        return this._addChainElement(OperationalConnectType.Pipe, target, 'target');
    }

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
    and(target: Statement): this;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    and(target: any): this {
        return this._addChainElement(LogicalConnectType.And, target, 'target');
    }

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
    or(target: Statement): this;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    or(target: any): this {
        return this._addChainElement(LogicalConnectType.Or, target, 'target');
    }

    /**
     * Finds all elements based on the provided ID or pattern in the chain.
     * 
     * @param idOrPattern Content ID or Statement pattern.
     * @param type        If provided, the type must also match.
     *
     * @returns List of found chain elements.
     */
    public findInChain(idOrPattern: string, type?: OperationalConnectType | LogicalConnectType): ChainElement<OperationalConnectType | LogicalConnectType, Command>[];
    /**
     * Finds all elements based on the provided ID or pattern in the chain.
     * 
     * @param pattern Content ID or Statement pattern.
     * @param type    If provided, the type must also match.
     *
     * @returns List of found chain elements.
     */
    public findInChain(pattern: RegExp, type?: OperationalConnectType | LogicalConnectType): ChainElement<OperationalConnectType | LogicalConnectType, Command>[];
    /**
     * Finds all elements based on the provided type.
     * 
     * @param type Type to look for.
     * @returns List of found chain elements.
     */
    public findInChain(type: OperationalConnectType | LogicalConnectType): ChainElement<OperationalConnectType | LogicalConnectType, Command>[];
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public findInChain(arg1: any, arg2?: OperationalConnectType | LogicalConnectType): ChainElement<OperationalConnectType | LogicalConnectType, Command>[] {
        /* Check if arg1 is ConnectType or LogicalConnectType value. */
        if (this._isAnyConnectType(arg1)) {
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
    public removeFromChain(idOrPattern: string, type?: OperationalConnectType | LogicalConnectType): this;
    /**
     * Removes all elements based on the provided ID or pattern from the chain.
     * 
     * @param pattern Content ID or Statement pattern.
     * @param type    If provided, the type must also match.
     *
     * @returns The current instance.
     */
    public removeFromChain(pattern: RegExp, type?: OperationalConnectType | LogicalConnectType): this;
    /**
     * Removes all elements based on the provided type.
     * 
     * @param type Type to remove.
     * @returns The current instance.
     */
    public removeFromChain(type: OperationalConnectType | LogicalConnectType): this;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public removeFromChain(arg1: any, arg2?: OperationalConnectType | LogicalConnectType): this {
        /* Check if arg1 is ConnectType or LogicalConnectType value. */
        if (this._isAnyConnectType(arg1)) {
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
     * Checks if the provided argument is a LogicalConnectType or
     * a ConnectType value.
     *
     * @param arg Value to check.
     * @returns True if valid value.
     */
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    private _isAnyConnectType(arg: any): boolean {
        return (Object.values(OperationalConnectType).includes(arg) || Object.values(LogicalConnectType).includes(arg));
    }

    /**
     * Converts string, number, boolean or Statement to Command.
     *
     * @param convertible String, number, boolean or Statement to convert.
     * @param description Convertible description.
     *
     * @returns Converted convertible object (Command).
     */
    private _convertToCommand(convertible: unknown, description: string): Command {
        let statement: Command;

        if (!(convertible instanceof Statement)) {
            /* Make sure the target is valid. */
            convertible = convertToString(convertible as string, (e: ConvertToStringError) => {
                switch(e) {
                    case ConvertToStringError.EmptyValue: throw new Error(`No ${description} provided`);
                    case ConvertToStringError.InvalidType: throw new Error(`Invalid ${description} type provided`);
                }
            });
            statement = new Command(convertible as string);
        } else if (convertible instanceof Command) {
            /* Keep Command-instance as it is. */
            statement = convertible;
        } else {
            /* Create Command-instance from Statement. */
            statement = new Command(convertible.value);
        }
        return statement;
    }

    /**
     * Adds a new chain element.
     *
     * @param chainType   Which operation is being set.
     * @param convertible String, number, boolean or Statement to convert.
     * @param description Convertible description.
     *
     * @returns The current instance.
     */
    private _addChainElement(chainType: OperationalConnectType | LogicalConnectType, convertible: unknown, description: string): this {
        if (!this.statement) {
            throw new Error('An empty statement cannot be chained');
        }
        const statement = this._convertToCommand(convertible, description);

        this._chain.push(new ChainElement(
            chainType,
            statement,
        ));
        return this;
    }
}
