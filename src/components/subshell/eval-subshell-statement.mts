import { Statement } from '../../base/statement.mjs';
import { SubshellBaseStatement } from './subshell-base-statement.mjs';

/**
 * Represents a subshell statement which's return value can be assigned.
 */
export class EvalSubshellStatement extends SubshellBaseStatement {
    /**
     * EvalSubshellStatement constructor.
     *
     * @param statement Subshell value.
     */
    constructor(statement: string);
    /**
     * EvalSubshellStatement constructor.
     *
     * @param statement Subshell value.
     */
    constructor(statement: Statement);
    /**
     * EvalSubshellStatement constructor.
     *
     * @param statement Subshell value.
     */
    constructor(statement: number);
    /**
     * EvalSubshellStatement constructor.
     *
     * @param statement Subshell value.
     */
    constructor(statement: boolean);
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public constructor(content: any) {
        super('$', content);
    }
}
