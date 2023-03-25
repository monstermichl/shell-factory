import { evaluateIdOrPattern } from '../helpers/pattern.mjs';
import {
    convertToString,
    ConvertToStringError,
    isNumber,
} from '../helpers/string.mjs';
import { Base } from './base.mjs';

/**
 * It serves as the base for all kind of statements in
 * a script.
 */
export abstract class Statement extends Base {
    protected _statement: string;

    /**
     * Statement constructor.
     *
     * @param statement Statement value.
     */
    constructor(statement?: string);
    /**
     * Statement constructor.
     *
     * @param statement Statement value.
     */
    constructor(statement?: Statement);
    /**
     * Statement constructor.
     *
     * @param statement Statement value.
     */
    constructor(statement?: boolean);
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    constructor(statement?: any) {
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
    public set statement(value: string | Statement | number) {
        /* If statement was provided, use its value. */
        if (value instanceof Statement) {
            value = value.value;
        } else {
            /* Make sure, Statement is convertible to string. */
            value = convertToString(value as string, (e: ConvertToStringError) => {
                switch(e) {
                    case ConvertToStringError.InvalidType: throw new Error('Invalid Statement value type provided');
                }
            }, { emptyAllowed: true });
            
            /* Integer only is not allowed since it's not an executable. */
            if (isNumber(value)) {
                throw new Error('Number is not allowed as Statement value');
            }
        }
        this._statement = value;
    }

    /**
     * Returns the Statement's value. This function must be
     * implemented by a subclass.
     *
     * @returns The Statement value.
     */
    public abstract get value(): string;

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
        if (!(statement instanceof Statement)) {
            throw new Error('Invalid compare object');
        }
        const idOrPatternEvaluationResult = evaluateIdOrPattern(idOrPattern);
        const { isId, regex } = idOrPatternEvaluationResult;

        return (
            (isId && !!statement.id.match(regex)) ||
            (!isId && !!statement.value.match(regex))
        );
    }
}
