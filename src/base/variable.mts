import {
    convertToString,
    ConvertToStringError,
} from '../helpers/string.mjs';
import { Statement } from './statement.mjs';

/**
 * Helper class to instantiate a simple Statement.
 */
class StatementHelper extends Statement {
    /**
     * Returns the statement.
     */
    public get value(): string {
        return this.statement;
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
     * @param local Specifis if the variable is a local variable.
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
     * @param value Value to set. Must be a Statement, string, number or boolean.
     * @returns Assignment statement.
     */
    public set(value?: Statement): Statement;
    /**
     * Creates an assignment-statement. If the variable is assigned the
     * first time and it's a local variable, the local keyword is put in
     * front.
     * 
     * @param value Value to set. Must be a Statement, string, number or boolean.
     * @returns Assignment statement.
     */
    public set(value?: string): Statement;
    /**
     * Creates an assignment-statement. If the variable is assigned the
     * first time and it's a local variable, the local keyword is put in
     * front.
     * 
     * @param value Value to set. Must be a Statement, string, number or boolean.
     * @returns Assignment statement.
     */
    public set(value?: number): Statement;
    /**
     * Creates an assignment-statement. If the variable is assigned the
     * first time and it's a local variable, the local keyword is put in
     * front.
     * 
     * @param value Value to set. Must be a Statement, string, number or boolean.
     * @returns Assignment statement.
     */
    public set(value?: boolean): Statement;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public set(value?: any): Statement {
        /* Convert value to string. */
        value = this._convertValueInternal(value);

        /* If the variable has not been initialize and is local,
           prepend the 'local' keyword. */
        let prefix = '';
        if (this._local && !this._defined) {
            prefix = 'local ';
            this._defined = true;
        }
        return new StatementHelper(`${prefix}${this.name}=${value}`);
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
    protected _compare(compareOperator: number, value?: string): Statement {
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
        return new StatementHelper(compareString);
    }
}
