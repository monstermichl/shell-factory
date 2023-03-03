import {
    Block,
    StatementOrBlockOrString,
} from '../../../base/block.mjs';
import { Statement } from '../../../base/statement.mjs';
import {
    ConditionBlock,
    BracketType,
} from '../../../blocks/condition-block.mjs';
import { Condition } from '../../condition/condition.mjs';
import { Conditions } from '../../condition/conditions.mjs';

/**
 * Serves as the base for If- and ElseIf-blocks.
 */
export abstract class IfBase extends ConditionBlock {
    /**
     * IfBase constructor.
     * 
     * @param ifKeyword Keyword to start the if-condition with.
     * @param condition If-condition.
     * @param statement If-block content.
     * @param endKeyword Keyword to end the if-block with.
     */
    protected constructor(ifKeyword: string, condition: string, statement?: Statement, endKeyword?: string);
    /**
     * IfBase constructor.
     * 
     * @param ifKeyword Keyword to start the if-condition with.
     * @param condition If-condition.
     * @param statement If-block content.
     * @param endKeyword Keyword to end the if-block with.
     */
    protected constructor(ifKeyword: string, condition: string, statement?: string, endKeyword?: string);
    /**
     * IfBase constructor.
     * 
     * @param ifKeyword Keyword to start the if-condition with.
     * @param condition If-condition.
     * @param block If-block content.
     * @param endKeyword Keyword to end the if-block with.
     */
    protected constructor(ifKeyword: string, condition: string, block?: Block, endKeyword?: string);
    /**
     * IfBase constructor.
     * 
     * @param ifKeyword Keyword to start the if-condition with.
     * @param condition If-condition.
     * @param statements If-block content.
     * @param endKeyword Keyword to end the if-block with.
     */
    protected constructor(ifKeyword: string, condition: string, statements?: Statement[], endKeyword?: string);
    /**
     * IfBase constructor.
     * 
     * @param ifKeyword Keyword to start the if-condition with.
     * @param condition If-condition.
     * @param statements If-block content.
     * @param endKeyword Keyword to end the if-block with.
     */
    protected constructor(ifKeyword: string, condition: string, statements?: string[], endKeyword?: string);
    /**
     * IfBase constructor.
     * 
     * @param ifKeyword Keyword to start the if-condition with.
     * @param condition If-condition.
     * @param blocks If-block content.
     * @param endKeyword Keyword to end the if-block with.
     */
    protected constructor(ifKeyword: string, condition: string, blocks?: Block[], endKeyword?: string);
    /**
     * IfBase constructor.
     * 
     * @param ifKeyword Keyword to start the if-condition with.
     * @param condition If-condition.
     * @param content If-block content.
     * @param endKeyword Keyword to end the if-block with.
     */
    protected constructor(ifKeyword: string, condition: string, content?: StatementOrBlockOrString[], endKeyword?: string);
    /**
     * IfBase constructor.
     * 
     * @param ifKeyword Keyword to start the if-condition with.
     * @param condition If-condition.
     * @param statement If-block content.
     * @param endKeyword Keyword to end the if-block with.
     */
    protected constructor(ifKeyword: string, condition: Condition, statement?: Statement, endKeyword?: string);
    /**
     * IfBase constructor.
     * 
     * @param ifKeyword Keyword to start the if-condition with.
     * @param condition If-condition.
     * @param statement If-block content.
     * @param endKeyword Keyword to end the if-block with.
     */
    protected constructor(ifKeyword: string, condition: Condition, statement?: string, endKeyword?: string);
    /**
     * IfBase constructor.
     * 
     * @param ifKeyword Keyword to start the if-condition with.
     * @param condition If-condition.
     * @param block If-block content.
     * @param endKeyword Keyword to end the if-block with.
     */
    protected constructor(ifKeyword: string, condition: Condition, block?: Block, endKeyword?: string);
    /**
     * IfBase constructor.
     * 
     * @param ifKeyword Keyword to start the if-condition with.
     * @param condition If-condition.
     * @param statements If-block content.
     * @param endKeyword Keyword to end the if-block with.
     */
    protected constructor(ifKeyword: string, condition: Condition, statements?: Statement[], endKeyword?: string);
    /**
     * IfBase constructor.
     * 
     * @param ifKeyword Keyword to start the if-condition with.
     * @param condition If-condition.
     * @param statements If-block content.
     * @param endKeyword Keyword to end the if-block with.
     */
    protected constructor(ifKeyword: string, condition: Condition, statements?: string[], endKeyword?: string);
    /**
     * IfBase constructor.
     * 
     * @param ifKeyword Keyword to start the if-condition with.
     * @param condition If-condition.
     * @param blocks If-block content.
     * @param endKeyword Keyword to end the if-block with.
     */
    protected constructor(ifKeyword: string, condition: Condition, blocks?: Block[], endKeyword?: string);
    /**
     * IfBase constructor.
     * 
     * @param ifKeyword Keyword to start the if-condition with.
     * @param condition If-condition.
     * @param content If-block content.
     * @param endKeyword Keyword to end the if-block with.
     */
    protected constructor(ifKeyword: string, condition: Condition, content?: StatementOrBlockOrString[], endKeyword?: string);
    /**
     * IfBase constructor.
     * 
     * @param ifKeyword Keyword to start the if-condition with.
     * @param condition If-condition.
     * @param statement If-block content.
     * @param endKeyword Keyword to end the if-block with.
     */
    protected constructor(ifKeyword: string, conditions: Conditions, statement?: Statement, endKeyword?: string);
    /**
     * IfBase constructor.
     * 
     * @param ifKeyword Keyword to start the if-condition with.
     * @param condition If-condition.
     * @param statement If-block content.
     * @param endKeyword Keyword to end the if-block with.
     */
    protected constructor(ifKeyword: string, conditions: Conditions, statement?: string, endKeyword?: string);
    /**
     * IfBase constructor.
     * 
     * @param ifKeyword Keyword to start the if-condition with.
     * @param condition If-condition.
     * @param block If-block content.
     * @param endKeyword Keyword to end the if-block with.
     */
    protected constructor(ifKeyword: string, conditions: Conditions, block?: Block, endKeyword?: string);
    /**
     * IfBase constructor.
     * 
     * @param ifKeyword Keyword to start the if-condition with.
     * @param condition If-condition.
     * @param statements If-block content.
     * @param endKeyword Keyword to end the if-block with.
     */
    protected constructor(ifKeyword: string, conditions: Conditions, statements?: Statement[], endKeyword?: string);
    /**
     * IfBase constructor.
     * 
     * @param ifKeyword Keyword to start the if-condition with.
     * @param condition If-condition.
     * @param statements If-block content.
     * @param endKeyword Keyword to end the if-block with.
     */
    protected constructor(ifKeyword: string, conditions: Conditions, statements?: string[], endKeyword?: string);
    /**
     * IfBase constructor.
     * 
     * @param ifKeyword Keyword to start the if-condition with.
     * @param condition If-condition.
     * @param blocks If-block content.
     * @param endKeyword Keyword to end the if-block with.
     */
    protected constructor(ifKeyword: string, conditions: Conditions, blocks?: Block[], endKeyword?: string);
    /**
     * IfBase constructor.
     * 
     * @param ifKeyword Keyword to start the if-condition with.
     * @param condition If-condition.
     * @param content If-block content.
     * @param endKeyword Keyword to end the if-block with.
     */
    protected constructor(ifKeyword: string, conditions: Conditions, content?: StatementOrBlockOrString[], endKeyword?: string);
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    protected constructor(ifKeyword: string, condition: any, content?: any, endKeyword?: string) {
        super(ifKeyword, BracketType.Square, condition, 'then', content, endKeyword);
    }
}
