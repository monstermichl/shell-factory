import { EvalSubshellBlock } from '../components/subshell/eval-subshell-block.mjs';
import {
    convertToString,
    ConvertToStringError,
} from '../helpers/string.mjs';
import { ISubshellable } from '../interfaces/subshellable.mjs';
import { IEvaluable } from '../interfaces/evaluable.mjs';
import {
    Block,
    StatementOrBlockOrString,
} from './block.mjs';
import { Statement } from './statement.mjs';
import { SubshellStatement } from '../components/subshell/subshell-statement.mjs';
import { EvalSubshellStatement } from '../components/subshell/eval-subshell-statement.mjs';
import { Condition } from '../components/condition/condition.mjs';

/**
 * Helper class to instantiate a simple Statement
 * which allows subshelling and evaluation..
 */
export class VariableStatement extends Statement implements ISubshellable, IEvaluable {
    /**
     * Returns the statement.
     */
    public get value(): string {
        return this.statement;
    }

    /**
     * Returns the statement in a subshell statement.
     *
     * @returns A new SubshellStatement instance.
     */
    public subshell(): SubshellStatement {
        return new SubshellStatement(this);
    }

    /**
     * Returns the statement in an evaluation-subshell statement.
     *
     * @returns A new EvalSubshellStatement instance.
     */
    eval(): EvalSubshellStatement {
        return this.subshell().eval();
    }
}

/**
 * Helper class to instantiate a simple Block.
 */
export class VariableBlock extends Block {
    /**
     * Block constructor.
     *
     * @param statement Block content.
     */
    public constructor(statement?: Statement);
    /**
     * Block constructor.
     *
     * @param statement Block content.
     */
    public constructor(statement?: string);
    /**
     * Block constructor.
     *
     * @param block Block content.
     */
    public constructor(block?: Block);
    /**
     * Block constructor.
     *
     * @param statements Block content.
     */
    public constructor(statements?: Statement[]);
    /**
     * Block constructor.
     *
     * @param statements Block content.
     */
    public constructor(statements?: string[]);
    /**
     * Block constructor.
     *
     * @param blocks Block content.
     */
    public constructor(blocks?: Block[]);
    /**
     * Block constructor.
     *
     * @param content Block content.
     */
    public constructor(content?: StatementOrBlockOrString[]);
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public constructor(content?: any) {
        super(content);
    }
}

/**
 * Serves as the base for all kind of variable types.
 */
export abstract class Variable extends Statement {
    private _local: boolean;
    private _defined = false;

    /**
     * VariableBase constructor.
     *
     * @param name  Variable name.
     * @param local Specifies if the variable is a local variable.
     */
    constructor(name: string, local?: boolean) {
        if (typeof name !== 'string') {
            throw new Error('Invalid variable name type provided');
        }
        /* Trim whitespaces and replace possible substitution characters. */
        name = name.trim().replace(/^\$\{?/, '').replace(/\}$/, '');

        /* Make sure, variable name is valid. */
        if (!name.match(/^[_\w]+$/)) {
            throw new Error('Invalid variable name provided');
        }

        /* Replace possible substitution characters. */
        super(name);
        this._local = !!local;
    }

    /**
     * Returns the variable name.
     *
     * @returns Variable name.
     */
    public get name(): string {
        return this.statement;
    }

    /**
     * Returns if the variable is a local variable.
     */
    public get local(): boolean {
        return this._local;
    }

    /**
     * Returns the variable including the ${...} brackets.
     *
     * @returns Variable with ${...} brackets.
     */
    public get value(): string {
        return `$\{${this.statement}}`;
    }

    /**
     * Creates an assignment-statement. If the variable is assigned the
     * first time and it's a local variable, the local keyword is put in
     * front.
     *
     * @param value Statement to set as value.
     * @returns Assignment statement.
     */
    public set(value?: Statement): VariableStatement;
    /**
     * Creates an assignment-statement. If the variable is assigned the
     * first time and it's a local variable, the local keyword is put in
     * front.
     *
     * @param value String to set as value.
     * @returns Assignment statement.
     */
    public set(value?: string): VariableStatement;
    /**
     * Creates an assignment-statement. If the variable is assigned the
     * first time and it's a local variable, the local keyword is put in
     * front.
     *
     * @param value Number to set as value.
     * @returns Assignment statement.
     */
    public set(value?: number): VariableStatement;
    /**
     * Creates an assignment-statement. If the variable is assigned the
     * first time and it's a local variable, the local keyword is put in
     * front.
     *
     * @param value Boolean to set as value.
     * @returns Assignment statement.
     */
    public set(value?: boolean): VariableStatement;
    /**
     * Creates an assignment-statement. If the variable is assigned the
     * first time and it's a local variable, the local keyword is put in
     * front.
     *
     * @param value Block to set as value.
     * @returns Assignment statement.
     */
    public set(value?: EvalSubshellBlock): VariableBlock;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public set(value?: any): VariableStatement | VariableBlock {
        /* If the variable has not been initialize and is local,
           prepend the 'local' keyword. */
        let prefix = '';
        if (this._local && !this._defined) {
            prefix = 'local ';
        }
        const assign = (value: string) => new VariableStatement(`${prefix}${this.name}=${value}`);

        /* If value is instance of EvalSubshellBlock create a
           new Block whereat the block's first statement is the
           assign statement. */
        if (value instanceof EvalSubshellBlock) {
            value = new VariableBlock([
                assign(value.openingStatement.value),
                ...value.raw.slice(1),
            ]);
        } else {
            /* Convert value to string. */
            value = this._convertValueInternal(value);
            value = assign(value);
        }
        this._defined = true;
        return value;
    }

    /**
     * Converts the provided value string to whatever is required by
     * the subclass.
     *
     * @param value Value string.
     * @returns Converted value.
     */
    protected abstract _convertValue(value?: string): string;
    /**
     * Creates the compare string based on the compare operator, the
     * value and the variable.
     *
     * @param compareOperator Specifies how the values shall be compared.
     * @param value           Value to compare with.
     *
     * @returns Compare Statement.
     */
    protected abstract _buildCompareString(compareOperator: number, value: string): string;

    /**
     * Converts the provided value to a string and passes it the the subclass'
     * _convertValue method.
     *
     * @param value Value to convert.
     * @returns Converted value string.
     */
    protected _convertValueInternal(value?: Statement): string;
    /**
     * Converts the provided value to a string and passes it the the subclass'
     * _convertValue method.
     *
     * @param value Value to convert.
     * @returns Converted value string.
     */
    protected _convertValueInternal(value?: string): string;
    /**
     * Converts the provided value to a string and passes it the the subclass'
     * _convertValue method.
     *
     * @param value Value to convert.
     * @returns Converted value string.
     */
    protected _convertValueInternal(value?: number): string;
    /**
     * Converts the provided value to a string and passes it the the subclass'
     * _convertValue method.
     *
     * @param value Value to convert.
     * @returns Converted value string.
     */
    protected _convertValueInternal(value?: boolean): string;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    protected _convertValueInternal(value?: any): string {
        value = this._convertValueToString(value);
        return this._convertValue(value);
    }

    /**
     * Converts the provided value to a string.
     *
     * @param value Value to convert.
     * @returns Converted value string.
     */
    protected _convertValueToString(value?: Statement): string;
    /**
     * Converts the provided value to a string.
     *
     * @param value Value to convert.
     * @returns Converted value string.
     */
    protected _convertValueToString(value?: string): string;
    /**
     * Converts the provided value to a string.
     *
     * @param value Value to convert.
     * @returns Converted value string.
     */
    protected _convertValueToString(value?: number): string;
    /**
     * Converts the provided value to a string.
     *
     * @param value Value to convert.
     * @returns Converted value string.
     */
    protected _convertValueToString(value?: boolean): string;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    protected _convertValueToString(value?: any): string {
        /* If a Statement has been provided, use its value. */
        if (value instanceof Statement) {
            value = value.value;
        }
        /* Make sure the provided value can be converted. */
        return convertToString(value as string, (e: ConvertToStringError) => {
            switch(e) {
                case ConvertToStringError.InvalidType: throw new Error('Invalid value type provided');
            }
        }, { emptyAllowed: true, trim: false });
    }

    /**
     * Creates a compare Statement with the help of the subclass' _buildCompareString
     * method.
     *
     * @param compareOperator Number provided by the subclass forwarded to _buildCompareString
     *                        to decide what to do with the value.
     * @param value           Value to compare with.
     *
     * @returns Compare Statement.
     */
    protected _compare(compareOperator: number, value?: string): Condition {
        /* Let subclass convert the value to what's needed. */
        value = this._convertValueInternal(value);

        /* Let subclass build the comparison string. */
        const compareString = this._buildCompareString(compareOperator, value);

        /* If _buildCompareString didn't return anything it's expected that
           the compare option was invalid. */
        if (!compareString) {
            throw new Error('Invalid compare operator');
        /* Check if subclass returned string instance. */
        } else if (typeof compareString !== 'string') {
            throw new Error('Returned compare value is not a string');
        }
        return new Condition(compareString);
    }
}
