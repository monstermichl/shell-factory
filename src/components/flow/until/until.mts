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
 * Represents a Bourne Shell until-block.
 */
export class Until extends ConditionBlock {
    /**
     * Until constructor.
     *
     * @param condition Until condition.
     * @param statement Until-block content.
     */
    constructor(condition: string, statement?: Statement);
    /**
     * Until constructor.
     *
     * @param condition Until condition.
     * @param statement Until-block content.
     */
    constructor(condition: string, statement?: string);
    /**
     * Until constructor.
     *
     * @param condition Until condition.
     * @param block     Until-block content.
     */
    constructor(condition: string, block?: Block);
    /**
     * Until constructor.
     *
     * @param condition  Until condition.
     * @param statements Until-block content.
     */
    constructor(condition: string, statements?: Statement[]);
    /**
     * Until constructor.
     *
     * @param condition  Until condition.
     * @param statements Until-block content.
     */
    constructor(condition: string, statements?: string[]);
    /**
     * Until constructor.
     *
     * @param condition Until condition.
     * @param blocks    Until-block content.
     */
    constructor(condition: string, blocks?: Block[]);
    /**
     * Until constructor.
     *
     * @param condition Until condition.
     * @param content   Until-block content.
     */
    constructor(condition: string, content?: StatementOrBlockOrString[]);
    /**
     * Until constructor.
     *
     * @param condition Until condition.
     * @param statement Until-block content.
     */
    constructor(condition: number, statement?: Statement);
    /**
     * Until constructor.
     *
     * @param condition Until condition.
     * @param statement Until-block content.
     */
    constructor(condition: number, statement?: string);
    /**
     * Until constructor.
     *
     * @param condition Until condition.
     * @param block     Until-block content.
     */
    constructor(condition: number, block?: Block);
    /**
     * Until constructor.
     *
     * @param condition  Until condition.
     * @param statements Until-block content.
     */
    constructor(condition: number, statements?: Statement[]);
    /**
     * Until constructor.
     *
     * @param condition  Until condition.
     * @param statements Until-block content.
     */
    constructor(condition: number, statements?: string[]);
    /**
     * Until constructor.
     *
     * @param condition Until condition.
     * @param blocks    Until-block content.
     */
    constructor(condition: number, blocks?: Block[]);
    /**
     * Until constructor.
     *
     * @param condition Until condition.
     * @param content   Until-block content.
     */
    constructor(condition: number, content?: StatementOrBlockOrString[]);
    /**
     * Until constructor.
     *
     * @param condition Until condition.
     * @param statement Until-block content.
     */
    constructor(condition: boolean, statement?: Statement);
    /**
     * Until constructor.
     *
     * @param condition Until condition.
     * @param statement Until-block content.
     */
    constructor(condition: boolean, statement?: string);
    /**
     * Until constructor.
     *
     * @param condition Until condition.
     * @param block     Until-block content.
     */
    constructor(condition: boolean, block?: Block);
    /**
     * Until constructor.
     *
     * @param condition  Until condition.
     * @param statements Until-block content.
     */
    constructor(condition: boolean, statements?: Statement[]);
    /**
     * Until constructor.
     *
     * @param condition  Until condition.
     * @param statements Until-block content.
     */
    constructor(condition: boolean, statements?: string[]);
    /**
     * Until constructor.
     *
     * @param condition Until condition.
     * @param blocks    Until-block content.
     */
    constructor(condition: boolean, blocks?: Block[]);
    /**
     * Until constructor.
     *
     * @param condition Until condition.
     * @param content   Until-block content.
     */
    constructor(condition: boolean, content?: StatementOrBlockOrString[]);
    /**
     * Until constructor.
     *
     * @param condition Until condition.
     * @param statement Until-block content.
     */
    constructor(condition: Condition, statement?: Statement);
    /**
     * Until constructor.
     *
     * @param condition Until condition.
     * @param statement Until-block content.
     */
    constructor(condition: Condition, statement?: string);
    /**
     * Until constructor.
     *
     * @param condition Until condition.
     * @param block     Until-block content.
     */
    constructor(condition: Condition, block?: Block);
    /**
     * Until constructor.
     *
     * @param condition  Until condition.
     * @param statements Until-block content.
     */
    constructor(condition: Condition, statements?: Statement[]);
    /**
     * Until constructor.
     *
     * @param condition  Until condition.
     * @param statements Until-block content.
     */
    constructor(condition: Condition, statements?: string[]);
    /**
     * Until constructor.
     *
     * @param condition Until condition.
     * @param blocks    Until-block content.
     */
    constructor(condition: Condition, blocks?: Block[]);
    /**
     * Until constructor.
     *
     * @param condition Until condition.
     * @param content   Until-block content.
     */
    constructor(condition: Condition, content?: StatementOrBlockOrString[]);
    /**
     * Until constructor.
     *
     * @param conditions Until conditions.
     * @param statement  Until-block content.
     */
    constructor(conditions: Conditions, statement?: Statement);
    /**
     * Until constructor.
     *
     * @param conditions Until conditions.
     * @param statement  Until-block content.
     */
    constructor(conditions: Conditions, statement?: string);
    /**
     * Until constructor.
     *
     * @param conditions Until conditions.
     * @param block      Until-block content.
     */
    constructor(conditions: Conditions, block?: Block);
    /**
     * Until constructor.
     *
     * @param conditions Until conditions.
     * @param statements Until-block content.
     */
    constructor(conditions: Conditions, statements?: Statement[]);
    /**
     * Until constructor.
     *
     * @param conditions Until conditions.
     * @param statements Until-block content.
     */
    constructor(conditions: Conditions, statements?: string[]);
    /**
     * Until constructor.
     *
     * @param conditions Until conditions.
     * @param blocks     Until-block content.
     */
    constructor(conditions: Conditions, blocks?: Block[]);
    /**
     * Until constructor.
     *
     * @param conditions Until conditions.
     * @param content    Until-block content.
     */
    constructor(conditions: Conditions, content?: StatementOrBlockOrString[]);
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    constructor(condition: any, content?: any) {
        super('until', BracketType.Square, condition, 'do', content, 'done');
    }
}
