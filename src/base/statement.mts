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
        this.value = statement || '';
    }

    /**
     * Returns the Statement value.
     *
     * @returns The Statement value.
     */
    public get value(): string {
        return this._statement;
    }

    /**
     * Sets the Statement value.
     */
    public set value(value: string) {
        if (typeof value !== 'string') {
            throw new Error('Invalid Statement value type provided');
        }
        this._statement = value;
    }

    /**
     * Returns a the applied chain.
     */
    public get chain(): ChainElement[] {
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
        if (!this.value) {
            throw new Error('An empty statement cannot be chained');
        }
        const statement = this._convertToStatement(convertible, description);

        this._chain.push(new ChainElement(
            chainType,
            statement,
        ));
        return this;
    }
}
