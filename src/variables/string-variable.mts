import { Statement } from '../base/statement.mjs';
import {
    Variable,
    VariableStatement,
} from '../base/variable.mjs';
import { wrapInQuotes } from '../helpers/string.mjs';
import { Subshell } from '../components/subshell/subshell.mjs';
import { Command } from '../base/command.mjs';

/**
 * Possible string operations.
 */
enum StringCompareOptions {
    Equal,
    NotEqual,
    Empty,
    NotEmpty,
}

/**
 * Represents a Bourne Shell string variable.
 */
export class StringVariable extends Variable {
    /**
     * Checks if the variable value and the provided value are equal.
     *
     * @param value Value to compare with.
     * @returns Compare Statement.
     */
    public isEqual(value?: Statement): Statement;
    /**
     * Checks if the variable value and the provided value are equal.
     *
     * @param value Value to compare with.
     * @returns Compare Statement.
     */
    public isEqual(value?: string): Statement;
    /**
     * Checks if the variable value and the provided value are equal.
     *
     * @param value Value to compare with.
     * @returns Compare Statement.
     */
    public isEqual(value?: number): Statement;
    /**
     * Checks if the variable value and the provided value are equal.
     *
     * @param value Value to compare with.
     * @returns Compare Statement.
     */
    public isEqual(value?: boolean): Statement;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public isEqual(value?: any): Statement {
        return this._compare(StringCompareOptions.Equal, value);
    }

    /**
     * Checks if the variable value and the provided value are not equal.
     *
     * @param value Value to compare with.
     * @returns Compare Statement.
     */
    public isNotEqual(value?: Statement): Statement;
    /**
     * Checks if the variable value and the provided value are not equal.
     *
     * @param value Value to compare with.
     * @returns Compare Statement.
     */
    public isNotEqual(value?: string): Statement;
    /**
     * Checks if the variable value and the provided value are not equal.
     *
     * @param value Value to compare with.
     * @returns Compare Statement.
     */
    public isNotEqual(value?: number): Statement;
    /**
     * Checks if the variable value and the provided value are not equal.
     *
     * @param value Value to compare with.
     * @returns Compare Statement.
     */
    public isNotEqual(value?: boolean): Statement;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public isNotEqual(value?: any): Statement {
        return this._compare(StringCompareOptions.NotEqual, value);
    }

    /**
     * Checks if the variable value matches the pattern.
     *
     * @param value Pattern to match
     * @returns Pattern statement.
     */
    public matches(value?: Statement): Statement;
    /**
     * Checks if the variable value matches the pattern.
     *
     * @param value Pattern to match
     * @returns Pattern statement.
     */
    public matches(value?: string): Statement;
    /**
     * Checks if the variable value matches the pattern.
     *
     * @param value Pattern to match
     * @returns Pattern statement.
     */
    public matches(value?: number): Statement;
    /**
     * Checks if the variable value matches the pattern.
     *
     * @param value Pattern to match
     * @returns Pattern statement.
     */
    public matches(value?: boolean): Statement;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public matches(value?: any): Statement {
        value = this._convertValueToString(value);
        return new Command(`echo ${wrapInQuotes(this.value, true)}`).pipe(`grep -q -e ${wrapInQuotes(value, true)}`);
    }

    /**
     * Checks if the variable is empty.
     *
     * @returns Compare Statement.
     */
    public get isEmpty(): Statement {
        return this._compare(StringCompareOptions.Empty);
    }

    /**
     * Checks if the variable is not empty.
     *
     * @returns Compare Statement.
     */
    public get isNotEmpty(): Statement {
        return this._compare(StringCompareOptions.NotEmpty);
    }

    /**
     * Returns a length Statement.
     *
     * @returns Length evaluation Statement.
     */
    public get length(): Statement {
        return new VariableStatement(
            Subshell.eval(`expr length "${this.value}"`),
        );
    }

    /**
     * Appends the provided value to the variable value.
     *
     * @param value Value to append.
     * @returns Append Statement.
     */
    public append(value?: Statement): Statement;
    /**
     * Appends the provided value to the variable value.
     *
     * @param value Value to append.
     * @returns Append Statement.
     */
    public append(value?: string): Statement;
    /**
     * Appends the provided value to the variable value.
     *
     * @param value Value to append.
     * @returns Append Statement.
     */
    public append(value?: number): Statement;
    /**
     * Appends the provided value to the variable value.
     *
     * @param value Value to append.
     * @returns Append Statement.
     */
    public append(value?: boolean): Statement;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public append(value?: any): Statement {
        value = this._convertValueToString(value);
        return new VariableStatement(`${this.value}${value}`);
    }

    /**
     * Replaces the search-value in the variable value with the replace-value.
     * As shortcuts for string-replacement (e.g., ${var/foo/hello}) are not
     * available in the Bourne shell, replace is implemented using sed,
     * which according to  https://en.wikipedia.org/wiki/List_of_Unix_commands
     * is a mandatory Unix-utility. This means that the search-value can be a
     * sed-compliant regexp.
     *
     * @param searchValue  Search value.
     * @param replaceValue Replace value.
     * @param all          If true, replace all occurrences.
     *
     * @returns Replace statement.
     */
    public replace(searchValue: Statement, replaceValue: Statement, all?: boolean): Statement;
    /**
     * Replaces the search-value in the variable value with the replace-value.
     * As shortcuts for string-replacement (e.g., ${var/foo/hello}) are not
     * available in the Bourne shell, replace is implemented using sed,
     * which according to  https://en.wikipedia.org/wiki/List_of_Unix_commands
     * is a mandatory Unix-utility. This means that the search-value can be a
     * sed-compliant regexp.
     *
     * @param searchValue  Search value.
     * @param replaceValue Replace value.
     * @param all          If true, replace all occurrences.
     *
     * @returns Replace statement.
     */
    public replace(searchValue: string, replaceValue: Statement, all?: boolean): Statement;
    /**
     * Replaces the search-value in the variable value with the replace-value.
     * As shortcuts for string-replacement (e.g., ${var/foo/hello}) are not
     * available in the Bourne shell, replace is implemented using sed,
     * which according to  https://en.wikipedia.org/wiki/List_of_Unix_commands
     * is a mandatory Unix-utility. This means that the search-value can be a
     * sed-compliant regexp.
     *
     * @param searchValue  Search value.
     * @param replaceValue Replace value.
     * @param all          If true, replace all occurrences.
     *
     * @returns Replace statement.
     */
    public replace(searchValue: number, replaceValue: Statement, all?: boolean): Statement;
    /**
     * Replaces the search-value in the variable value with the replace-value.
     * As shortcuts for string-replacement (e.g., ${var/foo/hello}) are not
     * available in the Bourne shell, replace is implemented using sed,
     * which according to  https://en.wikipedia.org/wiki/List_of_Unix_commands
     * is a mandatory Unix-utility. This means that the search-value can be a
     * sed-compliant regexp.
     *
     * @param searchValue  Search value.
     * @param replaceValue Replace value.
     * @param all          If true, replace all occurrences.
     *
     * @returns Replace statement.
     */
    public replace(searchValue: boolean, replaceValue: Statement, all?: boolean): Statement;
    /**
     * Replaces the search-value in the variable value with the replace-value.
     * As shortcuts for string-replacement (e.g., ${var/foo/hello}) are not
     * available in the Bourne shell, replace is implemented using sed,
     * which according to  https://en.wikipedia.org/wiki/List_of_Unix_commands
     * is a mandatory Unix-utility. This means that the search-value can be a
     * sed-compliant regexp.
     *
     * @param searchValue  Search value.
     * @param replaceValue Replace value.
     * @param all          If true, replace all occurrences.
     *
     * @returns Replace statement.
     */
    public replace(searchValue: Statement, replaceValue: string, all?: boolean): Statement;
    /**
     * Replaces the search-value in the variable value with the replace-value.
     * As shortcuts for string-replacement (e.g., ${var/foo/hello}) are not
     * available in the Bourne shell, replace is implemented using sed,
     * which according to  https://en.wikipedia.org/wiki/List_of_Unix_commands
     * is a mandatory Unix-utility. This means that the search-value can be a
     * sed-compliant regexp.
     *
     * @param searchValue  Search value.
     * @param replaceValue Replace value.
     * @param all          If true, replace all occurrences.
     *
     * @returns Replace statement.
     */
    public replace(searchValue: string, replaceValue: string, all?: boolean): Statement;
    /**
     * Replaces the search-value in the variable value with the replace-value.
     * As shortcuts for string-replacement (e.g., ${var/foo/hello}) are not
     * available in the Bourne shell, replace is implemented using sed,
     * which according to  https://en.wikipedia.org/wiki/List_of_Unix_commands
     * is a mandatory Unix-utility. This means that the search-value can be a
     * sed-compliant regexp.
     *
     * @param searchValue  Search value.
     * @param replaceValue Replace value.
     * @param all          If true, replace all occurrences.
     *
     * @returns Replace statement.
     */
    public replace(searchValue: number, replaceValue: string, all?: boolean): Statement;
    /**
     * Replaces the search-value in the variable value with the replace-value.
     * As shortcuts for string-replacement (e.g., ${var/foo/hello}) are not
     * available in the Bourne shell, replace is implemented using sed,
     * which according to  https://en.wikipedia.org/wiki/List_of_Unix_commands
     * is a mandatory Unix-utility. This means that the search-value can be a
     * sed-compliant regexp.
     *
     * @param searchValue  Search value.
     * @param replaceValue Replace value.
     * @param all          If true, replace all occurrences.
     *
     * @returns Replace statement.
     */
    public replace(searchValue: boolean, replaceValue: string, all?: boolean): Statement;
    /**
     * Replaces the search-value in the variable value with the replace-value.
     * As shortcuts for string-replacement (e.g., ${var/foo/hello}) are not
     * available in the Bourne shell, replace is implemented using sed,
     * which according to  https://en.wikipedia.org/wiki/List_of_Unix_commands
     * is a mandatory Unix-utility. This means that the search-value can be a
     * sed-compliant regexp.
     *
     * @param searchValue  Search value.
     * @param replaceValue Replace value.
     * @param all          If true, replace all occurrences.
     *
     * @returns Replace statement.
     */
    public replace(searchValue: Statement, replaceValue: Statement, all?: boolean): Statement;
    /**
     * Replaces the search-value in the variable value with the replace-value.
     * As shortcuts for string-replacement (e.g., ${var/foo/hello}) are not
     * available in the Bourne shell, replace is implemented using sed,
     * which according to  https://en.wikipedia.org/wiki/List_of_Unix_commands
     * is a mandatory Unix-utility. This means that the search-value can be a
     * sed-compliant regexp.
     *
     * @param searchValue  Search value.
     * @param replaceValue Replace value.
     * @param all          If true, replace all occurrences.
     *
     * @returns Replace statement.
     */
    public replace(searchValue: string, replaceValue: string, all?: boolean): Statement;
    /**
     * Replaces the search-value in the variable value with the replace-value.
     * As shortcuts for string-replacement (e.g., ${var/foo/hello}) are not
     * available in the Bourne shell, replace is implemented using sed,
     * which according to  https://en.wikipedia.org/wiki/List_of_Unix_commands
     * is a mandatory Unix-utility. This means that the search-value can be a
     * sed-compliant regexp.
     *
     * @param searchValue  Search value.
     * @param replaceValue Replace value.
     * @param all          If true, replace all occurrences.
     *
     * @returns Replace statement.
     */
    public replace(searchValue: number, replaceValue: number, all?: boolean): Statement;
    /**
     * Replaces the search-value in the variable value with the replace-value.
     * As shortcuts for string-replacement (e.g., ${var/foo/hello}) are not
     * available in the Bourne shell, replace is implemented using sed,
     * which according to  https://en.wikipedia.org/wiki/List_of_Unix_commands
     * is a mandatory Unix-utility. This means that the search-value can be a
     * sed-compliant regexp.
     *
     * @param searchValue  Search value.
     * @param replaceValue Replace value.
     * @param all          If true, replace all occurrences.
     *
     * @returns Replace statement.
     */
    public replace(searchValue: boolean, replaceValue: boolean, all?: boolean): Statement;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public replace(searchValue: any, replaceValue: any, all=false): Statement {
        searchValue = this._convertValueToString(searchValue);
        replaceValue = this._convertValueToString(replaceValue);

        /* Echo string value into sed to perform replacement. TODO: Use different
           separator if string contains slash. */
        return new VariableStatement(
            Subshell.eval(`echo "${this.value}" | sed "s/${searchValue}/${replaceValue}/${all ? 'g': ''}"`),
        );
    }

    /**
     * Returns a sub-part of the variable string.
     *
     * @param start  Start position in the original string (0-based).
     * @param length Substring length.
     *
     * @returns Substring Statement.
     */
    public substring(start?: number, length?: number): Statement {
        const isNothing = (value?: number) => [null, undefined].includes(value);
        /* Make sure the provided values are ok. */
        const validateValue = (value?: number): string => {
            if (isNothing(value)) {
                /* If value null or undefined, correct value later. */
            } else if (!Number.isInteger(value)) {
                throw new Error('Value is not a number');
            } else if (value < 0) {
                throw new Error('Invalid value');
            }
            return `${value}`;
        };

        /* Validate values. */
        validateValue(start);
        validateValue(length);

        /* Set start if undefined. */
        if (isNothing(start)) {
            start = 0;
        }

        /* Evaluate length string. */
        const lengthString = isNothing(length) ? this.length.value : length;

        /* Add 1 to start since position is 1-based. */
        start++;

        /* FYI: There might be a better solution than using expr. */
        return new VariableStatement(Subshell.eval(`expr substr "${this.value}" ${start} ${lengthString}`));
    }

    /**
     * Creates the compare string based on the compare operator, the
     * value and the variable.
     *
     * @param compareOperator Specifies how the values shall be compared.
     * @param value           Value to compare with.
     *
     * @returns Compare Statement.
     */
    protected _buildCompareString(compareOperator: StringCompareOptions, value: string): string {
        const preparedVariable = wrapInQuotes(this.value, true);
        let compareString: string;

        switch(compareOperator) {
            case StringCompareOptions.Equal: compareString = `${preparedVariable} = ${value}`; break;
            case StringCompareOptions.NotEqual: compareString = `${preparedVariable} != ${value}`; break;
            case StringCompareOptions.Empty: compareString = `-z ${preparedVariable}`; break;
            case StringCompareOptions.NotEmpty: compareString = `-n ${preparedVariable}`; break;
        }
        return compareString;
    }

    /**
     * Converts the provided value to a quote-wrapped string.
     *
     * @param value Value string.
     * @returns Quote-wrapped string.
     */
    protected _convertValue(value?: string): string {
        return wrapInQuotes(value || '', true);
    }
}
