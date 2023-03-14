import {
    ConditionBlock,
    BracketType,
} from '../blocks/condition-block.mjs';
import { Statement } from '../base/statement.mjs';
import {
    Block,
    StatementOrBlockOrString,
} from '../base/block.mjs';

type StringOrNumber = string | number;

/**
 * Serves as the base for all blocks that iterate a list (e.g., For, Select, ...).
 */
export abstract class IterationBlock extends ConditionBlock {
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
     * @param values    Values to iterate through.
     * @param statement Iteration-block content.
     */
    constructor(keyword: string, variable: string, values: StringOrNumber[], statement?: Statement);
    /**
     * Iteration-block constructor.
     *
     * @param keyword   Start keyword of the iteration-block.
     * @param variable  Variable to work with.
     * @param values    Values to iterate through.
     * @param statement Iteration-block content.
     */
    constructor(keyword: string, variable: string, values: StringOrNumber[], statement?: string);
    /**
     * Iteration-block constructor.
     *
     * @param keyword  Start keyword of the iteration-block.
     * @param variable Variable to work with.
     * @param values   Values to iterate through.
     * @param block    Iteration-block content.
     */
    constructor(keyword: string, variable: string, values: StringOrNumber[], block?: Block);
    /**
     * Iteration-block constructor.
     *
     * @param keyword    Start keyword of the iteration-block.
     * @param variable   Variable to work with.
     * @param values     Values to iterate through.
     * @param statements Iteration-block content.
     */
    constructor(keyword: string, variable: string, values: StringOrNumber[], statements?: Statement[]);
    /**
     * Iteration-block constructor.
     *
     * @param keyword    Start keyword of the iteration-block.
     * @param variable   Variable to work with.
     * @param values     Values to iterate through.
     * @param statements Iteration-block content.
     */
    constructor(keyword: string, variable: string, values: StringOrNumber[], statements?: string[]);
    /**
     * Iteration-block constructor.
     *
     * @param keyword  Start keyword of the iteration-block.
     * @param variable Variable to work with.
     * @param values   Values to iterate through.
     * @param blocks   Iteration-block content.
     */
    constructor(keyword: string, variable: string, values: StringOrNumber[], blocks?: Block[]);
    /**
     * Iteration-block constructor.
     *
     * @param keyword  Start keyword of the iteration-block.
     * @param variable Variable to work with.
     * @param values   Values to iterate through.
     * @param content  Iteration-block content.
     */
    constructor(keyword: string, variable: string, values: StringOrNumber[], content?: StatementOrBlockOrString[]);
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    constructor(keyword: string, variable: string, arg: string | number | StringOrNumber[], content?: any) {
        let values: string;

        /* Check if keyword has been provided. */
        if (!keyword) {
            throw new Error('Missing keyword');
        } 

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
        super(keyword, BracketType.None, `${variable.trim().replace(/^\$/, '')} in ${values}`, 'do', content, 'done');
    }
}
