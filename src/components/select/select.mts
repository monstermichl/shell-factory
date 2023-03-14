import { Statement } from '../../base/statement.mjs';
import {
    Block,
    StatementOrBlockOrString,
} from '../../base/block.mjs';
import { IterationBlock } from '../../blocks/iteration-block.mjs';

type StringOrNumber = string | number;

/**
 * Represents a Bourne Shell select-block.
 */
export class Select extends IterationBlock {
    /**
     * Select constructor.
     *
     * @param variable  Variable to work with.
     * @param value     Value to iterate through.
     * @param statement Select-block content.
     */
    constructor(variable: string, value: string, statement?: Statement);
    /**
     * Select constructor.
     *
     * @param variable  Variable to work with.
     * @param value     Value to iterate through.
     * @param statement Select-block content.
     */
    constructor(variable: string, value: string, statement?: string);
    /**
     * Select constructor.
     *
     * @param variable Variable to work with.
     * @param value    Value to iterate through.
     * @param block    Select-block content.
     */
    constructor(variable: string, value: string, block?: Block);
    /**
     * Select constructor.
     *
     * @param variable   Variable to work with.
     * @param value      Value to iterate through.
     * @param statements Select-block content.
     */
    constructor(variable: string, value: string, statements?: Statement[]);
    /**
     * Select constructor.
     *
     * @param variable   Variable to work with.
     * @param value      Value to iterate through.
     * @param statements Select-block content.
     */
    constructor(variable: string, value: string, statements?: string[]);
    /**
     * Select constructor.
     *
     * @param variable Variable to work with.
     * @param value    Value to iterate through.
     * @param blocks   Select-block content.
     */
    constructor(variable: string, value: string, blocks?: Block[]);
    /**
     * Select constructor.
     *
     * @param variable Variable to work with.
     * @param value    Value to iterate through.
     * @param content  Select-block content.
     */
    constructor(variable: string, value: string, content?: StatementOrBlockOrString[]);
    /**
     * Select constructor.
     *
     * @param variable  Variable to work with.
     * @param value     Value to iterate through.
     * @param statement Select-block content.
     */
    constructor(variable: string, value: number, statement?: Statement);
    /**
     * Select constructor.
     *
     * @param variable  Variable to work with.
     * @param value     Value to iterate through.
     * @param statement Select-block content.
     */
    constructor(variable: string, value: number, statement?: string);
    /**
     * Select constructor.
     *
     * @param variable Variable to work with.
     * @param value    Value to iterate through.
     * @param block    Select-block content.
     */
    constructor(variable: string, value: number, block?: Block);
    /**
     * Select constructor.
     *
     * @param variable   Variable to work with.
     * @param value      Value to iterate through.
     * @param statements Select-block content.
     */
    constructor(variable: string, value: number, statements?: Statement[]);
    /**
     * Select constructor.
     *
     * @param variable   Variable to work with.
     * @param value      Value to iterate through.
     * @param statements Select-block content.
     */
    constructor(variable: string, value: number, statements?: string[]);
    /**
     * Select constructor.
     *
     * @param variable Variable to work with.
     * @param value    Value to iterate through.
     * @param content  Select-block content.
     */
    constructor(variable: string, value: number, blocks?: Block[]);
    /**
     * Select constructor.
     *
     * @param variable Variable to work with.
     * @param value    Value to iterate through.
     * @param content  Select-block content.
     */
    constructor(variable: string, value: number, content?: StatementOrBlockOrString[]);
    /**
     * Select constructor.
     *
     * @param variable  Variable to work with.
     * @param values    Values to iterate through.
     * @param statement Select-block content.
     */
    constructor(variable: string, values: StringOrNumber[], statement?: Statement);
    /**
     * Select constructor.
     *
     * @param variable  Variable to work with.
     * @param values    Values to iterate through.
     * @param statement Select-block content.
     */
    constructor(variable: string, values: StringOrNumber[], statement?: string);
    /**
     * Select constructor.
     *
     * @param variable Variable to work with.
     * @param values   Values to iterate through.
     * @param block    Select-block content.
     */
    constructor(variable: string, values: StringOrNumber[], block?: Block);
    /**
     * Select constructor.
     *
     * @param variable   Variable to work with.
     * @param values     Values to iterate through.
     * @param statements Select-block content.
     */
    constructor(variable: string, values: StringOrNumber[], statements?: Statement[]);
    /**
     * Select constructor.
     *
     * @param variable   Variable to work with.
     * @param values     Values to iterate through.
     * @param statements Select-block content.
     */
    constructor(variable: string, values: StringOrNumber[], statements?: string[]);
    /**
     * Select constructor.
     *
     * @param variable Variable to work with.
     * @param values   Values to iterate through.
     * @param blocks   Select-block content.
     */
    constructor(variable: string, values: StringOrNumber[], blocks?: Block[]);
    /**
     * Select constructor.
     *
     * @param variable Variable to work with.
     * @param values   Values to iterate through.
     * @param content  Select-block content.
     */
    constructor(variable: string, values: StringOrNumber[], content?: StatementOrBlockOrString[]);
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    constructor(variable: string, arg: any, content?: any) {
        super('select', variable, arg, content);
    }
}
