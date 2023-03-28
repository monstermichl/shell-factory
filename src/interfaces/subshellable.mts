import {
    SubshellBlock,
    SubshellStatement,
} from '../components/subshell/subshell.mjs';

export interface ISubshellable {
    /**
     * Returns a subshell.
     *
     * @returns SubshellBlock.
     */
    subshell(): SubshellStatement | SubshellBlock;
}
