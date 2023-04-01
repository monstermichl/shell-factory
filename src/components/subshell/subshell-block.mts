import { Block, StatementOrBlockOrString } from '../../base/block.mjs';
import { Statement } from '../../base/statement.mjs';
import { IEvaluable } from '../../interfaces/evaluable.mjs';
import { EvalSubshellBlock } from './eval-subshell-block.mjs';
import { SubshellBaseBlock } from './subshell-base-block.mjs';

/**
 * Represents a subshell block.
 */
export class SubshellBlock extends SubshellBaseBlock implements IEvaluable {
    /**
     * SubshellBlock constructor.
     *
     * @param block Subshell content.
     */
    public constructor(block: Block);
    /**
     * SubshellBlock constructor.
     *
     * @param statements Subshell content.
     */
    public constructor(statements: Statement[]);
    /**
     * SubshellBlock constructor.
     *
     * @param statements Subshell content.
     */
    public constructor(statements: string[]);
    /**
     * SubshellBlock constructor.
     *
     * @param blocks Subshell content.
     */
    public constructor(blocks: Block[]);
    /**
     * SubshellBlock constructor.
     *
     * @param content Subshell content.
     */
    public constructor(content: StatementOrBlockOrString[]);
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public constructor(content: any) {
        super('', content);
    }

    /**
     * Returns a new evaluation-subshell with the content of the subshell.
     *
     * @returns New EvalSubshell instance.
     */
    public eval(): EvalSubshellBlock {
        return new EvalSubshellBlock(this.content);
    }
}
