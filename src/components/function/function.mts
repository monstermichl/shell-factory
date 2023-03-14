import { WrapBlock } from '../../blocks/wrap-block.mjs';
import { Statement } from '../../base/statement.mjs';
import {
    Block,
    StatementOrBlockOrString,
} from '../../base/block.mjs';

/**
 * Represents a Bourne Shell function-block.
 */
export class Function extends WrapBlock {
    /**
     * Function constructor.
     *
     * @param name Function name.
     * @param statement Function content.
     */
    public constructor(name: string, statement?: Statement);
    /**
     * Function constructor.
     *
     * @param name Function name.
     * @param statement Function content.
     */
    public constructor(name: string, statement?: string);
    /**
     * Function constructor.
     *
     * @param name Function name.
     * @param block Function content.
     */
    public constructor(name: string, block?: Block);
    /**
     * Function constructor.
     *
     * @param name Function name.
     * @param statements Function content.
     */
    public constructor(name: string, statements?: Statement[]);
    /**
     * Function constructor.
     *
     * @param name Function name.
     * @param statements Function content.
     */
    public constructor(name: string, statements?: string[]);
    /**
     * Function constructor.
     *
     * @param name Function name.
     * @param blocks Function content.
     */
    public constructor(name: string, blocks?: Block[]);
    /**
     * Function constructor.
     *
     * @param name Function name.
     * @param content Function content.
     */
    public constructor(name: string, content?: StatementOrBlockOrString[]);
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public constructor(name: string, content?: any) {
        if (!name) {
            throw new Error('Missing function name');
        }
        name = name.trim(); /* Trim whitespaces. */

        /* Check if function name matches rules. */
        if (!name.match(/^(_|[a-zA-^])+\w+$/)) {
            throw new Error('Invalid function name');
        }
        super(`${name}() {`, content, '}');
    }
}
