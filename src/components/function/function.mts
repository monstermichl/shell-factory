import { WrapBlock } from '../../blocks/wrap-block.mjs';
import { Statement } from '../../base/statement.mjs';
import {
    Block,
    StatementOrBlockOrString,
} from '../../base/block.mjs';
import {
    convertToString,
    ConvertToStringError,
    wrapInQuotes,
} from '../../helpers/string.mjs';
import { Command } from '../../base/command.mjs';
import { Variable } from '../../base/variable.mjs';
import { StringVariable } from '../../variables/string-variable.mjs';

type StringOrVariable = string | Variable;
type StringOrNumberOrBoolean = string | number | boolean;

/**
 * Represents a Bourne Shell function-block.
 */
export class Function extends WrapBlock {
    private _name: string;
    private _parameters = [] as Variable[];

    /**
     * Function constructor.
     *
     * @param name       Function name.
     * @param statement  Function content.
     * @param parameters If parameters are provided, the function's positional
     *                   parameters (e.g. $1, $2, ...) will be mapped to function
     *                   internal variables.
     */
    public constructor(name: string, statement?: Statement, parameters?: string[]);
    /**
     * Function constructor.
     *
     * @param name       Function name.
     * @param statement  Function content.
     * @param parameters If parameters are provided, the function's positional
     *                   parameters (e.g. $1, $2, ...) will be mapped to function
     *                   internal variables.
     */
    public constructor(name: string, statement?: string, parameters?: string[]);
    /**
     * Function constructor.
     *
     * @param name       Function name.
     * @param block      Function content.
     * @param parameters If parameters are provided, the function's positional
     *                   parameters (e.g. $1, $2, ...) will be mapped to function
     *                   internal variables.
     */
    public constructor(name: string, block?: Block, parameters?: string[]);
    /**
     * Function constructor.
     *
     * @param name       Function name.
     * @param statements Function content.
     * @param parameters If parameters are provided, the function's positional
     *                   parameters (e.g. $1, $2, ...) will be mapped to function
     *                   internal variables.
     */
    public constructor(name: string, statements?: Statement[], parameters?: string[]);
    /**
     * Function constructor.
     *
     * @param name       Function name.
     * @param statements Function content.
     * @param parameters If parameters are provided, the function's positional
     *                   parameters (e.g. $1, $2, ...) will be mapped to function
     *                   internal variables.
     */
    public constructor(name: string, statements?: string[], parameters?: string[]);
    /**
     * Function constructor.
     *
     * @param name       Function name.
     * @param blocks     Function content.
     * @param parameters If parameters are provided, the function's positional
     *                   parameters (e.g. $1, $2, ...) will be mapped to function
     *                   internal variables.
     */
    public constructor(name: string, blocks?: Block[], parameters?: string[]);
    /**
     * Function constructor.
     *
     * @param name       Function name.
     * @param content    Function content.
     * @param parameters If parameters are provided, the function's positional
     *                   parameters (e.g. $1, $2, ...) will be mapped to function
     *                   internal variables.
     */
    public constructor(name: string, content?: StatementOrBlockOrString[], parameters?: string[]);
    /**
     * Function constructor.
     *
     * @param name       Function name.
     * @param statement  Function content.
     * @param parameters If parameters are provided, the function's positional
     *                   parameters (e.g. $1, $2, ...) will be mapped to function
     *                   internal variables.
     */
    public constructor(name: string, statement?: Statement, parameters?: Variable[]);
    /**
     * Function constructor.
     *
     * @param name       Function name.
     * @param statement  Function content.
     * @param parameters If parameters are provided, the function's positional
     *                   parameters (e.g. $1, $2, ...) will be mapped to function
     *                   internal variables.
     */
    public constructor(name: string, statement?: string, parameters?: Variable[]);
    /**
     * Function constructor.
     *
     * @param name       Function name.
     * @param block      Function content.
     * @param parameters If parameters are provided, the function's positional
     *                   parameters (e.g. $1, $2, ...) will be mapped to function
     *                   internal variables.
     */
    public constructor(name: string, block?: Block, parameters?: Variable[]);
    /**
     * Function constructor.
     *
     * @param name       Function name.
     * @param statements Function content.
     * @param parameters If parameters are provided, the function's positional
     *                   parameters (e.g. $1, $2, ...) will be mapped to function
     *                   internal variables.
     */
    public constructor(name: string, statements?: Statement[], parameters?: Variable[]);
    /**
     * Function constructor.
     *
     * @param name       Function name.
     * @param statements Function content.
     * @param parameters If parameters are provided, the function's positional
     *                   parameters (e.g. $1, $2, ...) will be mapped to function
     *                   internal variables.
     */
    public constructor(name: string, statements?: string[], parameters?: Variable[]);
    /**
     * Function constructor.
     *
     * @param name       Function name.
     * @param blocks     Function content.
     * @param parameters If parameters are provided, the function's positional
     *                   parameters (e.g. $1, $2, ...) will be mapped to function
     *                   internal variables.
     */
    public constructor(name: string, blocks?: Block[], parameters?: Variable[]);
    /**
     * Function constructor.
     *
     * @param name       Function name.
     * @param content    Function content.
     * @param parameters If parameters are provided, the function's positional
     *                   parameters (e.g. $1, $2, ...) will be mapped to function
     *                   internal variables.
     */
    public constructor(name: string, content?: StatementOrBlockOrString[], parameters?: Variable[]);
    /**
     * Function constructor.
     *
     * @param name       Function name.
     * @param statement  Function content.
     * @param parameters If parameters are provided, the function's positional
     *                   parameters (e.g. $1, $2, ...) will be mapped to function
     *                   internal variables.
     */
    public constructor(name: string, statement?: Statement, parameters?: StringOrVariable[]);
    /**
     * Function constructor.
     *
     * @param name       Function name.
     * @param statement  Function content.
     * @param parameters If parameters are provided, the function's positional
     *                   parameters (e.g. $1, $2, ...) will be mapped to function
     *                   internal variables.
     */
    public constructor(name: string, statement?: string, parameters?: StringOrVariable[]);
    /**
     * Function constructor.
     *
     * @param name       Function name.
     * @param block      Function content.
     * @param parameters If parameters are provided, the function's positional
     *                   parameters (e.g. $1, $2, ...) will be mapped to function
     *                   internal variables.
     */
    public constructor(name: string, block?: Block, parameters?: StringOrVariable[]);
    /**
     * Function constructor.
     *
     * @param name       Function name.
     * @param statements Function content.
     * @param parameters If parameters are provided, the function's positional
     *                   parameters (e.g. $1, $2, ...) will be mapped to function
     *                   internal variables.
     */
    public constructor(name: string, statements?: Statement[], parameters?: StringOrVariable[]);
    /**
     * Function constructor.
     *
     * @param name       Function name.
     * @param statements Function content.
     * @param parameters If parameters are provided, the function's positional
     *                   parameters (e.g. $1, $2, ...) will be mapped to function
     *                   internal variables.
     */
    public constructor(name: string, statements?: string[], parameters?: StringOrVariable[]);
    /**
     * Function constructor.
     *
     * @param name       Function name.
     * @param blocks     Function content.
     * @param parameters If parameters are provided, the function's positional
     *                   parameters (e.g. $1, $2, ...) will be mapped to function
     *                   internal variables.
     */
    public constructor(name: string, blocks?: Block[], parameters?: StringOrVariable[]);
    /**
     * Function constructor.
     *
     * @param name       Function name.
     * @param content    Function content.
     * @param parameters If parameters are provided, the function's positional
     *                   parameters (e.g. $1, $2, ...) will be mapped to function
     *                   internal variables.
     */
    public constructor(name: string, content?: StatementOrBlockOrString[], parameters?: StringOrVariable[]);
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public constructor(name: string, content?: any, parameters?: unknown[]) {
        /* Make sure the provided function name is valid. */
        name = convertToString(name, (e: ConvertToStringError) => {
            switch(e) {
                case ConvertToStringError.EmptyValue: throw new Error('Missing function name');
                case ConvertToStringError.InvalidType: throw new Error('Invalid function name type provided');
            }
        });

        /* Check if function name matches rules. */
        if (!name.match(/^(_|[a-zA-^])+\w+$/)) {
            throw new Error('Invalid function name');
        }

        /* If parameters are provided, add the to the content. */
        if (parameters instanceof Array)
        {
            /* Convert content to array. */
            content = (content instanceof Array) ? [...content] : [content];

            /* Map all string parameters to Parameter class. */
            parameters = parameters.map((parameter, index) => {
                if (typeof parameter === 'string') {
                    /* Convert to StringVariable and make sure it's local. */
                    parameter = new StringVariable(parameter, true);
                } else if (!(parameter instanceof Variable)) {
                    throw new Error(`Parameter ${index} is neither a string nor a Variable class instance`);
                }
                return parameter;
            });

            /* Insert parameters before function content. */
            content.splice(0, 0, ...parameters.map((variable: Variable, index) => variable.set(`$${index + 1}`)));
        } else {
            parameters = [];
        }
        super(`${name}() {`, content, '}');

        this._name = name;
        this._parameters.push(...(parameters as Variable[]));
    }

    /**
     * Returns the function name.
     */
    public get name(): string {
        return this._name;
    }

    /**
     * Returns the function parameters.
     */
    public get parameters(): Variable[] {
        return [...this._parameters];
    }

    /**
     * Returns a function-call Statement.
     *
     * @param parameters Parameters with which to call the function.
     * @returns Function-call Statement object.
     */
    public call(...parameters: number[]): Statement;
    /**
     * Returns a function-call Statement.
     *
     * @param parameters Parameters with which to call the function.
     * @returns Function-call Statement object.
     */
    public call(...parameters: boolean[]): Statement;
    /**
     * Returns a function-call Statement.
     *
     * @param parameters Parameters with which to call the function.
     * @returns Function-call Statement object.
     */
    public call(...parameters: string[]): Statement;
    /**
     * Returns a function-call Statement.
     *
     * @param parameters Parameters with which to call the function.
     * @returns Function-call Statement object.
     */
    public call(...parameters: StringOrNumberOrBoolean[]): Statement;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public call(...parameters: any[]): Statement {
        parameters = parameters.map((parameter) => {
            /* Make sure the provided parameter is valid. */
            parameter = convertToString(parameter, (e: ConvertToStringError) => {
                switch(e) {
                    case ConvertToStringError.InvalidType: throw new Error('Parameter is neither string nor number nor boolean');
                }
            }, { emptyAllowed: true }); /* Allow empty value. */

            return wrapInQuotes(parameter); /* Wrap parameter in quotes if necessary. */
        });
        return new Command(`${this.name} ${parameters.join(' ')}`);
    }
}
