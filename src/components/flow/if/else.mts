import { Statement } from '../../../base/statement.mjs';
import {
    Block,
    StatementOrBlockOrString,
} from '../../../base/block.mjs';
import { WrapBlock } from '../../../blocks/wrap-block.mjs';

/**
 * Represents a Bourne Shell else-block.
 */
export class Else extends WrapBlock {
    /**
     * Else constructor.
     *
     * @param statement Else-block content.
     */
    constructor(statement?: Statement);
    /**
     * Else constructor.
     *
     * @param statement Else-block content.
     */
    constructor(statement?: string);
    /**
     * Else constructor.
     *
     * @param block Else-block content.
     */
    constructor(block?: Block);
    /**
     * Else constructor.
     *
     * @param statements Else-block content.
     */
    constructor(statements?: Statement[]);
    /**
     * Else constructor.
     *
     * @param statements Else-block content.
     */
    constructor(statements?: string[]);
    /**
     * Else constructor.
     *
     * @param blocks Else-block content.
     */
    constructor(blocks?: Block[]);
    /**
     * Else constructor.
     *
     * @param content Else-block content.
     */
    constructor(content?: StatementOrBlockOrString[]);
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    constructor(content?: any) {
        super('else', content);
    }
}
