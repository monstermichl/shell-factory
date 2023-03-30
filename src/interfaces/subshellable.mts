import { SubshellBlock } from '../components/subshell/subshell-block.mjs';
import { SubshellStatement } from '../components/subshell/subshell-statement.mjs';

export interface ISubshellable {
    /**
     * Returns a subshell.
     *
     * @returns SubshellBlock.
     */
    subshell(): SubshellStatement | SubshellBlock;
}
