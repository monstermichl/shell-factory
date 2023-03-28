import { WrapBlock } from '../../blocks/wrap-block.mjs';
import { Statement } from '../../base/statement.mjs';
import {
    Block,
    StatementOrBlockOrString,
} from '../../base/block.mjs';

/**
 * Represents the subshell block base.
 */
export class SubshellBaseBlock extends WrapBlock {
    /**
     * SubshellBaseBlock constructor.
     *
     * @param openingPrefix Subshell opening prefix.
     * @param block         Subshell content.
     */
    public constructor(openingPrefix: string, block: Block);
    /**
     * SubshellBaseBlock constructor.
     *
     * @param openingPrefix Subshell opening prefix.
     * @param statements    Subshell content.
     */
    public constructor(openingPrefix: string, statements: Statement[]);
    /**
     * SubshellBaseBlock constructor.
     *
     * @param openingPrefix Subshell opening prefix.
     * @param statements    Subshell content.
     */
    public constructor(openingPrefix: string, statements: string[]);
    /**
     * SubshellBaseBlock constructor.
     *
     * @param openingPrefix Subshell opening prefix.
     * @param blocks        Subshell content.
     */
    public constructor(openingPrefix: string, blocks: Block[]);
    /**
     * SubshellBaseBlock constructor.
     *
     * @param openingPrefix Subshell opening prefix.
     * @param content       Subshell content.
     */
    public constructor(openingPrefix: string, content: StatementOrBlockOrString[]);
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public constructor(openingPrefix: string, content: any) {
        if (typeof openingPrefix !== 'string') {
            throw new Error('Invalid opening-prefix provided');
        }
        super(`${openingPrefix}(`, content, ')');
    }
}
