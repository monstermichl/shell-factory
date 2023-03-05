/**
 * Deep copies one object or list to another one. If the target
 * already contains a key or (in case of a list) a value, it can
 * be overwritten with the overwrite parameter.
 *
 * @param target    Target object or list.
 * @param source    Source object or list.
 * @param overwrite Overwrite existing keys or values (in case of a list).
 */
export function copyOver(target: Record<string, unknown> | unknown[], source: Record<string, unknown> | unknown[], overwrite=false): void {
    /* Check preconditions. */
    ([
        { object: source, description: 'source' },
        { object: target, description: 'target' },
    ] as {object: unknown, description: string}[]).forEach((entry) => {
        if (!entry.object) {
            /* No object was provided. */
            throw new Error(`No ${entry.description.charAt(0).toLowerCase()}${entry.description.substring(1).toLowerCase()} object provided`);
        } else if (!(entry.object instanceof Array) && !(entry.object instanceof Object))  {
            /* Provided data is neither an object, nor an array. */
            throw new Error(`${entry.description.charAt(0).toUpperCase()}${entry.description.substring(1).toLowerCase()} is neither an object nor an array`);
        }
    });

    /* Check if source and target types are equal. */
    if (target.constructor !== source.constructor) {
        throw new Error('Source and target type do not match');
    }

    /* Deep copy source over to target. */
    if (target instanceof Array) {
        _copyOverList(target, source as [], overwrite);
    } else {
        _copyOverObject(target, source as Record<string, unknown>, overwrite);
    }
}

/**
 * Deep copies one list to another one. If the target a value,
 * it can be overwritten with the overwrite parameter.
 *
 * @param target Target list.
 * @param source Source list.
 */
function _copyOverList(target: unknown[], source: unknown[], overwrite: boolean): void {
    source.forEach((value: unknown) => {
        let valueHelper: unknown;

        /* If value is object or list, call copyOver recursively. */
        if (value instanceof Array) {
            valueHelper = [];
            copyOver(valueHelper as [], value as [], overwrite);
        } else if (value instanceof Object) {
            valueHelper = {};
            copyOver(valueHelper as Record<string, unknown>, value as Record<string, unknown>, overwrite);
        } else {
            valueHelper = value;
        }
        target.push(valueHelper);
    });
}

/**
 * Deep copies one object to another one. If the target already contains
 * a key, it can be overwritten with the overwrite parameter.
 *
 * @param target    Target object.
 * @param source    Source object.
 * @param overwrite Overwrite existing keys.
 */
function _copyOverObject(target: Record<string, unknown>, source: Record<string, unknown>, overwrite: boolean): void {
    Object.entries(source).forEach(([key, value]) => {
        const keyIncluded = Object.keys(target).includes(key);

        if (!keyIncluded || overwrite) {
            let valueHelper = (keyIncluded && (target[key].constructor === value.constructor)) ? target[key] : null;
            
            /* If value is object or list, call copyOver recursively. */
            if (value instanceof Array) {
                valueHelper = valueHelper || [];
                copyOver(valueHelper as [], value as [], overwrite);
            } else if (value instanceof Object) {
                valueHelper = valueHelper || {};
                copyOver(valueHelper as Record<string, unknown>, value as Record<string, unknown>, overwrite);
            } else {
                valueHelper = value;
            }
            target[key] = valueHelper;
        }
    });
}
