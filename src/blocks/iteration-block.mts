import { Statement } from '../base/statement.mjs';
import {
    Block,
    StatementOrBlockOrString,
} from '../base/block.mjs';
import { WrapBlock } from './wrap-block.mjs';
import {
    convertToString,
    ConvertToStringError,
    wrapInQuotes,
} from '../helpers/string.mjs';
import { Variable } from '../base/variable.mjs';
import { StringVariable } from '../variables/string-variable.mjs';

export type StringOrNumberOrBoolean = string | number | boolean;

/**
 * Serves as the base for all blocks that iterate a list (e.g., For, Select, ...).
 */
export abstract class IterationBlock extends WrapBlock {
    private _variable: StringVariable;

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
    /**
     * Iteration-block constructor.
     *
     * @param keyword   Start keyword of the iteration-block.
     * @param variable  Variable to work with.
     * @param value     Value to iterate through.
     * @param statement Iteration-block content.
     */
    constructor(keyword: string, variable: StringVariable, value: string, statement?: Statement);
    /**
     * Iteration-block constructor.
     *
     * @param keyword   Start keyword of the iteration-block.
     * @param variable  Variable to work with.
     * @param value     Value to iterate through.
     * @param statement Iteration-block content.
     */
    constructor(keyword: string, variable: StringVariable, value: string, statement?: string);
    /**
     * Iteration-block constructor.
     *
     * @param keyword  Start keyword of the iteration-block.
     * @param variable Variable to work with.
     * @param value    Value to iterate through.
     * @param block    Iteration-block content.
     */
    constructor(keyword: string, variable: StringVariable, value: string, block?: Block);
    /**
     * Iteration-block constructor.
     *
     * @param keyword    Start keyword of the iteration-block.
     * @param variable   Variable to work with.
     * @param value      Value to iterate through.
     * @param statements Iteration-block content.
     */
    constructor(keyword: string, variable: StringVariable, value: string, statements?: Statement[]);
    /**
     * Iteration-block constructor.
     *
     * @param keyword    Start keyword of the iteration-block.
     * @param variable   Variable to work with.
     * @param value      Value to iterate through.
     * @param statements Iteration-block content.
     */
    constructor(keyword: string, variable: StringVariable, value: string, statements?: string[]);
    /**
     * Iteration-block constructor.
     *
     * @param keyword  Start keyword of the iteration-block.
     * @param variable Variable to work with.
     * @param value    Value to iterate through.
     * @param blocks   Iteration-block content.
     */
    constructor(keyword: string, variable: StringVariable, value: string, blocks?: Block[]);
    /**
     * Iteration-block constructor.
     *
     * @param keyword  Start keyword of the iteration-block.
     * @param variable Variable to work with.
     * @param value    Value to iterate through.
     * @param content  Iteration-block content.
     */
    constructor(keyword: string, variable: StringVariable, value: string, content?: StatementOrBlockOrString[]);
    /**
     * Iteration-block constructor.
     *
     * @param keyword   Start keyword of the iteration-block.
     * @param variable  Variable to work with.
     * @param value     Value to iterate through.
     * @param statement Iteration-block content.
     */
    constructor(keyword: string, variable: StringVariable, value: number, statement?: Statement);
    /**
     * Iteration-block constructor.
     *
     * @param keyword   Start keyword of the iteration-block.
     * @param variable  Variable to work with.
     * @param value     Value to iterate through.
     * @param statement Iteration-block content.
     */
    constructor(keyword: string, variable: StringVariable, value: number, statement?: string);
    /**
     * Iteration-block constructor.
     *
     * @param keyword  Start keyword of the iteration-block.
     * @param variable Variable to work with.
     * @param value    Value to iterate through.
     * @param block    Iteration-block content.
     */
    constructor(keyword: string, variable: StringVariable, value: number, block?: Block);
    /**
     * Iteration-block constructor.
     *
     * @param keyword    Start keyword of the iteration-block.
     * @param variable   Variable to work with.
     * @param value      Value to iterate through.
     * @param statements Iteration-block content.
     */
    constructor(keyword: string, variable: StringVariable, value: number, statements?: Statement[]);
    /**
     * Iteration-block constructor.
     *
     * @param keyword    Start keyword of the iteration-block.
     * @param variable   Variable to work with.
     * @param value      Value to iterate through.
     * @param statements Iteration-block content.
     */
    constructor(keyword: string, variable: StringVariable, value: number, statements?: string[]);
    /**
     * Iteration-block constructor.
     *
     * @param keyword  Start keyword of the iteration-block.
     * @param variable Variable to work with.
     * @param value    Value to iterate through.
     * @param content  Iteration-block content.
     */
    constructor(keyword: string, variable: StringVariable, value: number, blocks?: Block[]);
    /**
     * Iteration-block constructor.
     *
     * @param keyword  Start keyword of the iteration-block.
     * @param variable Variable to work with.
     * @param value    Value to iterate through.
     * @param content  Iteration-block content.
     */
    constructor(keyword: string, variable: StringVariable, value: number, content?: StatementOrBlockOrString[]);
    /**
     * Iteration-block constructor.
     *
     * @param keyword   Start keyword of the iteration-block.
     * @param variable  Variable to work with.
     * @param value     Value to iterate through.
     * @param statement Iteration-block content.
     */
    constructor(keyword: string, variable: StringVariable, value: boolean, statement?: Statement);
    /**
     * Iteration-block constructor.
     *
     * @param keyword   Start keyword of the iteration-block.
     * @param variable  Variable to work with.
     * @param value     Value to iterate through.
     * @param statement Iteration-block content.
     */
    constructor(keyword: string, variable: StringVariable, value: boolean, statement?: string);
    /**
     * Iteration-block constructor.
     *
     * @param keyword  Start keyword of the iteration-block.
     * @param variable Variable to work with.
     * @param value    Value to iterate through.
     * @param block    Iteration-block content.
     */
    constructor(keyword: string, variable: StringVariable, value: boolean, block?: Block);
    /**
     * Iteration-block constructor.
     *
     * @param keyword    Start keyword of the iteration-block.
     * @param variable   Variable to work with.
     * @param value      Value to iterate through.
     * @param statements Iteration-block content.
     */
    constructor(keyword: string, variable: StringVariable, value: boolean, statements?: Statement[]);
    /**
     * Iteration-block constructor.
     *
     * @param keyword    Start keyword of the iteration-block.
     * @param variable   Variable to work with.
     * @param value      Value to iterate through.
     * @param statements Iteration-block content.
     */
    constructor(keyword: string, variable: StringVariable, value: boolean, statements?: string[]);
    /**
     * Iteration-block constructor.
     *
     * @param keyword  Start keyword of the iteration-block.
     * @param variable Variable to work with.
     * @param value    Value to iterate through.
     * @param content  Iteration-block content.
     */
    constructor(keyword: string, variable: StringVariable, value: boolean, blocks?: Block[]);
    /**
     * Iteration-block constructor.
     *
     * @param keyword  Start keyword of the iteration-block.
     * @param variable Variable to work with.
     * @param value    Value to iterate through.
     * @param content  Iteration-block content.
     */
    constructor(keyword: string, variable: StringVariable, value: boolean, content?: StatementOrBlockOrString[]);
    /**
     * Iteration-block constructor.
     *
     * @param keyword   Start keyword of the iteration-block.
     * @param variable  Variable to work with.
     * @param values    Values to iterate through.
     * @param statement Iteration-block content.
     */
    constructor(keyword: string, variable: StringVariable, values: StringOrNumberOrBoolean[], statement?: Statement);
    /**
     * Iteration-block constructor.
     *
     * @param keyword   Start keyword of the iteration-block.
     * @param variable  Variable to work with.
     * @param values    Values to iterate through.
     * @param statement Iteration-block content.
     */
    constructor(keyword: string, variable: StringVariable, values: StringOrNumberOrBoolean[], statement?: string);
    /**
     * Iteration-block constructor.
     *
     * @param keyword  Start keyword of the iteration-block.
     * @param variable Variable to work with.
     * @param values   Values to iterate through.
     * @param block    Iteration-block content.
     */
    constructor(keyword: string, variable: StringVariable, values: StringOrNumberOrBoolean[], block?: Block);
    /**
     * Iteration-block constructor.
     *
     * @param keyword    Start keyword of the iteration-block.
     * @param variable   Variable to work with.
     * @param values     Values to iterate through.
     * @param statements Iteration-block content.
     */
    constructor(keyword: string, variable: StringVariable, values: StringOrNumberOrBoolean[], statements?: Statement[]);
    /**
     * Iteration-block constructor.
     *
     * @param keyword    Start keyword of the iteration-block.
     * @param variable   Variable to work with.
     * @param values     Values to iterate through.
     * @param statements Iteration-block content.
     */
    constructor(keyword: string, variable: StringVariable, values: StringOrNumberOrBoolean[], statements?: string[]);
    /**
     * Iteration-block constructor.
     *
     * @param keyword  Start keyword of the iteration-block.
     * @param variable Variable to work with.
     * @param values   Values to iterate through.
     * @param blocks   Iteration-block content.
     */
    constructor(keyword: string, variable: StringVariable, values: StringOrNumberOrBoolean[], blocks?: Block[]);
    /**
     * Iteration-block constructor.
     *
     * @param keyword  Start keyword of the iteration-block.
     * @param variable Variable to work with.
     * @param values   Values to iterate through.
     * @param content  Iteration-block content.
     */
    constructor(keyword: string, variable: StringVariable, values: StringOrNumberOrBoolean[], content?: StatementOrBlockOrString[]);
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    constructor(keyword: string, variable: string | StringVariable, arg: StringOrNumberOrBoolean | StringOrNumberOrBoolean[], content?: any) {
        /* Make sure the provided keyword is valid. */
        keyword = convertToString(keyword, (e: ConvertToStringError) => {
            switch(e) {
                case ConvertToStringError.EmptyValue: throw new Error('Missing keyword');
                case ConvertToStringError.InvalidType: throw new Error('Invalid keyword type');
            }
        });

        /* If variable is not already a variable instance, convert it. */
        if (!(variable instanceof StringVariable)) {
            /* Make sure the provided variable is valid. */
            variable = convertToString(variable, (e: ConvertToStringError) => {
                switch(e) {
                    case ConvertToStringError.EmptyValue: throw new Error('Missing variable');
                    case ConvertToStringError.InvalidType: throw new Error('Invalid variable type');
                }
            });
            variable = new StringVariable(variable);
        }

        /* If iteration value is not a list, make one out of it. */
        if (!(arg instanceof Array)) {
            arg = [arg];
        }
        
        const values = arg.map((value: string) => {
            const isString = (typeof value === 'string');

            /* Make sure the provided value is valid. */
            value = convertToString(value, (e: ConvertToStringError) => {
                switch(e) {
                    case ConvertToStringError.InvalidType: throw new Error('Invalid iteration value provided');
                }
            }, { emptyAllowed: true }); /* Allow empty values. */

            /* If type was empty but already string before, make sure to wrap it in quotes. */
            if (!value && isString) {
                value = wrapInQuotes(value, true);
            }
            return value;
        }).join(' ');

        /* Check if values have been provided. */
        if (!values) {
            throw new Error('Missing values');
        }
        super(`${keyword} ${(variable as Variable).name} in ${values}; do`, content, 'done');
        this._variable = variable;
    }

    /**
     * Returns the iteration-block's variable.
     * 
     * @returns IterationBlock variable.
     */
    public get variable(): StringVariable {
        return this._variable;
    }
}
