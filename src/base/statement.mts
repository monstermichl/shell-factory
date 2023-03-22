import { Base } from './base.mjs';

/**
 * Represents the most basic element in a script. It literally
 * just contains a statement which is printed.
 */
export class Statement extends Base {
    protected _statement: string;

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
        if (typeof value != 'string') {
            throw new Error('Invalid Statement value type provided');
        }
        this._statement = value;
    }

    /**
     * Makes sure that a Base instance is available to the read-method.
     *
     * @param source Source to read from.
     * @returns Converted source object.
     */
    protected _readPreProcessing(source: string): Base {
        return new Statement(source);
    }

    /**
     * Makes sure that a Base instance is available to the write-method.
     *
     * @param target Target to write to.
     * @returns Converted target object.
     */
    protected _writePreProcessing(target: string): Base {
        return new Statement(target);
    }

    /**
     * Makes sure that a Base instance is available to the append-method.
     *
     * @param target Target to append to.
     * @returns Converted target object.
     */
    protected _appendPreProcessing(target: string): Base {
        return new Statement(target);
    }

    /**
     * Makes sure that a Base instance is available to the pipe-method.
     *
     * @param target Target to pipe to.
     * @returns Converted target object.
     */
    protected _pipePreProcessing(target: string): Base {
        return new Statement(target);
    }
}
