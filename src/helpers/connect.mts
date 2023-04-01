import { LogicalConnectType } from '../interfaces/logically-connectable.mjs';
import { OperationalConnectType } from '../interfaces/operationally-connectable.mjs';

const allConnectTypes = [OperationalConnectType, LogicalConnectType];

/**
 * Checks if the provided argument is a OperationalConnectType or
 * a LogicalConnectType value.
 *
 * @param arg Value to check.
 * @returns True if valid value.
 */
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function isAnyConnectType(arg: any): boolean {
    return !!allConnectTypes.find((type) => Object.values(type).includes(arg));
}
