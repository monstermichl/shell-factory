export enum ConvertToStringError {
    InvalidType,
    EmptyValue,
}

export type ConvertToStringErrorCallback = (e: ConvertToStringError, value?: unknown) => void;
export type ConvertToStringConfig = {
    emptyAllowed?: boolean;
    trim?: boolean;
};

/**
 * Wraps a string in quotes if it contains whitespaces and is not already quoted.
 * 
 * @param s     String to wrap.
 * @param force Always wrap string in quotes.
 *
 * @returns Wrapped string if string containes whitespaces.
 */
export function wrapInQuotes(s: string, force?: boolean): string {
    /* Make sure the provided string is valid. */
    s = convertToString(s, (e: ConvertToStringError) => {
        switch(e) {
            case ConvertToStringError.InvalidType: throw new Error('Variable is not a string');
        }
    }, { emptyAllowed: true });
    
    /* If string contains whitespaces and is not between quotes, put it in quotes. */
    if (s.match(/\s+/) || force) {
        const quoteRegex = /('|`|")/;
        const foundStartQuote = s.match(new RegExp(`^${quoteRegex.source}`))?.[0]; /* Check if string has start-quote. */
        const foundEndQuote = s.match(new RegExp(`(?!=\\\\)${quoteRegex.source}$`))?.[0]; /* Check if string has end-quote. */
        let setStartQuote = foundStartQuote;
        let setEndQuote = foundEndQuote;

        /* If no start-quote and no end-quote, wrap string in quotes. */
        if (!foundStartQuote && !foundEndQuote) {
            setStartQuote = '"';
            setEndQuote = '"';
        } else if (foundStartQuote && !foundEndQuote) { /* If start-quote but no end-quote was found, use start-quote as end-quote. */
            setEndQuote = foundStartQuote;
        } else if (!foundStartQuote && foundEndQuote) { /* If no start-quote but end-quote was found, use end-quote as start-quote. */
            setStartQuote = foundEndQuote;
        } else if (foundStartQuote !== foundEndQuote) { /* If quotes differ use start-quote as end-quote. */
            setEndQuote = foundStartQuote;
        } else {
            /* String already has both quotes. */
            setStartQuote = '';
            setEndQuote = '';
        }
        s = `${setStartQuote}${s}${setEndQuote}`;
    }
    return s;
}

/**
 * Converts a string to a string.
 *
 * @param s             String to convert (nothing happens, this only makes it
 *                      possible to pass a string to the function without
 *                      compile errors).
 * @param errorCallback Callback to execute if an error occurred.
 * @param config        Handling config.
 */
export function convertToString(s: string, errorCallback?: ConvertToStringErrorCallback, config?: ConvertToStringConfig): string;
/**
 * Converts a number to a string.
 *
 * @param n             Number to convert.
 * @param errorCallback Callback to execute if an error occurred.
 * @param config        Handling config.
 */
export function convertToString(n: number, errorCallback?: ConvertToStringErrorCallback, config?: ConvertToStringConfig): string;
/**
 * Converts a boolean to a string.
 *
 * @param b             Boolean to convert.
 * @param errorCallback Callback to execute if an error occurred.
 * @param config        Handling config.
 */
export function convertToString(b: boolean, errorCallback?: ConvertToStringErrorCallback, config?: ConvertToStringConfig): string;
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function convertToString(arg: any, errorCallback?: ConvertToStringErrorCallback, config?: ConvertToStringConfig): string {
    /**
     * Callback helper to ensure callback is only called if it's defined.
     *
     * @param e     Occurred error.
     * @param value Original value.
     */
    function callbackHelper(e: ConvertToStringError, value: unknown) {
        if (errorCallback) {
            errorCallback(e, value);
        }
    }
    const emptyAllowed = config?.emptyAllowed ? config.emptyAllowed : false;
    const trim = (typeof config?.trim === 'boolean') ? config.trim : true;

    /* Make sure arg is neither null nor undefined. Numbers and booleans
       which are considered false are okay. */
    if (![null, undefined].includes(arg)) {
        /* Check if value is actually convertable. */
        if (!['string', 'number', 'bigint', 'boolean'].includes(typeof arg)) {
            callbackHelper(ConvertToStringError.InvalidType, arg);
        } else {
            arg = `${arg}`; /* Convert to string. */
    
            /* Trim if required. */
            if (trim) {
                arg = arg.trim();
            }
        }
    } else {
        arg = ''; /* Make sure, arg is a string. */
    }

    /* Check if value has been provided if required. */
    if (!arg && !emptyAllowed) {
        callbackHelper(ConvertToStringError.EmptyValue, arg);
    }
    return arg;
}

/**
 * Checks if a string is a number.
 *
 * @param s String to check.
 * @returns If s is not a string or not a number,
 *          false is being returned.
 */
export function isNumber(s: unknown): boolean {
    return !!`${s}`.match(/^\d+(\.\d+)?$/);
}
