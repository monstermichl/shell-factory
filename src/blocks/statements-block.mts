import {
    Block, StatementOrBlockOrString,
} from '../base/block.mjs';
import { Statement } from '../base/statement.mjs';

/**
 * Is a helper-class to instantiate a Block object. It is mainly
 * required by classes which need to create a new Block object
 * of no specific type.
 */
export class StatementsBlock extends Block {
    /**
     * StatementsBlock constructor.
     *
     * @param statement StatementsBlock content.
     */
    constructor(statement?: Statement);
    /**
     * StatementsBlock constructor.
     *
     * @param statement StatementsBlock content.
     */
    constructor(statement?: string);
    /**
     * StatementsBlock constructor.
     *
     * @param block StatementsBlock content.
     */
    constructor(block?: Block);
    /**
     * StatementsBlock constructor.
     *
     * @param statements StatementsBlock content.
     */
    constructor(statements?: Statement[]);
    /**
     * StatementsBlock constructor.
     *
     * @param statements StatementsBlock content.
     */
    constructor(statements?: string[]);
    /**
     * StatementsBlock constructor.
     *
     * @param blocks StatementsBlock content.
     */
    constructor(blocks?: Block[]);
    /**
     * StatementsBlock constructor.
     *
     * @param content StatementsBlock content.
     */
    constructor(content?: StatementOrBlockOrString[]);
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    constructor(content?: any) {
        super(content);
    }
}
