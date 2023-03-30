import { EvalSubshellBlock } from '../components/subshell/eval-subshell-block.mjs';
import { EvalSubshellStatement } from '../components/subshell/eval-subshell-statement.mjs';

/**
 * A class that implements this interface returns an evaluation-statement
 * or -block (e.g., $(echo "Hello")).
 */
export interface IEvaluable {
    /**
     * Returns an evaluation-subshell to evaluate the content.
     *
     * @returns EvalSubshellBlock or EvalSubshellStatement.
     */
    eval(): EvalSubshellBlock | EvalSubshellStatement;
}
