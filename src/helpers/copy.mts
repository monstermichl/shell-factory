/**
 * Deep copies one object or list to another one. If the target
 * already contains a key or (in case of a list) a value, it can
 * be overwritten with the overwrite parameter.
 *
 * @param target    Target object or list.
 * @param source    Source object or list.
 * @param overwrite Overwrite existing keys or values (in case of a list).
 */
export function copyOver(target: Record<string, unknown> | [], source: Record<string, unknown> | [], overwrite: boolean): void {
    /* Check preconditions. */
    ([
        { object: source, description: 'source' },
        { object: target, description: 'target' },
    ] as {object: unknown, description: string}[]).forEach((entry) => {
        if (!entry.object) {
            /* No object was provided. */
            throw new Error(`No ${entry.description.charAt(0).toLowerCase()}${entry.description.substring(1).toLowerCase()} object provided`);
        } else if (!(entry.object instanceof Object) && !(entry.object instanceof Array))  {
            /* Provided data is neither an object, nor an array. */
            throw new Error(`${entry.description.charAt(1).toLowerCase()}${entry.description.substring(1).toLowerCase()} is neither an object, nor an array`);
        }
    });

    /* Check if source and target types are equal. */
    if (typeof target !== typeof source) {
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
 * @param target    Target list.
 * @param source    Source list.
 * @param overwrite Overwrite existing values.
 */
function _copyOverList(target: unknown[], source: unknown[], overwrite: boolean): void {
    source.forEach((value: unknown) => {
        const index = target.findIndex((currentValue) => currentValue === value);
        const valueIncluded = (index >= 0);

        if (!valueIncluded || overwrite) {
            let valueHelper: unknown;

            /* If value is object or array, call copyOver recursively. */
            if (value instanceof Object) {
                valueHelper = valueIncluded ? target[index] : {};
                copyOver(valueHelper as Record<string, unknown>, value as Record<string, unknown>, overwrite);
            } else if (value instanceof Array) {
                valueHelper = valueIncluded ? target[index] : [];
                copyOver(valueHelper as [], value as [], overwrite);
            } else {
                valueHelper = value;
            }

            /* Overwrite list index or push to list. */
            if (valueIncluded) {
                target[index] = valueHelper;
            } else {
                target.push(valueHelper);
            }
        }
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
            let valueHelper: unknown;
            
            /* If value is object or array, call copyOver recursively. */
            if (value instanceof Object) {
                valueHelper = keyIncluded ? target[key] : {};
                copyOver(valueHelper as Record<string, unknown>, value as Record<string, unknown>, overwrite);
            } else if (value instanceof Array) {
                valueHelper = keyIncluded ? target[key] : [];
                copyOver(valueHelper as [], value as [], overwrite);
            } else {
                valueHelper = value;
            }
            target[key] = valueHelper;
        }
    });
}
