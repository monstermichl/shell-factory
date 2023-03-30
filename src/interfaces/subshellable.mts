import { SubshellBlock } from '../components/subshell/subshell-block.mjs';
import { SubshellStatement } from '../components/subshell/subshell-statement.mjs';

/**
 * A class that implements this interface returns an subshell-statement
 * or -block (e.g., (echo "Hello")).
 */
export interface ISubshellable {
    /**
     * Returns a subshell.
     *
     * @returns SubshellBlock.
     */
    subshell(): SubshellStatement | SubshellBlock;
}
