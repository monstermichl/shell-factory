import {
    ConditionBlock,
    BracketType,
} from '../../../blocks/condition-block.mjs';
import { Statement } from '../../../base/statement.mjs';
import {
    Block,
    StatementOrBlockOrString,
} from '../../../base/block.mjs';

type StringOrNumber = string | number;

/**
 * Represents a Bourne Shell for-block.
 */
export class For extends ConditionBlock {
    /**
     * For constructor.
     *
     * @param variable Variable to work with.
     * @param value Value to iterate through.
     * @param statement For-block content.
     */
    constructor(variable: string, value: string, statement?: Statement);
    /**
     * For constructor.
     *
     * @param variable Variable to work with.
     * @param value Value to iterate through.
     * @param statement For-block content.
     */
    constructor(variable: string, value: string, statement?: string);
    /**
     * For constructor.
     *
     * @param variable Variable to work with.
     * @param value Value to iterate through.
     * @param block For-block content.
     */
    constructor(variable: string, value: string, block?: Block);
    /**
     * For constructor.
     *
     * @param variable Variable to work with.
     * @param value Value to iterate through.
     * @param statements For-block content.
     */
    constructor(variable: string, value: string, statements?: Statement[]);
    /**
     * For constructor.
     *
     * @param variable Variable to work with.
     * @param value Value to iterate through.
     * @param statements For-block content.
     */
    constructor(variable: string, value: string, statements?: string[]);
    /**
     * For constructor.
     *
     * @param variable Variable to work with.
     * @param value Value to iterate through.
     * @param blocks For-block content.
     */
    constructor(variable: string, value: string, blocks?: Block[]);
    /**
     * For constructor.
     *
     * @param variable Variable to work with.
     * @param value Value to iterate through.
     * @param content For-block content.
     */
    constructor(variable: string, value: string, content?: StatementOrBlockOrString[]);
    /**
     * For constructor.
     *
     * @param variable Variable to work with.
     * @param value Value to iterate through.
     * @param statement For-block content.
     */
    constructor(variable: string, value: number, statement?: Statement);
    /**
     * For constructor.
     *
     * @param variable Variable to work with.
     * @param value Value to iterate through.
     * @param statement For-block content.
     */
    constructor(variable: string, value: number, statement?: string);
    /**
     * For constructor.
     *
     * @param variable Variable to work with.
     * @param value Value to iterate through.
     * @param block For-block content.
     */
    constructor(variable: string, value: number, block?: Block);
    /**
     * For constructor.
     *
     * @param variable Variable to work with.
     * @param value Value to iterate through.
     * @param statements For-block content.
     */
    constructor(variable: string, value: number, statements?: Statement[]);
    /**
     * For constructor.
     *
     * @param variable Variable to work with.
     * @param value Value to iterate through.
     * @param statements For-block content.
     */
    constructor(variable: string, value: number, statements?: string[]);
    /**
     * For constructor.
     *
     * @param variable Variable to work with.
     * @param value Value to iterate through.
     * @param content For-block content.
     */
    constructor(variable: string, value: number, blocks?: Block[]);
    /**
     * For constructor.
     *
     * @param variable Variable to work with.
     * @param value Value to iterate through.
     * @param content For-block content.
     */
    constructor(variable: string, value: number, content?: StatementOrBlockOrString[]);
    /**
     * For constructor.
     *
     * @param variable Variable to work with.
     * @param values Values to iterate through.
     * @param statement For-block content.
     */
    constructor(variable: string, values: StringOrNumber[], statement?: Statement);
    /**
     * For constructor.
     *
     * @param variable Variable to work with.
     * @param values Values to iterate through.
     * @param statement For-block content.
     */
    constructor(variable: string, values: StringOrNumber[], statement?: string);
    /**
     * For constructor.
     *
     * @param variable Variable to work with.
     * @param values Values to iterate through.
     * @param block For-block content.
     */
    constructor(variable: string, values: StringOrNumber[], block?: Block);
    /**
     * For constructor.
     *
     * @param variable Variable to work with.
     * @param values Values to iterate through.
     * @param statements For-block content.
     */
    constructor(variable: string, values: StringOrNumber[], statements?: Statement[]);
    /**
     * For constructor.
     *
     * @param variable Variable to work with.
     * @param values Values to iterate through.
     * @param statements For-block content.
     */
    constructor(variable: string, values: StringOrNumber[], statements?: string[]);
    /**
     * For constructor.
     *
     * @param variable Variable to work with.
     * @param values Values to iterate through.
     * @param blocks For-block content.
     */
    constructor(variable: string, values: StringOrNumber[], blocks?: Block[]);
    /**
     * For constructor.
     *
     * @param variable Variable to work with.
     * @param values Values to iterate through.
     * @param content For-block content.
     */
    constructor(variable: string, values: StringOrNumber[], content?: StatementOrBlockOrString[]);
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    constructor(variable: string, arg: string | number | StringOrNumber[], content?: any) {
        let values: string;

        /* Check if variables has been provided. */
        if (!variable) {
            throw new Error('Missing variable');
        } 

        if (arg instanceof Array) {
            values = arg.join(' ');
        } else {
            values = `${arg}`; /* Convert possible number to string. */
        }

        /* Check if values have been provided. */
        if (!values) {
            throw new Error('Missing values');
        }
        super('for', BracketType.None, `${variable.trim().replace(/^\$/, '')} in ${values}`, 'do', content, 'done');
    }
}
