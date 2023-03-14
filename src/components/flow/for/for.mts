import { Statement } from '../../../base/statement.mjs';
import {
    Block,
    StatementOrBlockOrString,
} from '../../../base/block.mjs';
import { IterationBlock } from '../../../blocks/iteration-block.mjs';

type StringOrNumber = string | number;

/**
 * Represents a Bourne Shell for-block.
 */
export class For extends IterationBlock {
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
    constructor(variable: string, arg: any, content?: any) {
        super('for', variable, arg, content);
    }
}
