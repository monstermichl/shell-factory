/**
 * Internal helper class for ID/statement-pattern evaluation.
 */
export class IdOrPatternEvaluationResult {
    isId: boolean;
    regex: RegExp;
}

/**
 * Checks if the provided string/RegExp is a UUID or a pattern to look for.
 *
 * @param idOrPattern UUID or pattern to look for.
 * @returns IdOrPatternEvaluationResult
 */
export function evaluateIdOrPattern(idOrPattern: string | RegExp): IdOrPatternEvaluationResult {
    let result: IdOrPatternEvaluationResult;

    /* Make sure an ID or pattern has been provided. */
    if (!idOrPattern) {
        throw new Error('No ID or pattern provided');
    }

    /* If string has been provided convert it to a RegExp. */
    if (typeof idOrPattern === 'string') {
        idOrPattern = new RegExp(idOrPattern);
    }

    /* Make sure a RegExp has been provided or the provided string has
        been converted to a RegExp for easier further processing. */
    if (idOrPattern instanceof RegExp) {
        const uuidPattern = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/; /* RegEx taken from https://ihateregex.io/expr/uuid/. */
        result = new IdOrPatternEvaluationResult();

        result.isId = !!idOrPattern.source.match(uuidPattern); /* Check if RegExp source matches UUID pattern. */
        result.regex = idOrPattern;
    } else {
        throw new Error('Invalid ID or pattern type');
    }
    return result;
}
