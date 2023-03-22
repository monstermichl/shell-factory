import { randomUUID } from 'crypto';
import {
    convertToString,
    ConvertToStringError,
} from '../helpers/string.mjs';

/**
 * Base class meta-data container.
 */
export class MetaData {
    id: string;
    comment: string;
}

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
    target: Base;

    constructor(type: ChainType, target: Base) {
        this.type = type;
        this.target = target;
    }
}

/**
 * Acts as the base class for all Bourne Shell components.
 */
export abstract class Base {
    protected _chain = [] as ChainElement[];

    private _id: string;
    private _comment: string;

    /**
     * Base constructor.
     */
    public constructor() {
        this._id = randomUUID();
    }

    /**
     * Returns the object's ID.
     */
    public get id(): string {
        return this._id;
    }

    /**
     * Returns the object's comment.
     */
    public get comment(): string | undefined {
        return this._comment;
    }

    /**
     * Returns a summary of the applied chain.
     */
    public get chain(): ChainElement[] {
        return this._chain;
    }

    /**
     * Attaches a comment to the object.
     *
     * @param comment Comment to set.
     * @returns The current instance.
     */
    public setComment(comment: string): this {
        this._comment = comment;
        return this;
    }

    /**
     * Removes the object's comment.
     *
     * @returns The current instance.
     */
    public clearComment(): this {
        this._comment = undefined;
        return this;
    }

    /**
     * Fills the provided MetaData-struct with data. It's
     * done this way to get the meta-data of a newly
     * created object while still being able to chain
     * the required calls.
     *
     * @param container MetaData object to fill.
     * @returns The current instance.
     */
    public meta(container: MetaData): this {
        if (container) {
            container.id = this.id;
            container.comment = this.comment;
        }
        return this;
    }

    /**
     * Read from file.
     * 
     * @param source File to read from.
     * @returns The current instance.
     */
    public read(source: string): this;
    /**
     * Read from file.
     * 
     * @param source File to read from.
     * @returns The current instance.
     */
    public read(source: number): this;
    /**
     * Read from file.
     * 
     * @param source File to read from.
     * @returns The current instance.
     */
    public read(source: boolean): this;
    /**
     * Read from file.
     * 
     * @param source File to read from.
     * @returns The current instance.
     */
    public read(source: Base): this;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public read(source: any): this {
        return this._addChainElement(ChainType.Read, source, 'source', this._readPreProcessing);
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
    public write(target: Base): this;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public write(target: any): this {
        return this._addChainElement(ChainType.Write, target, 'target', this._writePreProcessing);
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
    public append(target: Base): this;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public append(target: any): this {
        return this._addChainElement(ChainType.Append, target, 'target', this._appendPreProcessing);
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
    public pipe(target: Base): this;
    /**
     * Pipes the output into another command.
     * 
     * @param target Command to pipe to.
     * @returns The current instance.
     */
    public pipe(target: unknown): this {
        return this._addChainElement(ChainType.Pipe, target, 'target', this._pipePreProcessing);
    }

    /**
     * Makes sure that a Base instance is available to the read-method.
     *
     * @param source Source to read from.
     * @returns Converted source object.
     */
    protected abstract _readPreProcessing(source: string): Base;

    /**
     * Makes sure that a Base instance is available to the write-method.
     *
     * @param target Target to write to.
     * @returns Converted target object.
     */
    protected abstract _writePreProcessing(target: string): Base;

    /**
     * Makes sure that a Base instance is available to the append-method.
     *
     * @param target Target to append to.
     * @returns Converted target object.
     */
    protected abstract _appendPreProcessing(target: string): Base;

    /**
     * Makes sure that a Base instance is available to the pipe-method.
     *
     * @param target Target to pipe to.
     * @returns Converted target object.
     */
    protected abstract _pipePreProcessing(target: string): Base;

    /**
     * Converts string, number, boolean or Base to Base.
     *
     * @param convertible    String, number, boolean or Base to convert.
     * @param description    Convertible description.
     * @param convertCallout Subclass' pre-processing method.
     *
     * @returns Converted convertible object (Base).
     */
    private _convertToBase(convertible: unknown, description: string, convertCallout: (convertible: string) => Base): Base {
        if (!(convertible instanceof Base)) {
            /* Make sure the target is valid. */
            convertible = convertToString(convertible as string, (e: ConvertToStringError) => {
                switch(e) {
                    case ConvertToStringError.EmptyValue: throw new Error(`No ${description} provided`);
                    case ConvertToStringError.InvalidType: throw new Error(`Invalid ${description} type provided`);
                }
            });
            convertible = convertCallout.call(this, convertible);
            
            /* Make sure conversion was successful. */
            if (!(convertible instanceof Base)) {
                throw new Error('Conversion failed');
            }
        }
        return convertible as Base;
    }

    /**
     * Sets the _operation property.
     *
     * @param chainType      Which operation is being set.
     * @param convertible    String, number, boolean or Base to convert.
     * @param description    Convertible description.
     * @param convertCallout Subclass' pre-processing method.
     *
     * @returns The current instance.
     */
    private _addChainElement(chainType: ChainType, convertible: unknown, description: string, convertCallout: (convertible: string) => Base): this {
        const base = this._convertToBase(convertible, description, convertCallout);
        
        this._chain.push(new ChainElement(
            chainType,
            base,
        ));
        return this;
    }
}
