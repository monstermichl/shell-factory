import { WrapBlock } from './wrap-block.mjs';
import { ISubshellable } from '../interfaces/subshellable.mjs';
import { EvalSubshellBlock } from '../components/subshell/eval-subshell-block.mjs';
import { SubshellBlock } from '../components/subshell/subshell-block.mjs';

/**
 * Serves as the base for all code parts that somehow change the
 * execution flow and can be executed in a subshell.
 */
export abstract class SubshellableWrapBlock extends WrapBlock implements ISubshellable {
    /**
     * Returns the block in a subshell block.
     *
     * @returns A new SubshellBlock instance.
     */
    public subshell(): SubshellBlock {
        return new SubshellBlock(this);
    }

    /**
     * Returns the block in an evaluation-subshell block.
     *
     * @returns A new EvalSubshellBlock instance.
     */
    public eval(): EvalSubshellBlock {
        return this.subshell().eval();
    }
}
