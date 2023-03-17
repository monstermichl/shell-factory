import { Statement } from '../base/statement.mjs';
import {
    Block,
    StatementOrBlockOrString,
} from '../base/block.mjs';
import { WrapBlock } from './wrap-block.mjs';

export type StringOrNumberOrBoolean = string | number | boolean;

/**
 * Serves as the base for all blocks that iterate a list (e.g., For, Select, ...).
 */
export abstract class IterationBlock extends WrapBlock {
    /**
     * Iteration-block constructor.
     *
     * @param keyword   Start keyword of the iteration-block.
     * @param variable  Variable to work with.
     * @param value     Value to iterate through.
     * @param statement Iteration-block content.
     */
    constructor(keyword: string, variable: string, value: string, statement?: Statement);
    /**
     * Iteration-block constructor.
     *
     * @param keyword   Start keyword of the iteration-block.
     * @param variable  Variable to work with.
     * @param value     Value to iterate through.
     * @param statement Iteration-block content.
     */
    constructor(keyword: string, variable: string, value: string, statement?: string);
    /**
     * Iteration-block constructor.
     *
     * @param keyword  Start keyword of the iteration-block.
     * @param variable Variable to work with.
     * @param value    Value to iterate through.
     * @param block    Iteration-block content.
     */
    constructor(keyword: string, variable: string, value: string, block?: Block);
    /**
     * Iteration-block constructor.
     *
     * @param keyword    Start keyword of the iteration-block.
     * @param variable   Variable to work with.
     * @param value      Value to iterate through.
     * @param statements Iteration-block content.
     */
    constructor(keyword: string, variable: string, value: string, statements?: Statement[]);
    /**
     * Iteration-block constructor.
     *
     * @param keyword    Start keyword of the iteration-block.
     * @param variable   Variable to work with.
     * @param value      Value to iterate through.
     * @param statements Iteration-block content.
     */
    constructor(keyword: string, variable: string, value: string, statements?: string[]);
    /**
     * Iteration-block constructor.
     *
     * @param keyword  Start keyword of the iteration-block.
     * @param variable Variable to work with.
     * @param value    Value to iterate through.
     * @param blocks   Iteration-block content.
     */
    constructor(keyword: string, variable: string, value: string, blocks?: Block[]);
    /**
     * Iteration-block constructor.
     *
     * @param keyword  Start keyword of the iteration-block.
     * @param variable Variable to work with.
     * @param value    Value to iterate through.
     * @param content  Iteration-block content.
     */
    constructor(keyword: string, variable: string, value: string, content?: StatementOrBlockOrString[]);
    /**
     * Iteration-block constructor.
     *
     * @param keyword   Start keyword of the iteration-block.
     * @param variable  Variable to work with.
     * @param value     Value to iterate through.
     * @param statement Iteration-block content.
     */
    constructor(keyword: string, variable: string, value: number, statement?: Statement);
    /**
     * Iteration-block constructor.
     *
     * @param keyword   Start keyword of the iteration-block.
     * @param variable  Variable to work with.
     * @param value     Value to iterate through.
     * @param statement Iteration-block content.
     */
    constructor(keyword: string, variable: string, value: number, statement?: string);
    /**
     * Iteration-block constructor.
     *
     * @param keyword  Start keyword of the iteration-block.
     * @param variable Variable to work with.
     * @param value    Value to iterate through.
     * @param block    Iteration-block content.
     */
    constructor(keyword: string, variable: string, value: number, block?: Block);
    /**
     * Iteration-block constructor.
     *
     * @param keyword    Start keyword of the iteration-block.
     * @param variable   Variable to work with.
     * @param value      Value to iterate through.
     * @param statements Iteration-block content.
     */
    constructor(keyword: string, variable: string, value: number, statements?: Statement[]);
    /**
     * Iteration-block constructor.
     *
     * @param keyword    Start keyword of the iteration-block.
     * @param variable   Variable to work with.
     * @param value      Value to iterate through.
     * @param statements Iteration-block content.
     */
    constructor(keyword: string, variable: string, value: number, statements?: string[]);
    /**
     * Iteration-block constructor.
     *
     * @param keyword  Start keyword of the iteration-block.
     * @param variable Variable to work with.
     * @param value    Value to iterate through.
     * @param content  Iteration-block content.
     */
    constructor(keyword: string, variable: string, value: number, blocks?: Block[]);
    /**
     * Iteration-block constructor.
     *
     * @param keyword  Start keyword of the iteration-block.
     * @param variable Variable to work with.
     * @param value    Value to iterate through.
     * @param content  Iteration-block content.
     */
    constructor(keyword: string, variable: string, value: number, content?: StatementOrBlockOrString[]);
    /**
     * Iteration-block constructor.
     *
     * @param keyword   Start keyword of the iteration-block.
     * @param variable  Variable to work with.
     * @param value     Value to iterate through.
     * @param statement Iteration-block content.
     */
    constructor(keyword: string, variable: string, value: boolean, statement?: Statement);
    /**
     * Iteration-block constructor.
     *
     * @param keyword   Start keyword of the iteration-block.
     * @param variable  Variable to work with.
     * @param value     Value to iterate through.
     * @param statement Iteration-block content.
     */
    constructor(keyword: string, variable: string, value: boolean, statement?: string);
    /**
     * Iteration-block constructor.
     *
     * @param keyword  Start keyword of the iteration-block.
     * @param variable Variable to work with.
     * @param value    Value to iterate through.
     * @param block    Iteration-block content.
     */
    constructor(keyword: string, variable: string, value: boolean, block?: Block);
    /**
     * Iteration-block constructor.
     *
     * @param keyword    Start keyword of the iteration-block.
     * @param variable   Variable to work with.
     * @param value      Value to iterate through.
     * @param statements Iteration-block content.
     */
    constructor(keyword: string, variable: string, value: boolean, statements?: Statement[]);
    /**
     * Iteration-block constructor.
     *
     * @param keyword    Start keyword of the iteration-block.
     * @param variable   Variable to work with.
     * @param value      Value to iterate through.
     * @param statements Iteration-block content.
     */
    constructor(keyword: string, variable: string, value: boolean, statements?: string[]);
    /**
     * Iteration-block constructor.
     *
     * @param keyword  Start keyword of the iteration-block.
     * @param variable Variable to work with.
     * @param value    Value to iterate through.
     * @param content  Iteration-block content.
     */
    constructor(keyword: string, variable: string, value: boolean, blocks?: Block[]);
    /**
     * Iteration-block constructor.
     *
     * @param keyword  Start keyword of the iteration-block.
     * @param variable Variable to work with.
     * @param value    Value to iterate through.
     * @param content  Iteration-block content.
     */
    constructor(keyword: string, variable: string, value: boolean, content?: StatementOrBlockOrString[]);
    /**
     * Iteration-block constructor.
     *
     * @param keyword   Start keyword of the iteration-block.
     * @param variable  Variable to work with.
     * @param values    Values to iterate through.
     * @param statement Iteration-block content.
     */
    constructor(keyword: string, variable: string, values: StringOrNumberOrBoolean[], statement?: Statement);
    /**
     * Iteration-block constructor.
     *
     * @param keyword   Start keyword of the iteration-block.
     * @param variable  Variable to work with.
     * @param values    Values to iterate through.
     * @param statement Iteration-block content.
     */
    constructor(keyword: string, variable: string, values: StringOrNumberOrBoolean[], statement?: string);
    /**
     * Iteration-block constructor.
     *
     * @param keyword  Start keyword of the iteration-block.
     * @param variable Variable to work with.
     * @param values   Values to iterate through.
     * @param block    Iteration-block content.
     */
    constructor(keyword: string, variable: string, values: StringOrNumberOrBoolean[], block?: Block);
    /**
     * Iteration-block constructor.
     *
     * @param keyword    Start keyword of the iteration-block.
     * @param variable   Variable to work with.
     * @param values     Values to iterate through.
     * @param statements Iteration-block content.
     */
    constructor(keyword: string, variable: string, values: StringOrNumberOrBoolean[], statements?: Statement[]);
    /**
     * Iteration-block constructor.
     *
     * @param keyword    Start keyword of the iteration-block.
     * @param variable   Variable to work with.
     * @param values     Values to iterate through.
     * @param statements Iteration-block content.
     */
    constructor(keyword: string, variable: string, values: StringOrNumberOrBoolean[], statements?: string[]);
    /**
     * Iteration-block constructor.
     *
     * @param keyword  Start keyword of the iteration-block.
     * @param variable Variable to work with.
     * @param values   Values to iterate through.
     * @param blocks   Iteration-block content.
     */
    constructor(keyword: string, variable: string, values: StringOrNumberOrBoolean[], blocks?: Block[]);
    /**
     * Iteration-block constructor.
     *
     * @param keyword  Start keyword of the iteration-block.
     * @param variable Variable to work with.
     * @param values   Values to iterate through.
     * @param content  Iteration-block content.
     */
    constructor(keyword: string, variable: string, values: StringOrNumberOrBoolean[], content?: StatementOrBlockOrString[]);
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    constructor(keyword: string, variable: string, arg: StringOrNumberOrBoolean | StringOrNumberOrBoolean[], content?: any) {
        /* Check if keyword has been provided. */
        if (!keyword) {
            throw new Error('Missing keyword');
        } 

        /* Check if variables has been provided. */
        if (!variable) {
            throw new Error('Missing variable');
        }

        /* If iteration value is not a list, make one out of it. */
        if (!(arg instanceof Array)) {
            arg = [arg];
        }
        
        const values = arg.map((value) => {
            if (['number', 'boolean'].includes(typeof value)) {
                value = `${value}`; /* Convert possible number to string. */
            } else if (typeof value !== 'string') {
                throw new Error('Invalid iteration value provided'); /* Invalid type provided. */
            }
            return value;
        }).join(' ');

        /* Check if values have been provided. */
        if (!values) {
            throw new Error('Missing values');
        }
        super(`${keyword} ${variable.trim().replace(/^\$/, '')} in ${values}; do`, content, 'done');
    }
}
