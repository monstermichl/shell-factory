import { EvalSubshellBlock } from '../components/subshell/eval-subshell-block.mjs';
import { EvalSubshellStatement } from '../components/subshell/eval-subshell-statement.mjs';

export interface IEvaluable {
    /**
     * Returns an evaluation-subshell to evaluate the content.
     *
     * @returns EvalSubshellBlock or EvalSubshellStatement.
     */
    eval(): EvalSubshellBlock | EvalSubshellStatement;
}
