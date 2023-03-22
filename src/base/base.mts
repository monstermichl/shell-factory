import { randomUUID } from 'crypto';
import { copyOver } from '../helpers/copy.mjs';
import {
    convertToString,
    ConvertToStringError,
    wrapInQuotes,
} from '../helpers/string.mjs';

/**
 * Base class meta-data container.
 */
export class MetaData {
    id: string;
    comment: string;
}

/**
 * Operations summary.
 */
export class Operations {
    read: Base;
    write: Base;
    append: Base;
    pipe: Base;
}

/**
 * Acts as the base class for all Bourne Shell components.
 */
export abstract class Base {
    protected _readInput: Base;
    protected _writeOutput: Base;
    protected _appendOutput: Base;
    protected _pipeOutput: Base;

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
     * Returns a summary of the operations used.
     */
    public get operations(): Operations {
        return {
            read: this._readInput,
            write: this._writeOutput,
            append: this._appendOutput,
            pipe: this._pipeOutput,
        };
    }

    /**
     * Attaches a comment to the object.
     *
     * @param comment Comment to set.
     * @returns The current object.
     */
    public setComment(comment: string): this {
        this._comment = comment;
        return this;
    }

    /**
     * Removes the object's comment.
     *
     * @returns The current object.
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
     * @returns The current object.
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
     */
    public read(source: string): this;
    /**
     * Read from file.
     * 
     * @param source File to read from.
     */
    public read(source: number): this;
    /**
     * Read from file.
     * 
     * @param source File to read from.
     */
    public read(source: boolean): this;
    /**
     * Read from file.
     * 
     * @param source File to read from.
     */
    public read(source: boolean): this;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public read(source: any): this {
        /* Convert to Base object if required. */
        if (!(source instanceof Base)) {
            /* Make sure the target is valid. */
            source = convertToString(source as string, (e: ConvertToStringError) => {
                switch(e) {
                    case ConvertToStringError.EmptyValue: throw new Error('No source provided');
                    case ConvertToStringError.InvalidType: throw new Error('Invalid source type provided');
                }
            });
            source = wrapInQuotes(source);
            source = this._readPreProcessing(source); /* Convert to Base object. */
        }
        this._readInput = source;
        return this;
    }

    /**
     * Write to target.
     * 
     * @param target Target to write to.
     */
    public write(target: string): this;
    /**
     * Write to target.
     * 
     * @param target Target to write to.
     */
    public write(target: number): this;
    /**
     * Write to target.
     * 
     * @param target Target to write to.
     */
    public write(target: boolean): this;
    /**
     * Write to target.
     * 
     * @param target Target to write to.
     */
    public write(target: boolean): this;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public write(target: any): this {
        /* Convert to Base object if required. */
        if (!(target instanceof Base)) {
            /* Make sure the target is valid. */
            target = convertToString(target as string, (e: ConvertToStringError) => {
                switch(e) {
                    case ConvertToStringError.EmptyValue: throw new Error('No target provided');
                    case ConvertToStringError.InvalidType: throw new Error('Invalid target type provided');
                }
            });
            target = wrapInQuotes(target);
            target = this._writePreProcessing(target); /* Convert to Base object. */
        }
        this._writeOutput = target;
        return this;
    }

    /**
     * Append to target.
     * 
     * @param target Target to append to.
     */
    public append(target: string): this;
    /**
     * Append to target.
     * 
     * @param target Target to append to.
     */
    public append(target: number): this;
    /**
     * Append to target.
     * 
     * @param target Target to append to.
     */
    public append(target: boolean): this;
    /**
     * Append to target.
     * 
     * @param target Target to append to.
     */
    public append(target: boolean): this;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public append(target: any): this {
        /* Convert to Base object if required. */
        if (!(target instanceof Base)) {
            /* Make sure the target is valid. */
            target = convertToString(target as string, (e: ConvertToStringError) => {
                switch(e) {
                    case ConvertToStringError.EmptyValue: throw new Error('No target provided');
                    case ConvertToStringError.InvalidType: throw new Error('Invalid target type provided');
                }
            });
            target = wrapInQuotes(target);
            target = this._readPreProcessing(target); /* Convert to Base object. */
        }
        this._appendOutput = target;
        return this;
    }

    /**
     * Pipes the output into another command.
     * 
     * @param target Command to pipe to.
     */
    public pipe(target: string): this;
    /**
     * Pipes the output into another command.
     * 
     * @param target Command to pipe to.
     */
    public pipe(target: number): this;
    /**
     * Pipes the output into another command.
     * 
     * @param target Command to pipe to.
     */
    public pipe(target: boolean): this;
    /**
     * Pipes the output into another command.
     * 
     * @param target Command to pipe to.
     */
    public pipe(target: Base): this;
    /**
     * Pipes the output into another command.
     * 
     * @param target Command to pipe to.
     */
    public pipe(target: unknown): this {
        /* Convert to Base object if required. */
        if (!(target instanceof Base)) {
            /* Make sure the target is valid. */
            target = convertToString(target as string, (e: ConvertToStringError) => {
                switch(e) {
                    case ConvertToStringError.EmptyValue: throw new Error('No target provided');
                    case ConvertToStringError.InvalidType: throw new Error('Invalid target type provided');
                }
            });
            target = wrapInQuotes(target as string);
            target = this._pipePreProcessing(target as string); /* Convert to Base object. */
        }

        /* Make sure a Base object has been provided. */
        if (!(target instanceof Base)) {
            throw new Error('Invalid target provided');
        }
        this._pipeOutput = target;
        return this;
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
}
