import {
    Block,
    StatementOrBlockOrString,
} from '../../../base/block.mjs';
import { Statement } from '../../../base/statement.mjs';
import { FlowBlock } from '../../../blocks/flow-block.mjs';
import { CaseOption } from './case-option.mjs';

/**
 * Represents a Bourne Shell case-block.
 */
export class Case extends FlowBlock {
    protected _cases: CaseOption[] = [];

    /**
     * Case constructor.
     *
     * @param value Case value/variable.
     * @param cas Case-option to add.
     */
    public constructor(value: string, cas?: CaseOption);
    /**
     * Case constructor.
     *
     * @param value Case value/variable.
     * @param cases Case-options to add.
     */
    public constructor(value: string, cases?: CaseOption[]);
    /**
     * Case constructor.
     *
     * @param value Case value/variable.
     * @param pattern Pattern to create a new case-option from.
     * @param statement Content of the new case-option.
     */
    public constructor(value: string, pattern?: string, statement?: string);
    /**
     * Case constructor.
     *
     * @param value Case value/variable.
     * @param pattern Pattern to create a new case-option from.
     * @param statement Content of the new case-option.
     */
    public constructor(value: string, pattern?: string, statement?: Statement);
    /**
     * Case constructor.
     *
     * @param value Case value/variable.
     * @param pattern Pattern to create a new case-option from.
     * @param block Content of the new case-option.
     */
    public constructor(value: string, pattern?: string, block?: Block);
    /**
     * Case constructor.
     *
     * @param value Case value/variable.
     * @param pattern Pattern to create a new case-option from.
     * @param statements Content of the new case-option.
     */
    public constructor(value: string, pattern?: string, statements?: FlowBlock[]);
    /**
     * Case constructor.
     *
     * @param value Case value/variable.
     * @param pattern Pattern to create a new case-option from.
     * @param statements Content of the new case-option.
     */
    public constructor(value: string, pattern?: string, statements?: Statement[]);
    /**
     * Case constructor.
     *
     * @param value Case value/variable.
     * @param pattern Pattern to create a new case-option from.
     * @param blocks Content of the new case-option.
     */
    public constructor(value: string, pattern?: string, blocks?: Block[]);
    /**
     * Case constructor.
     *
     * @param value Case value/variable.
     * @param pattern Pattern to create a new case-option from.
     * @param content Content of the new case-option.
     */
    public constructor(value: string, pattern?: string, content?: StatementOrBlockOrString[]);
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public constructor(value: any, arg1?: any, arg2?: any) {
        if (!value) {
            throw new Error('Missing value');
        }
        super(`case ${value} in`, undefined, 'esac');
        this.addContent(arg1, arg2);
    }

    /**
     * Returns the defined Case-options.
     */
    public get cases(): CaseOption[] {
        return this._cases;
    }

    /**
     * Adds a new case-option to the case.
     *
     * @param cas Case-option to add.
     */
    public override addContent(cas: CaseOption): this;
    /**
     * Adds new case-options to the case.
     *
     * @param cas Case-options to add.
     */
    public override addContent(cases: CaseOption[]): this;
    /**
     * Adds a new case-option to the case.
     *
     * @param pattern Pattern to create a new case-option from.
     * @param statement Content of the new case-option.
     */
    public override addContent(pattern: string, statement: string): this;
    /**
     * Adds a new case-option to the case.
     *
     * @param pattern Pattern to create a new case-option from.
     * @param statement Content of the new case-option.
     */
    public override addContent(pattern: string, statement: Statement): this;
    /**
     * Adds a new case-option to the case.
     *
     * @param pattern Pattern to create a new case-option from.
     * @param block Content of the new case-option.
     */
    public override addContent(pattern: string, block: Block): this;
    /**
     * Adds a new case-option to the case.
     *
     * @param pattern Pattern to create a new case-option from.
     * @param statements Content of the new case-option.
     */
    public override addContent(pattern: string, statements: FlowBlock[]): this;
    /**
     * Adds a new case-option to the case.
     *
     * @param pattern Pattern to create a new case-option from.
     * @param statements Content of the new case-option.
     */
    public override addContent(pattern: string, statements: Statement[]): this;
    /**
     * Adds a new case-option to the case.
     *
     * @param pattern Pattern to create a new case-option from.
     * @param blocks Content of the new case-option.
     */
    public override addContent(pattern: string, blocks: Block[]): this;
    /**
     * Adds a new case-option to the case.
     *
     * @param pattern Pattern to create a new case-option from.
     * @param content Content of the new case-option.
     */
    public override addContent(pattern: string, content: StatementOrBlockOrString[]): this;
    /**
     * Adds the provided content to the last case-option.
     *
     * @param statement Content to add to the last case-option.
     */
    public override addContent(statement: string): this;
    /**
     * Adds the provided content to the last case-option.
     *
     * @param statement Content to add to the last case-option.
     */
    public override addContent(statement: Statement): this;
    /**
     * Adds the provided content to the last case-option.
     *
     * @param block Content to add to the last case-option.
     */
    public override addContent(block: Block): this;
    /**
     * Adds the provided content to the last case-option.
     *
     * @param statements Content to add to the last case-option.
     */
    public override addContent(statements: FlowBlock[]): this;
    /**
     * Adds the provided content to the last case-option.
     *
     * @param statements Content to add to the last case-option.
     */
    public override addContent(statements: Statement[]): this;
    /**
     * Adds the provided content to the last case-option.
     *
     * @param blocks Content to add to the last case-option.
     */
    public override addContent(blocks: Block[]): this;
    /**
     * Adds the provided content to the last case-option.
     *
     * @param content Content to add to the last case-option.
     */
    public override addContent(content: StatementOrBlockOrString[]): this;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public override addContent(arg1: any, arg2?: any): this | null {
        let content;

        /* If pattern and content are provided separately, create a new case. */
        if (typeof arg1 === 'string' && arg2) {
            content = new CaseOption(arg1, arg2);
        } else {
            content = arg1;
        }

        /* If only a single case has been provided, convert it to an array for easier processing. */
        if (!(content instanceof Array)) {
            content = [content];
        }
        /* Every list member that is not a case is added to the latest case. Otherwise, the
           member is added to the _cases list. */
        content.forEach((member) => {
            if (member instanceof CaseOption) {
                this._cases.push(member);
                this._addBodyContent(member);
            } else if (this._cases.length > 0) {
                this._cases.at(-1)?.addContent(member); /* Add to last case. */
            } else {
                throw new Error('No cases to which content could be added');
            }
        });
        return this;
    }
}
