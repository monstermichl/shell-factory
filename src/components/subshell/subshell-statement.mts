import { Statement } from '../../base/statement.mjs';
import { IEvaluable } from '../../interfaces/evaluable.mjs';
import { EvalSubshellStatement } from './eval-subshell-statement.mjs';
import { SubshellBaseStatement } from './subshell-base-statement.mjs';

/**
 * Represents a subshell statement.
 */
export class SubshellStatement extends SubshellBaseStatement implements IEvaluable {
    /**
     * SubshellStatement constructor.
     *
     * @param statement Subshell value.
     */
    constructor(statement: string);
    /**
     * SubshellStatement constructor.
     *
     * @param statement     Subshell value.
     */
    constructor(statement: Statement);
    /**
     * SubshellStatement constructor.
     *
     * @param statement Subshell value.
     */
    constructor(statement: number);
    /**
     * SubshellStatement constructor.
     *
     * @param statement Subshell value.
     */
    constructor(statement: boolean);
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public constructor(statement: any) {
        super('', statement);
    }

    public eval(): EvalSubshellStatement {
        return new EvalSubshellStatement(this._content);
    }
}
