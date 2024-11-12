import { Statement } from '../base/statement.mjs';
import {
    Variable,
    VariableStatement,
} from '../base/variable.mjs';
import { isNumber } from '../helpers/string.mjs';
import { Subshell } from '../components/subshell/subshell.mjs';
import { Condition } from '../components/condition/condition.mjs';

/**
 * Possible number operations.
 */
enum NumberCompareOptions {
    Equal,
    NotEqual,
    Less,
    LessOrEqual,
    Greater,
    GreateOrEqual,
}

/**
 * Represents a Bourne Shell number variable.
 */
export class NumberVariable extends Variable {
    /**
     * Checks if the variable value and the provided value are equal.
     *
     * @param value Value to compare with.
     * @returns Condition.
     */
    public isEqual(value: Statement): Condition;
    /**
     * Checks if the variable value and the provided value are equal.
     *
     * @param value Value to compare with.
     * @returns Condition.
     */
    public isEqual(value: string): Condition;
    /**
     * Checks if the variable value and the provided value are equal.
     *
     * @param value Value to compare with.
     * @returns Condition.
     */
    public isEqual(value: number): Condition;
    /**
     * Checks if the variable value and the provided value are equal.
     *
     * @param value Value to compare with.
     * @returns Condition.
     */
    public isEqual(value: boolean): Condition;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public isEqual(value: any): Condition {
        return this._compare(NumberCompareOptions.Equal, value || 0);
    }

    /**
     * Checks if the variable value and the provided value are not equal.
     *
     * @param value Value to compare with.
     * @returns Condition.
     */
    public isNotEqual(value: Statement): Condition;
    /**
     * Checks if the variable value and the provided value are not equal.
     *
     * @param value Value to compare with.
     * @returns Condition.
     */
    public isNotEqual(value: string): Condition;
    /**
     * Checks if the variable value and the provided value are not equal.
     *
     * @param value Value to compare with.
     * @returns Condition.
     */
    public isNotEqual(value: number): Condition;
    /**
     * Checks if the variable value and the provided value are not equal.
     *
     * @param value Value to compare with.
     * @returns Condition.
     */
    public isNotEqual(value: boolean): Condition;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public isNotEqual(value: any): Condition {
        return this._compare(NumberCompareOptions.NotEqual, value || 0);
    }

    /**
     * Checks if the variable value is smaller than the provided value.
     *
     * @param value Value to compare with.
     * @returns Condition.
     */
    public isLess(value: Statement): Condition;
    /**
     * Checks if the variable value is smaller than the provided value.
     *
     * @param value Value to compare with.
     * @returns Condition.
     */
    public isLess(value: string): Condition;
    /**
     * Checks if the variable value is smaller than the provided value.
     *
     * @param value Value to compare with.
     * @returns Condition.
     */
    public isLess(value: number): Condition;
    /**
     * Checks if the variable value is smaller than the provided value.
     *
     * @param value Value to compare with.
     * @returns Condition.
     */
    public isLess(value: boolean): Condition;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public isLess(value: any): Condition {
        return this._compare(NumberCompareOptions.Less, value || 0);
    }

    /**
     * Checks if the variable value is smaller or equal the provided value.
     *
     * @param value Value to compare with.
     * @returns Condition.
     */
    public isLessOrEqual(value: Statement): Condition;
    /**
     * Checks if the variable value is smaller or equal the provided value.
     *
     * @param value Value to compare with.
     * @returns Condition.
     */
    public isLessOrEqual(value: string): Condition;
    /**
     * Checks if the variable value is smaller or equal the provided value.
     *
     * @param value Value to compare with.
     * @returns Condition.
     */
    public isLessOrEqual(value: number): Condition;
    /**
     * Checks if the variable value is smaller or equal the provided value.
     *
     * @param value Value to compare with.
     * @returns Condition.
     */
    public isLessOrEqual(value: boolean): Condition;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public isLessOrEqual(value: any): Condition {
        return this._compare(NumberCompareOptions.LessOrEqual, value || 0);
    }

    /**
     * Checks if the variable value is greater than the provided value.
     *
     * @param value Value to compare with.
     * @returns Condition.
     */
    public isGreater(value: Statement): Condition;
    /**
     * Checks if the variable value is greater than the provided value.
     *
     * @param value Value to compare with.
     * @returns Condition.
     */
    public isGreater(value: string): Condition;
    /**
     * Checks if the variable value is greater than the provided value.
     *
     * @param value Value to compare with.
     * @returns Condition.
     */
    public isGreater(value: number): Condition;
    /**
     * Checks if the variable value is greater than the provided value.
     *
     * @param value Value to compare with.
     * @returns Condition.
     */
    public isGreater(value: boolean): Condition;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public isGreater(value: any): Condition {
        return this._compare(NumberCompareOptions.Greater, value || 0);
    }

    /**
     * Checks if the variable value is greater or equal the provided value.
     *
     * @param value Value to compare with.
     * @returns Condition.
     */
    public isGreaterOrEqual(value: Statement): Condition;
    /**
     * Checks if the variable value is greater or equal the provided value.
     *
     * @param value Value to compare with.
     * @returns Condition.
     */
    public isGreaterOrEqual(value: string): Condition;
    /**
     * Checks if the variable value is greater or equal the provided value.
     *
     * @param value Value to compare with.
     * @returns Condition.
     */
    public isGreaterOrEqual(value: number): Condition;
    /**
     * Checks if the variable value is greater or equal the provided value.
     *
     * @param value Value to compare with.
     * @returns Condition.
     */
    public isGreaterOrEqual(value: boolean): Condition;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public isGreaterOrEqual(value: any): Condition {
        return this._compare(NumberCompareOptions.GreateOrEqual, value || 0);
    }

    /**
     * Adds the specified value to the variable.
     *
     * @param value Value to add. If no value is being
     *              provided, 0 will be added.
     *
     * @returns Add Statement.
     */
    public add(value: number): Condition;
    /**
     * Adds the specified value to the variable.
     *
     * @param value Value to add. If no value is being
     *              provided, 0 will be added.
     *
     * @returns Add Statement.
     */
    public add(value: string): Statement;
    /**
     * Adds the specified value to the variable.
     *
     * @param value Value to add. If no value is being
     *              provided, 0 will be added.
     *
     * @returns Add Statement.
     */
    public add(value: Statement): Statement;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public add(value: any): Statement {
        return this._arithmetic(this.value, '+', value || 0);
    }

    /**
     * Subtracts the specified value from the variable.
     *
     * @param value Value to subtract. If no value is being
     *              provided, 0 will be subtracted.
     *
     * @returns Subtract Statement.
     */
    public subtract(value: number): Statement;
    /**
     * Subtracts the specified value from the variable.
     *
     * @param value Value to subtract. If no value is being
     *              provided, 0 will be subtracted.
     *
     * @returns Subtract Statement.
     */
    public subtract(value: string): Statement;
    /**
     * Subtracts the specified value from the variable.
     *
     * @param value Value to subtract. If no value is being
     *              provided, 0 will be subtracted.
     *
     * @returns Subtract Statement.
     */
    public subtract(value: Statement): Statement;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public subtract(value: any): Statement {
        return this._arithmetic(this.value, '-', value || 0);
    }

    /**
     * Multiplies the variable with the provided value.
     *
     * @param value Value to multiply with. If no value is
     *              being provided, variable will be
     *              multiplied with 0.
     *
     * @returns Multiply Statement.
     */
    public multiply(value: number): Statement;
    /**
     * Multiplies the variable with the provided value.
     *
     * @param value Value to multiply with. If no value is
     *              being provided, variable will be
     *              multiplied with 0.
     *
     * @returns Multiply Statement.
     */
    public multiply(value: string): Statement;
    /**
     * Multiplies the variable with the provided value.
     *
     * @param value Value to multiply with. If no value is
     *              being provided, variable will be
     *              multiplied with 0.
     *
     * @returns Multiply Statement.
     */
    public multiply(value: Statement): Statement;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public multiply(value: any): Statement {
        return this._arithmetic(this.value, '*', value || 0);
    }

    /**
     * Divides the variable by the provided value.
     *
     * @param value Value to divide with. If no value is
     *              being provided, variable will be
     *              divided by 1.
     *
     * @returns Divide Statement.
     */
    public divide(value: number): Statement;
    /**
     * Divides the variable by the provided value.
     *
     * @param value Value to divide with. If no value is
     *              being provided, variable will be
     *              divided by 1.
     *
     * @returns Divide Statement.
     */
    public divide(value: string): Statement;
    /**
     * Divides the variable by the provided value.
     *
     * @param value Value to divide with. If no value is
     *              being provided, variable will be
     *              divided by 1.
     *
     * @returns Divide Statement.
     */
    public divide(value: Statement): Statement;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public divide(value: any): Statement {
        if (isNumber(value) && value == 0) {
            throw new Error('Division by 0 is not a good idea');
        }
        return this._arithmetic(this.value, '/', value || 1);
    }

    /**
     * Calculates the modulo of the variable with the provided value.
     *
     * @param value Value to calculate modulo with. If no value is
     *              being provided, modulo 1 will be used.
     *
     * @returns Modulo Statement.
     */
    public modulo(value: number): Statement;
    /**
     * Calculates the modulo of the variable with the provided value.
     *
     * @param value Value to calculate modulo with. If no value is
     *              being provided, modulo 1 will be used.
     *
     * @returns Modulo Statement.
     */
    public modulo(value: string): Statement;
    /**
     * Calculates the modulo of the variable with the provided value.
     *
     * @param value Value to calculate modulo with. If no value is
     *              being provided, modulo 1 will be used.
     *
     * @returns Modulo Statement.
     */
    public modulo(value: Statement): Statement;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public modulo(value: any): Statement {
        return this._arithmetic(this.value, '%', value || 1);
    }

    /**
     * Increments the variable by 1.
     *
     * @returns Increment Statement.
     */
    public increment(): Statement;
    /**
     * Increments the variable by 1.
     *
     * @returns Increment Statement.
     */
    public increment(): Statement;
    /**
     * Increments the variable by 1.
     *
     * @returns Increment Statement.
     */
    public increment(): Statement;
    /**
     * Increments the variable by 1.
     *
     * @returns Increment Statement.
     */
    public increment(): Statement;
    public increment(): Statement {
        return this.add(1);
    }

    /**
     * Decrements the variable by 1.
     *
     * @returns Decrement Statement.
     */
    public decrement(): Statement;
    /**
     * Decrements the variable by 1.
     *
     * @returns Decrement Statement.
     */
    public decrement(): Statement;
    /**
     * Decrements the variable by 1.
     *
     * @returns Decrement Statement.
     */
    public decrement(): Statement;
    /**
     * Decrements the variable by 1.
     *
     * @returns Decrement Statement.
     */
    public decrement(): Statement;
    public decrement(): Statement {
        return this.subtract(1);
    }

    /**
     * Creates the compare string based on the compare operator, the
     * value and the variable.
     *
     * @param compareOperator Specifies how the values shall be compared.
     * @param value           Value to compare with.
     *
     * @returns Compare string.
     */
    protected _buildCompareString(compareOperator: NumberCompareOptions, value: string): string {
        const preparedVariable = this.value;
        let compareString: string;

        switch(compareOperator) {
            case NumberCompareOptions.Equal: compareString = `${preparedVariable} -eq ${value}`; break;
            case NumberCompareOptions.NotEqual: compareString = `${preparedVariable} -ne ${value}`; break;
            case NumberCompareOptions.Less: compareString = `${preparedVariable} -lt ${value}`; break;
            case NumberCompareOptions.LessOrEqual: compareString = `${preparedVariable} -le ${value}`; break;
            case NumberCompareOptions.Greater: compareString = `${preparedVariable} -gt ${value}`; break;
            case NumberCompareOptions.GreateOrEqual: compareString = `${preparedVariable} -ge ${value}`; break;
        }
        return compareString;
    }

    /**
     * If the value is undefined, 0 is returned. Otherwise, no conversion
     * is applied.
     *
     * @param value Value string.
     * @returns The provided value or 0.
     */
    protected _convertValue(value?: string): string {
        return `${value || 0}`;
    }

    /**
     * Creates and arithmetic operation Statement.
     *
     * @param leftSide  Left-side operand.
     * @param operator  Operator.
     * @param rightSide Right-side operand.
     *
     * @returns Operation Statement.
     */
    private _arithmetic(leftSide: number, operator: string, rightSide: string): Statement;
    /**
     * Creates and arithmetic operation Statement.
     *
     * @param leftSide  Left-side operand.
     * @param operator  Operator.
     * @param rightSide Right-side operand.
     *
     * @returns Operation Statement.
     */
    private _arithmetic(leftSide: string, operator: string, rightSide: number): Statement;
    /**
     * Creates and arithmetic operation Statement.
     *
     * @param leftSide  Left-side operand.
     * @param operator  Operator.
     * @param rightSide Right-side operand.
     *
     * @returns Operation Statement.
     */
    private _arithmetic(leftSide: number, operator: string, rightSide: number): Statement;
    /**
     * Creates and arithmetic operation Statement.
     *
     * @param leftSide  Left-side operand.
     * @param operator  Operator.
     * @param rightSide Right-side operand.
     *
     * @returns Operation Statement.
     */
    private _arithmetic(leftSide: string, operator: string, rightSide: string): Statement;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    private _arithmetic(leftSide: any, operator: string, rightSide: any): Statement {
        const checkType = (type: string) => ['number', 'string'].includes(type);
        const throwTypeError = (what: string) => { throw new Error(`Invalid type of ${what}`); };

        /* Make sure all components are valid. */
        if (!checkType(typeof leftSide)) {
            throwTypeError('left operand');
        } else if (!checkType(typeof rightSide)) {
            throwTypeError('right operand');
        } else if (!checkType(typeof operator)) {
            throwTypeError('operator');
        }
        return new VariableStatement(Subshell.call(`expr ${leftSide} ${operator} ${rightSide}`).eval());
    }
}
