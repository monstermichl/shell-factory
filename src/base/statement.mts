import { Identifyable } from './identifyable.mjs';

/**
 * Represents the most basic element in a script. It literally
 * just contains a statement which is printed.
 */
export class Statement extends Identifyable {
    protected _statement: string;

    /**
     * Statement constructor.
     *
     * @param statement Statement value. If the value is not set here, it can
     *                  only be set by deriving classes.
     */
    constructor(statement?: string) {
        super();
        this._statement = statement || '';
    }

    /**
     * Returns the Statement value.
     *
     * @return Statement string.
     */
    public get value(): string {
        return this._statement;
    }
}
