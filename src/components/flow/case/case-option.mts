import { WrapBlock } from '../../../blocks/wrap-block.mjs';
import { Statement } from '../../../base/statement.mjs';
import {
    Block,
    StatementOrBlockOrString,
} from '../../../base/block.mjs';

/**
 * Marks the end of a CaseOption block.
 */
class CaseOptionTerminator extends Block {
    constructor() {
        super(';;');
    }
}

/**
 * Represents a single case of a CaseBlock.
 */
export class CaseOption extends WrapBlock {
    private _pattern: string;

    /**
     * CaseOption constructor.
     *
     * @param pattern Pattern to compare the case variable to.
     * @param statement Content of the case.
     */
    public constructor(pattern: string, statement?: Statement);
    /**
     * CaseOption constructor.
     *
     * @param pattern Pattern to compare the case variable to.
     * @param statement Content of the case.
     */
    public constructor(pattern: string, statement?: string);
    /**
     * CaseOption constructor.
     *
     * @param pattern Pattern to compare the case variable to.
     * @param block Content of the case.
     */
    public constructor(pattern: string, block?: Block);
    /**
     * CaseOption constructor.
     *
     * @param pattern Pattern to compare the case variable to.
     * @param statements Content of the case.
     */
    public constructor(pattern: string, statements?: Statement[]);
    /**
     * CaseOption constructor.
     *
     * @param pattern Pattern to compare the case variable to.
     * @param statements Content of the case.
     */
    public constructor(pattern: string, statements?: string[]);
    /**
     * CaseOption constructor.
     *
     * @param pattern Pattern to compare the case variable to.
     * @param blocks Content of the case.
     */
    public constructor(pattern: string, blocks?: Block[]);
    /**
     * CaseOption constructor.
     *
     * @param pattern Pattern to compare the case variable to.
     * @param content Content of the case.
     */
    public constructor(pattern: string, content?: StatementOrBlockOrString[]);
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public constructor(pattern: string, content?: any) {
        if (!pattern) {
            throw new Error('Missing pattern');
        }
        pattern = `${pattern}`;

        /* If pattern contains whitespaces, put it in quotes. */
        if (pattern.match(/\s+/)) {
            pattern = `"${pattern}"`;
        }
        super(`${pattern})`, content);
        this._addContent(new CaseOptionTerminator());
        this._pattern = pattern;
    }

    /**
     * Returns the option pattern.
     */
    public get pattern(): string {
        return this._pattern;
    }
}
