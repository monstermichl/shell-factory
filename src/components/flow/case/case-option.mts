import { WrapBlock } from '../../../blocks/wrap-block.mjs';
import { Statement } from '../../../base/statement.mjs';
import {
    Block,
    StatementOrBlockOrString,
} from '../../../base/block.mjs';
import {
    convertToString,
    ConvertToStringError,
    wrapInQuotes,
} from '../../../helpers/string.mjs';

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
     * @param pattern   Pattern to compare the case variable to.
     * @param statement Content of the case.
     */
    public constructor(pattern: string, statement?: Statement);
    /**
     * CaseOption constructor.
     *
     * @param pattern   Pattern to compare the case variable to.
     * @param statement Content of the case.
     */
    public constructor(pattern: string, statement?: string);
    /**
     * CaseOption constructor.
     *
     * @param pattern Pattern to compare the case variable to.
     * @param block   Content of the case.
     */
    public constructor(pattern: string, block?: Block);
    /**
     * CaseOption constructor.
     *
     * @param pattern    Pattern to compare the case variable to.
     * @param statements Content of the case.
     */
    public constructor(pattern: string, statements?: Statement[]);
    /**
     * CaseOption constructor.
     *
     * @param pattern    Pattern to compare the case variable to.
     * @param statements Content of the case.
     */
    public constructor(pattern: string, statements?: string[]);
    /**
     * CaseOption constructor.
     *
     * @param pattern Pattern to compare the case variable to.
     * @param blocks  Content of the case.
     */
    public constructor(pattern: string, blocks?: Block[]);
    /**
     * CaseOption constructor.
     *
     * @param pattern Pattern to compare the case variable to.
     * @param content Content of the case.
     */
    public constructor(pattern: string, content?: StatementOrBlockOrString[]);
    /**
     * CaseOption constructor.
     *
     * @param pattern   Pattern to compare the case variable to.
     * @param statement Content of the case.
     */
    public constructor(pattern: number, statement?: Statement);
    /**
     * CaseOption constructor.
     *
     * @param pattern   Pattern to compare the case variable to.
     * @param statement Content of the case.
     */
    public constructor(pattern: number, statement?: string);
    /**
     * CaseOption constructor.
     *
     * @param pattern Pattern to compare the case variable to.
     * @param block   Content of the case.
     */
    public constructor(pattern: number, block?: Block);
    /**
     * CaseOption constructor.
     *
     * @param pattern    Pattern to compare the case variable to.
     * @param statements Content of the case.
     */
    public constructor(pattern: number, statements?: Statement[]);
    /**
     * CaseOption constructor.
     *
     * @param pattern    Pattern to compare the case variable to.
     * @param statements Content of the case.
     */
    public constructor(pattern: number, statements?: string[]);
    /**
     * CaseOption constructor.
     *
     * @param pattern Pattern to compare the case variable to.
     * @param blocks  Content of the case.
     */
    public constructor(pattern: number, blocks?: Block[]);
    /**
     * CaseOption constructor.
     *
     * @param pattern Pattern to compare the case variable to.
     * @param content Content of the case.
     */
    public constructor(pattern: number, content?: StatementOrBlockOrString[]);
    /**
     * CaseOption constructor.
     *
     * @param pattern   Pattern to compare the case variable to.
     * @param statement Content of the case.
     */
    public constructor(pattern: boolean, statement?: Statement);
    /**
     * CaseOption constructor.
     *
     * @param pattern   Pattern to compare the case variable to.
     * @param statement Content of the case.
     */
    public constructor(pattern: boolean, statement?: string);
    /**
     * CaseOption constructor.
     *
     * @param pattern Pattern to compare the case variable to.
     * @param block   Content of the case.
     */
    public constructor(pattern: boolean, block?: Block);
    /**
     * CaseOption constructor.
     *
     * @param pattern    Pattern to compare the case variable to.
     * @param statements Content of the case.
     */
    public constructor(pattern: boolean, statements?: Statement[]);
    /**
     * CaseOption constructor.
     *
     * @param pattern    Pattern to compare the case variable to.
     * @param statements Content of the case.
     */
    public constructor(pattern: boolean, statements?: string[]);
    /**
     * CaseOption constructor.
     *
     * @param pattern Pattern to compare the case variable to.
     * @param blocks  Content of the case.
     */
    public constructor(pattern: boolean, blocks?: Block[]);
    /**
     * CaseOption constructor.
     *
     * @param pattern Pattern to compare the case variable to.
     * @param content Content of the case.
     */
    public constructor(pattern: boolean, content?: StatementOrBlockOrString[]);
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public constructor(pattern: any, content?: any) {
        /* Make sure the provided pattern is valid. */
        pattern = convertToString(pattern, (e: ConvertToStringError) => {
            switch(e) {
                case ConvertToStringError.EmptyValue: throw new Error('Missing pattern');
                case ConvertToStringError.InvalidType: throw new Error('Invalid pattern type');
            }
        });
        pattern = wrapInQuotes(pattern); /* If pattern contains whitespaces, wrap it in quotes. */

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
