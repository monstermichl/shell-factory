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
     * @return Statement string.
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
}
