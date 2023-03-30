import { Statement } from '../../base/statement.mjs';
import {
    Block,
    StatementOrBlockOrString,
} from '../../base/block.mjs';
import { EvalSubshellBlock } from './eval-subshell-block.mjs';
import { EvalSubshellStatement } from './eval-subshell-statement.mjs';
import { SubshellStatement } from './subshell-statement.mjs';
import { SubshellBlock } from './subshell-block.mjs';

export class Subshell {
    private constructor() {
        /* Nothing to do. Just hide the constructor. */
    }

    /**
     * Creates a block subshell.
     *
     * @param block Subshell content.
     * @returns SubshellBlock instance.
     */
    public static call(block: Block): SubshellBlock;
    /**
     * Creates a block subshell.
     *
     * @param statements Subshell content.
     * @returns SubshellBlock instance.
     */
    public static call(statements: Statement[]): SubshellBlock;
    /**
     * Creates a block subshell.
     *
     * @param statements Subshell content.
     * @returns SubshellBlock instance.
     */
    public static call(statements: string[]): SubshellBlock;
    /**
     * Creates a block subshell.
     *
     * @param blocks Subshell content.
     * @returns SubshellBlock instance.
     */
    public static call(blocks: Block[]): SubshellBlock;
    /**
     * Creates a block subshell.
     *
     * @param content Subshell content.
     * @returns SubshellBlock instance.
     */
    public static call(content: StatementOrBlockOrString[]): SubshellBlock;
    /**
     * Creates a statement subshell.
     *
     * @param statement Subshell content.
     * @returns SubshellStatement instance.
     */
    public static call(statement: string): SubshellStatement;
    /**
     * Creates a statement subshell.
     *
     * @param statement Subshell content.
     * @returns SubshellStatement instance.
     */
    public static call(statement: Statement): SubshellStatement;
    /**
     * Creates a statement subshell.
     *
     * @param statement Subshell content.
     * @returns SubshellStatement instance.
     */
    public static call(statement: number): SubshellStatement;
    /**
     * Creates a statement subshell.
     *
     * @param statement Subshell content.
     * @returns SubshellStatement instance.
     */
    public static call(statement: boolean): SubshellStatement;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public static call(content: any): SubshellBlock | SubshellStatement {
        let subshell;

        if ((content instanceof Block) || (content instanceof Array)) {
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            subshell = new SubshellBlock(content as any);
        } else {
            subshell = new SubshellStatement(content);
        }
        return subshell;
    }

    /**
     * Creates a block eval-subshell.
     *
     * @param block Subshell content.
     * @returns EvalSubshellBlock instance.
     */
    public static eval(block: Block): EvalSubshellBlock;
    /**
     * Creates a block eval-subshell.
     *
     * @param statements Subshell content.
     * @returns EvalSubshellBlock instance.
     */
    public static eval(statements: Statement[]): EvalSubshellBlock;
    /**
     * Creates a block eval-subshell.
     *
     * @param statements Subshell content.
     * @returns EvalSubshellBlock instance.
     */
    public static eval(statements: string[]): EvalSubshellBlock;
    /**
     * Creates a block eval-subshell.
     *
     * @param blocks Subshell content.
     * @returns EvalSubshellBlock instance.
     */
    public static eval(blocks: Block[]): EvalSubshellBlock;
    /**
     * Creates a block eval-subshell.
     *
     * @param content Subshell content.
     * @returns EvalSubshellBlock instance.
     */
    public static eval(content: StatementOrBlockOrString[]): EvalSubshellBlock;
    /**
     * Creates a statement eval-subshell.
     *
     * @param statement Subshell content.
     * @returns EvalSubshellStatement instance.
     */
    public static eval(statement: string): EvalSubshellStatement;
    /**
     * Creates a statement eval-subshell.
     *
     * @param statement Subshell content.
     * @returns EvalSubshellStatement instance.
     */
    public static eval(statement: Statement): EvalSubshellStatement;
    /**
     * Creates a statement eval-subshell.
     *
     * @param statement Subshell content.
     * @returns EvalSubshellStatement instance.
     */
    public static eval(statement: number): EvalSubshellStatement;
    /**
     * Creates a statement eval-subshell.
     *
     * @param statement Subshell content.
     * @returns EvalSubshellStatement instance.
     */
    public static eval(statement: boolean): EvalSubshellStatement;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public static eval(content: any): EvalSubshellBlock | EvalSubshellStatement {
        return Subshell.call(content).eval();
    }
}
