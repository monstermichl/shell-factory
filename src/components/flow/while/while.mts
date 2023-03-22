import { Statement } from '../../../base/statement.mjs';
import {
    Block,
    StatementOrBlockOrString,
} from '../../../base/block.mjs';
import {
    ConditionBlock,
    BracketType,
} from '../../../blocks/condition-block.mjs';
import { Condition } from '../../condition/condition.mjs';
import { Conditions } from '../../condition/conditions.mjs';

/**
 * Represents a Bourne Shell while-block.
 */
export class While extends ConditionBlock {
    /**
     * While constructor.
     *
     * @param condition While condition.
     * @param statement While-block content.
     */
    constructor(condition: string, statement?: Statement);
    /**
     * While constructor.
     *
     * @param condition While condition.
     * @param statement While-block content.
     */
    constructor(condition: string, statement?: string);
    /**
     * While constructor.
     *
     * @param condition While condition.
     * @param block     While-block content.
     */
    constructor(condition: string, block?: Block);
    /**
     * While constructor.
     *
     * @param condition  While condition.
     * @param statements While-block content.
     */
    constructor(condition: string, statements?: Statement[]);
    /**
     * While constructor.
     *
     * @param condition  While condition.
     * @param statements While-block content.
     */
    constructor(condition: string, statements?: string[]);
    /**
     * While constructor.
     *
     * @param condition While condition.
     * @param blocks    While-block content.
     */
    constructor(condition: string, blocks?: Block[]);
    /**
     * While constructor.
     *
     * @param condition While condition.
     * @param content   While-block content.
     */
    constructor(condition: string, content?: StatementOrBlockOrString[]);
    /**
     * While constructor.
     *
     * @param condition While condition.
     * @param statement While-block content.
     */
    constructor(condition: number, statement?: Statement);
    /**
     * While constructor.
     *
     * @param condition While condition.
     * @param statement While-block content.
     */
    constructor(condition: number, statement?: string);
    /**
     * While constructor.
     *
     * @param condition While condition.
     * @param block     While-block content.
     */
    constructor(condition: number, block?: Block);
    /**
     * While constructor.
     *
     * @param condition  While condition.
     * @param statements While-block content.
     */
    constructor(condition: number, statements?: Statement[]);
    /**
     * While constructor.
     *
     * @param condition  While condition.
     * @param statements While-block content.
     */
    constructor(condition: number, statements?: string[]);
    /**
     * While constructor.
     *
     * @param condition While condition.
     * @param blocks    While-block content.
     */
    constructor(condition: number, blocks?: Block[]);
    /**
     * While constructor.
     *
     * @param condition While condition.
     * @param content   While-block content.
     */
    constructor(condition: number, content?: StatementOrBlockOrString[]);
    /**
     * While constructor.
     *
     * @param condition While condition.
     * @param statement While-block content.
     */
    constructor(condition: boolean, statement?: Statement);
    /**
     * While constructor.
     *
     * @param condition While condition.
     * @param statement While-block content.
     */
    constructor(condition: boolean, statement?: string);
    /**
     * While constructor.
     *
     * @param condition While condition.
     * @param block     While-block content.
     */
    constructor(condition: boolean, block?: Block);
    /**
     * While constructor.
     *
     * @param condition  While condition.
     * @param statements While-block content.
     */
    constructor(condition: boolean, statements?: Statement[]);
    /**
     * While constructor.
     *
     * @param condition  While condition.
     * @param statements While-block content.
     */
    constructor(condition: boolean, statements?: string[]);
    /**
     * While constructor.
     *
     * @param condition While condition.
     * @param blocks    While-block content.
     */
    constructor(condition: boolean, blocks?: Block[]);
    /**
     * While constructor.
     *
     * @param condition While condition.
     * @param content   While-block content.
     */
    constructor(condition: boolean, content?: StatementOrBlockOrString[]);
    /**
     * While constructor.
     *
     * @param condition While condition.
     * @param statement While-block content.
     */
    constructor(condition: Condition, statement?: Statement);
    /**
     * While constructor.
     *
     * @param condition While condition.
     * @param statement While-block content.
     */
    constructor(condition: Condition, statement?: string);
    /**
     * While constructor.
     *
     * @param condition While condition.
     * @param block     While-block content.
     */
    constructor(condition: Condition, block?: Block);
    /**
     * While constructor.
     *
     * @param condition  While condition.
     * @param statements While-block content.
     */
    constructor(condition: Condition, statements?: Statement[]);
    /**
     * While constructor.
     *
     * @param condition  While condition.
     * @param statements While-block content.
     */
    constructor(condition: Condition, statements?: string[]);
    /**
     * While constructor.
     *
     * @param condition While condition.
     * @param blocks    While-block content.
     */
    constructor(condition: Condition, blocks?: Block[]);
    /**
     * While constructor.
     *
     * @param condition While condition.
     * @param content   While-block content.
     */
    constructor(condition: Condition, content?: StatementOrBlockOrString[]);
    /**
     * While constructor.
     *
     * @param conditions While conditions.
     * @param statement  While-block content.
     */
    constructor(conditions: Conditions, statement?: Statement);
    /**
     * While constructor.
     *
     * @param conditions While conditions.
     * @param statement  While-block content.
     */
    constructor(conditions: Conditions, statement?: string);
    /**
     * While constructor.
     *
     * @param conditions While conditions.
     * @param block      While-block content.
     */
    constructor(conditions: Conditions, block?: Block);
    /**
     * While constructor.
     *
     * @param conditions While conditions.
     * @param statements While-block content.
     */
    constructor(conditions: Conditions, statements?: Statement[]);
    /**
     * While constructor.
     *
     * @param conditions While conditions.
     * @param statements While-block content.
     */
    constructor(conditions: Conditions, statements?: string[]);
    /**
     * While constructor.
     *
     * @param conditions While conditions.
     * @param blocks     While-block content.
     */
    constructor(conditions: Conditions, blocks?: Block[]);
    /**
     * While constructor.
     *
     * @param conditions While conditions.
     * @param content    While-block content.
     */
    constructor(conditions: Conditions, content?: StatementOrBlockOrString[]);
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    constructor(condition: any, content?: any) {
        super('while', BracketType.Square, condition, 'do', content, 'done');
    }
}
