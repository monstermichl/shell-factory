import { Statement } from '../../base/statement.mjs';
import {
    Block,
    StatementOrBlockOrString,
} from '../../base/block.mjs';
import { SubshellBaseBlock } from './subshell-base-block.mjs';

/**
 * Represents a subshell block which's return value can be assigned.
 */
export class EvalSubshellBlock extends SubshellBaseBlock {
    /**
     * EvalSubshellBlock constructor.
     *
     * @param block EvalSubshell content.
     */
    public constructor(block: Block);
    /**
     * EvalSubshellBlock constructor.
     *
     * @param statements EvalSubshell content.
     */
    public constructor(statements: Statement[]);
    /**
     * EvalSubshellBlock constructor.
     *
     * @param statements EvalSubshell content.
     */
    public constructor(statements: string[]);
    /**
     * EvalSubshellBlock constructor.
     *
     * @param blocks EvalSubshell content.
     */
    public constructor(blocks: Block[]);
    /**
     * EvalSubshellBlock constructor.
     *
     * @param content EvalSubshell content.
     */
    public constructor(content: StatementOrBlockOrString[]);
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public constructor(content: any) {
        super('$', content);
    }
}
