import {
    evaluateIdOrPattern,
    IdOrPatternEvaluationResult,
} from '../helpers/search.mjs';
import {
    convertToString,
    ConvertToStringError,
} from '../helpers/string.mjs';
import { IChainable } from '../interfaces/chainable.mjs';
import { Base } from './base.mjs';

/**
 * Chain type.
 */
export enum ChainType {
    Read   = (1 << 0), /* 1 */
    Write  = (1 << 1), /* 2 */
    Append = (1 << 2), /* 4 */
    Pipe   = (1 << 3), /* 8 */
}

/**
 * Chain element.
 */
export class ChainElement {
    type: ChainType;
    target: Statement;

    constructor(type: ChainType, target: Statement) {
        this.type = type;
        this.target = target;
    }
}

/**
 * Represents the most basic element in a script. It literally
 * just contains a statement which is printed.
 */
export class Statement extends Base implements IChainable {
    protected _statement: string;
    protected _chain = [] as ChainElement[];

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
     * Returns the Statement value.
     *
     * @returns The Statement value.
     */
    public get statement(): string {
        return this._statement;
    }

    /**
     * Sets the Statement value.
     */
    public set statement(value: string) {
        if (typeof value !== 'string') {
            throw new Error('Invalid Statement value type provided');
        }
        this._statement = value;
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
                case ChainType.Read: operator = '<'; break;
                case ChainType.Write: operator = '>'; break;
                case ChainType.Append: operator = '>>'; break;
                case ChainType.Pipe: operator = '|'; break;

                default: throw new Error('Unsupported operator');
            }
            s += ` ${operator} ${target.statement}`;
        });
        return s;
    }

    /**
     * Returns a the applied chain.
     */
    public get chain(): ChainElement[] {
        return this._chain;
    }

    /**
     * Finds all elements based on the provided ID or pattern in the chain.
     * 
     * @param idOrPattern Content ID or Statement pattern.
     * @param type        If provided, the type must also match.
     *
     * @returns List of found chain elements.
     */
    public findInChain(idOrPattern: string, type?: ChainType): ChainElement[];
    /**
     * Finds all elements based on the provided ID or pattern in the chain.
     * 
     * @param pattern Content ID or Statement pattern.
     * @param type    If provided, the type must also match.
     *
     * @returns List of found chain elements.
     */
    public findInChain(pattern: RegExp, type?: ChainType): ChainElement[];
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public findInChain(arg: any, type?: ChainType): ChainElement[] {
        return this.chain.filter((element) =>
            element.target.compareIdOrPattern(arg) && (!type || (element.type === type)),
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
    public removeFromChain(idOrPattern: string, type?: ChainType): this;
    /**
     * Removes all elements based on the provided ID or pattern from the chain.
     * 
     * @param pattern Content ID or Statement pattern.
     * @param type    If provided, the type must also match.
     *
     * @returns The current instance.
     */
    public removeFromChain(pattern: RegExp, type?: ChainType): this;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public removeFromChain(arg: any, type?: ChainType): this {
        for (let i = this.chain.length - 1; i >= 0; --i) {
            const element = this.chain[i];

            if (element.target.compareIdOrPattern(arg) && (!type || (element.type === type))) {
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
        return this._addChainElement(ChainType.Read, source, 'source');
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
        return this._addChainElement(ChainType.Write, target, 'target');
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
        return this._addChainElement(ChainType.Append, target, 'target');
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
        return this._addChainElement(ChainType.Pipe, target, 'target');
    }

    /**
     * Converts string, number, boolean or Statement to Statement.
     *
     * @param convertible String, number, boolean or Statement to convert.
     * @param description Convertible description.
     *
     * @returns Converted convertible object (Statement).
     */
    private _convertToStatement(convertible: unknown, description: string): Statement {
        let statement: Statement;

        if (!(convertible instanceof Statement)) {
            /* Make sure the target is valid. */
            convertible = convertToString(convertible as string, (e: ConvertToStringError) => {
                switch(e) {
                    case ConvertToStringError.EmptyValue: throw new Error(`No ${description} provided`);
                    case ConvertToStringError.InvalidType: throw new Error(`Invalid ${description} type provided`);
                }
            });
            statement = new Statement(convertible as string);
        } else {
            statement = convertible;
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
    private _addChainElement(chainType: ChainType, convertible: unknown, description: string): this {
        if (!this.statement) {
            throw new Error('An empty statement cannot be chained');
        }
        const statement = this._convertToStatement(convertible, description);

        this._chain.push(new ChainElement(
            chainType,
            statement,
        ));
        return this;
    }

    /**
     * Checks if a Statement matches an ID or a pattern.
     *
     * @param idOrPattern ID or pattern to match against.
     * @returns True if the ID or pattern matched.
     */
    public compareIdOrPattern(idOrPattern: string): boolean;
    /**
     * Checks if a Statement matches an ID or a pattern.
     *
     * @param idOrPattern ID or pattern to match against.
     * @returns True if the ID or pattern matched.
     */
    public compareIdOrPattern(idOrPattern: RegExp): boolean;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public compareIdOrPattern(idOrPattern: any): boolean {
        return Statement.compareIdOrPattern(this, idOrPattern);
    }

    /**
     * Checks if a Statement matches an ID or a pattern.
     *
     * @param statement   StatementOrBlock to compare a ID or pattern with.
     * @param idOrPattern ID or pattern to match against.
     *
     * @returns True if the ID or pattern matched.
     */
    public static compareIdOrPattern(statement: Statement, idOrPattern: string): boolean;
    /**
     * Checks if a Statement matches an ID or a pattern.
     *
     * @param statement   StatementOrBlock to compare a ID or pattern with.
     * @param idOrPattern ID or pattern to match against.
     *
     * @returns True if the ID or pattern matched.
     */
    public static compareIdOrPattern(statement: Statement, idOrPattern: RegExp): boolean;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public static compareIdOrPattern(statement: Statement, idOrPattern: any): boolean {
        const idOrPatternEvaluationResult = evaluateIdOrPattern(idOrPattern);

        if (!(idOrPatternEvaluationResult instanceof IdOrPatternEvaluationResult)) {
            throw new Error('Invalid ID or pattern evaluation result object');
        } else if (!(statement instanceof Statement)) {
            throw new Error('Invalid compare object');
        }
        const { isId, regex } = idOrPatternEvaluationResult;

        return (
            (isId && !!statement.id.match(regex)) ||
            (!isId && !!statement.value.match(regex))
        );
    }
}
