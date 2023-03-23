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

type StringOrParameter = string | Parameter;
type StringOrNumberOrBoolean = string | number | boolean;

/**
 * Represents a function-parameter. TODO: Use Variable class instead.
 */
export class Parameter extends Statement {
    constructor(name: string) {
        if (typeof name !== 'string') {
            throw new Error('Parameter name is not a string');
        }
        name = name.trim();

        if (!name) {
            throw new Error('No parameter name provided');
        }
        const nameCleaned = name.replace(/\s+/, '_'); /* Replace whitepspaces with underline. */
        super(nameCleaned);
    }

    public get value(): string {
        return this.statement;
    }
}

/**
 * Represents a Bourne Shell function-block.
 */
export class Function extends WrapBlock {
    private _name: string;
    private _parameters = [] as Parameter[];

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
    public constructor(name: string, statement?: Statement, parameters?: Parameter[]);
    /**
     * Function constructor.
     *
     * @param name       Function name.
     * @param statement  Function content.
     * @param parameters If parameters are provided, the function's positional
     *                   parameters (e.g. $1, $2, ...) will be mapped to function
     *                   internal variables.
     */
    public constructor(name: string, statement?: string, parameters?: Parameter[]);
    /**
     * Function constructor.
     *
     * @param name       Function name.
     * @param block      Function content.
     * @param parameters If parameters are provided, the function's positional
     *                   parameters (e.g. $1, $2, ...) will be mapped to function
     *                   internal variables.
     */
    public constructor(name: string, block?: Block, parameters?: Parameter[]);
    /**
     * Function constructor.
     *
     * @param name       Function name.
     * @param statements Function content.
     * @param parameters If parameters are provided, the function's positional
     *                   parameters (e.g. $1, $2, ...) will be mapped to function
     *                   internal variables.
     */
    public constructor(name: string, statements?: Statement[], parameters?: Parameter[]);
    /**
     * Function constructor.
     *
     * @param name       Function name.
     * @param statements Function content.
     * @param parameters If parameters are provided, the function's positional
     *                   parameters (e.g. $1, $2, ...) will be mapped to function
     *                   internal variables.
     */
    public constructor(name: string, statements?: string[], parameters?: Parameter[]);
    /**
     * Function constructor.
     *
     * @param name       Function name.
     * @param blocks     Function content.
     * @param parameters If parameters are provided, the function's positional
     *                   parameters (e.g. $1, $2, ...) will be mapped to function
     *                   internal variables.
     */
    public constructor(name: string, blocks?: Block[], parameters?: Parameter[]);
    /**
     * Function constructor.
     *
     * @param name       Function name.
     * @param content    Function content.
     * @param parameters If parameters are provided, the function's positional
     *                   parameters (e.g. $1, $2, ...) will be mapped to function
     *                   internal variables.
     */
    public constructor(name: string, content?: StatementOrBlockOrString[], parameters?: Parameter[]);
    /**
     * Function constructor.
     *
     * @param name       Function name.
     * @param statement  Function content.
     * @param parameters If parameters are provided, the function's positional
     *                   parameters (e.g. $1, $2, ...) will be mapped to function
     *                   internal variables.
     */
    public constructor(name: string, statement?: Statement, parameters?: StringOrParameter[]);
    /**
     * Function constructor.
     *
     * @param name       Function name.
     * @param statement  Function content.
     * @param parameters If parameters are provided, the function's positional
     *                   parameters (e.g. $1, $2, ...) will be mapped to function
     *                   internal variables.
     */
    public constructor(name: string, statement?: string, parameters?: StringOrParameter[]);
    /**
     * Function constructor.
     *
     * @param name       Function name.
     * @param block      Function content.
     * @param parameters If parameters are provided, the function's positional
     *                   parameters (e.g. $1, $2, ...) will be mapped to function
     *                   internal variables.
     */
    public constructor(name: string, block?: Block, parameters?: StringOrParameter[]);
    /**
     * Function constructor.
     *
     * @param name       Function name.
     * @param statements Function content.
     * @param parameters If parameters are provided, the function's positional
     *                   parameters (e.g. $1, $2, ...) will be mapped to function
     *                   internal variables.
     */
    public constructor(name: string, statements?: Statement[], parameters?: StringOrParameter[]);
    /**
     * Function constructor.
     *
     * @param name       Function name.
     * @param statements Function content.
     * @param parameters If parameters are provided, the function's positional
     *                   parameters (e.g. $1, $2, ...) will be mapped to function
     *                   internal variables.
     */
    public constructor(name: string, statements?: string[], parameters?: StringOrParameter[]);
    /**
     * Function constructor.
     *
     * @param name       Function name.
     * @param blocks     Function content.
     * @param parameters If parameters are provided, the function's positional
     *                   parameters (e.g. $1, $2, ...) will be mapped to function
     *                   internal variables.
     */
    public constructor(name: string, blocks?: Block[], parameters?: StringOrParameter[]);
    /**
     * Function constructor.
     *
     * @param name       Function name.
     * @param content    Function content.
     * @param parameters If parameters are provided, the function's positional
     *                   parameters (e.g. $1, $2, ...) will be mapped to function
     *                   internal variables.
     */
    public constructor(name: string, content?: StatementOrBlockOrString[], parameters?: StringOrParameter[]);
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public constructor(name: string, content?: any, parameters?: unknown[]) {
        /* Make sure the provided function name is valid. */
        name = convertToString(name, (e: ConvertToStringError) => {
            switch(e) {
                case ConvertToStringError.EmptyValue: throw new Error('Missing function name');
                case ConvertToStringError.InvalidType: throw new Error('Invalid function name type');
            }
        });

        /* Check if function name matches rules. */
        if (!name.match(/^(_|[a-zA-^])+\w+$/)) {
            throw new Error('Invalid function name');
        }
        const mappedParameters = [] as string[];

        /* If parameters are provided, add the to the content. */
        if (parameters instanceof Array)
        {
            /* Convert content to array. */
            content = (content instanceof Array) ? [...content] : [content];

            /* Map all string parameters to Parameter class. */
            parameters = parameters.map((parameter, index) => {
                if (typeof parameter === 'string') {
                    /* Convert to Parameter. */
                    parameter = new Parameter(parameter);
                } else if (!(parameter instanceof Parameter)) {
                    throw new Error(`Parameter ${index} is neither a string nor a Parameter class instance`);
                }
                return parameter;
            });

            /* Add parameters to internal array and to content. */
            parameters.forEach((parameter: Parameter, index) => {
                const mappingString = `${parameter.statement}=$${index + 1}`; /* Create parameter mapping. */
                mappedParameters.push(mappingString);

            });
            content.splice(0, 0, ...mappedParameters); /* Insert parameter mappings before function content. */
        } else {
            parameters = [];
        }
        super(`${name}() {`, content, '}');

        this._name = name;
        this._parameters.push(...(parameters as Parameter[]));
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
    public get parameters(): Parameter[] {
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
