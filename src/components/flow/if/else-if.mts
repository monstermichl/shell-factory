import { Statement } from '../../../base/statement.mjs';
import {
    Block,
    StatementOrBlockOrString,
} from '../../../base/block.mjs';
import { Condition } from '../../condition/condition.mjs';
import { ConditionBlock } from '../../../blocks/condition-block.mjs';

/**
 * Represents a Bourne Shell elif-block.
 */
export class ElseIf extends ConditionBlock {
    /**
     * ElseIf constructor.
     *
     * @param condition ElseIf-condition.
     * @param statement ElseIf-block-content.
     */
    constructor(condition: string, statement?: Statement);
    /**
     * ElseIf constructor.
     *
     * @param condition ElseIf-condition.
     * @param statement ElseIf-block-content.
     */
    constructor(condition: string, statement?: string);
    /**
     * ElseIf constructor.
     *
     * @param condition ElseIf-condition.
     * @param block     ElseIf-block-content.
     */
    constructor(condition: string, block?: Block);
    /**
     * ElseIf constructor.
     *
     * @param condition  ElseIf-condition.
     * @param statements ElseIf-block-content.
     */
    constructor(condition: string, statements?: Statement[]);
    /**
     * ElseIf constructor.
     *
     * @param condition  ElseIf-condition.
     * @param statements ElseIf-block-content.
     */
    constructor(condition: string, statements?: string[]);
    /**
     * ElseIf constructor.
     *
     * @param condition ElseIf-condition.
     * @param blocks    ElseIf-block-content.
     */
    constructor(condition: string, blocks?: Block[]);
    /**
     * ElseIf constructor.
     *
     * @param condition ElseIf-condition.
     * @param statement ElseIf-block-content.
     */
    constructor(condition: string, content?: StatementOrBlockOrString[]);
    /**
     * ElseIf constructor.
     *
     * @param condition ElseIf-condition.
     * @param statement ElseIf-block-content.
     */
    constructor(condition: Condition, statement?: Statement);
    /**
     * ElseIf constructor.
     *
     * @param condition ElseIf-condition.
     * @param statement ElseIf-block-content.
     */
    constructor(condition: Condition, statement?: string);
    /**
     * ElseIf constructor.
     *
     * @param condition ElseIf-condition.
     * @param block     ElseIf-block-content.
     */
    constructor(condition: Condition, block?: Block);
    /**
     * ElseIf constructor.
     *
     * @param condition  ElseIf-condition.
     * @param statements ElseIf-block-content.
     */
    constructor(condition: Condition, statements?: Statement[]);
    /**
     * ElseIf constructor.
     *
     * @param condition  ElseIf-condition.
     * @param statements ElseIf-block-content.
     */
    constructor(condition: Condition, statements?: string[]);
    /**
     * ElseIf constructor.
     *
     * @param condition ElseIf-condition.
     * @param blocks    ElseIf-block-content.
     */
    constructor(condition: Condition, blocks?: Block[]);
    /**
     * ElseIf constructor.
     *
     * @param condition ElseIf-condition.
     * @param content   ElseIf-block-content.
     */
    constructor(condition: Condition, content?: StatementOrBlockOrString[]);
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    constructor(condition: any, content?: any) {
        super('elif', condition, 'then', content);
    }
}
