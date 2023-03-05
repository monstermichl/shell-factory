import { IfBase } from './if-base.mjs';
import { ElseIf } from './else-if.mjs';
import { Else } from './else.mjs';
import { Statement } from '../../../base/statement.mjs';
import {
    Block,
    StatementOrBlockOrString,
} from '../../../base/block.mjs';
import { Condition } from '../../condition/condition.mjs';
import { Conditions } from '../../condition/conditions.mjs';

/**
 * Represents a summary of the parts of an if-block.
 */
export type IfParts = {
    if: If;
    elseIfs?: ElseIf[];
    else?: Else;
};

/**
 * Represents a Bourne Shell if-block.
 */
export class If extends IfBase {
    private _elseIfs: ElseIf[] = [];
    private _else: Else;

    /**
     * If constructor.
     *
     * @param condition If-condition.
     * @param statement If-block content.
     */
    constructor(condition: string, statement?: Statement);
    /**
     * If constructor.
     *
     * @param condition If-condition.
     * @param statement If-block content.
     */
    constructor(condition: string, statement?: string);
    /**
     * If constructor.
     *
     * @param condition If-condition.
     * @param block     If-block content.
     */
    constructor(condition: string, block?: Block);
    /**
     * If constructor.
     *
     * @param condition  If-condition.
     * @param statements If-block content.
     */
    constructor(condition: string, statements?: Statement[]);
    /**
     * If constructor.
     *
     * @param condition  If-condition.
     * @param statements If-block content.
     */
    constructor(condition: string, statements?: string[]);
    /**
     * If constructor.
     *
     * @param condition If-condition.
     * @param blocks    If-block content.
     */
    constructor(condition: string, blocks?: Block[]);
    /**
     * If constructor.
     *
     * @param condition If-condition.
     * @param statement If-block content.
     */
    constructor(condition: string, content?: StatementOrBlockOrString[]);
    /**
     * If constructor.
     *
     * @param condition If-condition.
     * @param statement If-block content.
     */
    constructor(condition: Condition, statement?: Statement);
    /**
     * If constructor.
     *
     * @param condition If-condition.
     * @param statement If-block content.
     */
    constructor(condition: Condition, statement?: string);
    /**
     * If constructor.
     *
     * @param condition If-condition.
     * @param block     If-block content.
     */
    constructor(condition: Condition, block?: Block);
    /**
     * If constructor.
     *
     * @param condition  If-condition.
     * @param statements If-block content.
     */
    constructor(condition: Condition, statements?: Statement[]);
    /**
     * If constructor.
     *
     * @param condition  If-condition.
     * @param statements If-block content.
     */
    constructor(condition: Condition, statements?: string[]);
    /**
     * If constructor.
     *
     * @param condition If-condition.
     * @param blocks    If-block content.
     */
    constructor(condition: Condition, blocks?: Block[]);
    /**
     * If constructor.
     *
     * @param condition If-condition.
     * @param content   If-block content.
     */
    constructor(condition: Condition, content?: StatementOrBlockOrString[]);
    /**
     * If constructor.
     *
     * @param conditions If-conditions.
     * @param statement  If-block content.
     */
    constructor(conditions: Conditions, statement?: Statement);
    /**
     * If constructor.
     *
     * @param conditions If-conditions.
     * @param statement  If-block content.
     */
    constructor(conditions: Conditions, statement?: string);
    /**
     * If constructor.
     *
     * @param conditions If-conditions.
     * @param block      If-block content.
     */
    constructor(conditions: Conditions, block?: Block);
    /**
     * If constructor.
     *
     * @param conditions If-conditions.
     * @param statements If-block content.
     */
    constructor(conditions: Conditions, statements?: Statement[]);
    /**
     * If constructor.
     *
     * @param conditions If-conditions.
     * @param statements If-block content.
     */
    constructor(conditions: Conditions, statements?: string[]);
    /**
     * If constructor.
     *
     * @param conditions If-conditions.
     * @param blocks     If-block content.
     */
    constructor(conditions: Conditions, blocks?: Block[]);
    /**
     * If constructor.
     *
     * @param conditions If-conditions.
     * @param content    If-block content.
     */
    constructor(conditions: Conditions, content?: StatementOrBlockOrString[]);
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    constructor(condition: any, content?: any) {
        super('if', condition, content, 'fi');
    }

    /**
     * Returns the parts of the if-statement (if, else-if(s), else).
     *
     * @return IfParts object.
     */
    public get parts(): IfParts {
        return {
            if: this,
            elseIfs: this._elseIfs.length ? this._elseIfs: undefined,
            else: this._else,
        } as IfParts;
    }

    /**
     * Adds an else-if branch to the if-block.
     *
     * @param condition Else-if-condition.
     * @param statement Else-if-block content.
     * @param replace   If condition already exists and replace is set to true
     *                  the else-if-block's content will be replaced.
     * 
     * @return If successful, the current class is returned. Otherwise, null is returned.
     */
    public elseIf(condition: string, statement?: Statement, replace?: boolean): If;
    /**
     * Adds an else-if branch to the if-block.
     *
     * @param condition Else-if-condition.
     * @param statement Else-if-block content.
     * @param replace   If condition already exists and replace is set to true
     *                  the else-if-block's content will be replaced.
     * 
     * @return If successful, the current class is returned. Otherwise, null is returned.
     */
    public elseIf(condition: string, statement?: string, replace?: boolean): If;
    /**
     * Adds an else-if branch to the if-block.
     *
     * @param condition Else-if-condition.
     * @param block     Else-if-block content.
     * @param replace   If condition already exists and replace is set to true
     *                  the else-if-block's content will be replaced.
     * 
     * @return If successful, the current class is returned. Otherwise, null is returned.
     */
    public elseIf(condition: string, block?: Block, replace?: boolean): If;
    /**
     * Adds an else-if branch to the if-block.
     *
     * @param condition  Else-if-condition.
     * @param statements Else-if-block content.
     * @param replace    If condition already exists and replace is set to true
     *                   the else-if-block's content will be replaced.
     * 
     * @return If successful, the current class is returned. Otherwise, null is returned.
     */
    public elseIf(condition: string, statements?: Statement[], replace?: boolean): If;
    /**
     * Adds an else-if branch to the if-block.
     *
     * @param condition  Else-if-condition.
     * @param statements Else-if-block content.
     * @param replace    If condition already exists and replace is set to true
     *                   the else-if-block's content will be replaced.
     * 
     * @return If successful, the current class is returned. Otherwise, null is returned.
     */
    public elseIf(condition: string, statements?: string[], replace?: boolean): If;
    /**
     * Adds an else-if branch to the if-block.
     *
     * @param condition Else-if-condition.
     * @param blocks    Else-if-block content.
     * @param replace   If condition already exists and replace is set to true
     *                  the else-if-block's content will be replaced.
     * 
     * @return If successful, the current class is returned. Otherwise, null is returned.
     */
    public elseIf(condition: string, blocks?: Block[], replace?: boolean): If;
    /**
     * Adds an else-if branch to the if-block.
     *
     * @param condition Else-if-condition.
     * @param content   Else-if-block content.
     * @param replace   If condition already exists and replace is set to true
     *                  the else-if-block's content will be replaced.
     * 
     * @return If successful, the current class is returned. Otherwise, null is returned.
     */
    public elseIf(condition: string, content?: StatementOrBlockOrString[], replace?: boolean): If;
    /**
     * Adds an else-if branch to the if-block.
     *
     * @param condition Else-if-condition.
     * @param statement Else-if-block content.
     * @param replace   If condition already exists and replace is set to true
     *                  the else-if-block's content will be replaced.
     * 
     * @return If successful, the current class is returned. Otherwise, null is returned.
     */
    public elseIf(condition: Condition, statement?: Statement, replace?: boolean): If;
    /**
     * Adds an else-if branch to the if-block.
     *
     * @param condition Else-if-condition.
     * @param statement Else-if-block content.
     * @param replace   If condition already exists and replace is set to true
     *                  the else-if-block's content will be replaced.
     * 
     * @return If successful, the current class is returned. Otherwise, null is returned.
     */
    public elseIf(condition: Condition, statement?: string, replace?: boolean): If;
    /**
     * Adds an else-if branch to the if-block.
     *
     * @param condition Else-if-condition.
     * @param block     Else-if-block content.
     * @param replace   If condition already exists and replace is set to true
     *                  the else-if-block's content will be replaced.
     * 
     * @return If successful, the current class is returned. Otherwise, null is returned.
     */
    public elseIf(condition: Condition, block?: Block, replace?: boolean): If;
    /**
     * Adds an else-if branch to the if-block.
     *
     * @param condition  Else-if-condition.
     * @param statements Else-if-block content.
     * @param replace    If condition already exists and replace is set to true
     *                   the else-if-block's content will be replaced.
     * 
     * @return If successful, the current class is returned. Otherwise, null is returned.
     */
    public elseIf(condition: Condition, statements?: Statement[], replace?: boolean): If;
    /**
     * Adds an else-if branch to the if-block.
     *
     * @param condition  Else-if-condition.
     * @param statements Else-if-block content.
     * @param replace    If condition already exists and replace is set to true
     *                   the else-if-block's content will be replaced.
     * 
     * @return If successful, the current class is returned. Otherwise, null is returned.
     */
    public elseIf(condition: Condition, statements?: string[], replace?: boolean): If;
    /**
     * Adds an else-if branch to the if-block.
     *
     * @param condition Else-if-condition.
     * @param blocks    Else-if-block content.
     * @param replace   If condition already exists and replace is set to true
     *                  the else-if-block's content will be replaced.
     * 
     * @return If successful, the current class is returned. Otherwise, null is returned.
     */
    public elseIf(condition: Condition, blocks?: Block[], replace?: boolean): If;
    /**
     * Adds an else-if branch to the if-block.
     *
     * @param condition Else-if-condition.
     * @param content   Else-if-block content.
     * @param replace   If condition already exists and replace is set to true
     *                  the else-if-block's content will be replaced.
     * 
     * @return If successful, the current class is returned. Otherwise, null is returned.
     */
    public elseIf(condition: Condition, content?: StatementOrBlockOrString[], replace?: boolean): If;
    /**
     * Adds an else-if branch to the if-block.
     *
     * @param conditions Else-if-conditions.
     * @param statement  Else-if-block content.
     * @param replace    If conditions already exist and replace is set to true
     *                   the else-if-block's content will be replaced.
     * 
     * @return If successful, the current class is returned. Otherwise, null is returned.
     */
    public elseIf(conditions: Conditions, statement?: Statement, replace?: boolean): If;
    /**
     * Adds an else-if branch to the if-block.
     *
     * @param conditions Else-if-conditions.
     * @param statement  Else-if-block content.
     * @param replace    If conditions already exist and replace is set to true
     *                   the else-if-block's content will be replaced.
     * 
     * @return If successful, the current class is returned. Otherwise, null is returned.
     */
    public elseIf(conditions: Conditions, statement?: string, replace?: boolean): If;
    /**
     * Adds an else-if branch to the if-block.
     *
     * @param conditions Else-if-conditions.
     * @param block      Else-if-block content.
     * @param replace    If conditions already exist and replace is set to true
     *                   the else-if-block's content will be replaced.
     * 
     * @return If successful, the current class is returned. Otherwise, null is returned.
     */
    public elseIf(conditions: Conditions, block?: Block, replace?: boolean): If;
    /**
     * Adds an else-if branch to the if-block.
     *
     * @param conditions Else-if-conditions.
     * @param statements Else-if-block content.
     * @param replace    If conditions already exist and replace is set to true
     *                   the else-if-block's content will be replaced.
     * 
     * @return If successful, the current class is returned. Otherwise, null is returned.
     */
    public elseIf(conditions: Conditions, content?: Statement[], replace?: boolean): If;
    /**
     * Adds an else-if branch to the if-block.
     *
     * @param conditions Else-if-conditions.
     * @param statements Else-if-block content.
     * @param replace    If conditions already exist and replace is set to true
     *                   the else-if-block's content will be replaced.
     * 
     * @return If successful, the current class is returned. Otherwise, null is returned.
     */
    public elseIf(conditions: Conditions, statements?: string[], replace?: boolean): If;
    /**
     * Adds an else-if branch to the if-block.
     *
     * @param conditions Else-if-conditions.
     * @param block      Else-if-block content.
     * @param replace    If conditions already exist and replace is set to true
     *                   the else-if-block's content will be replaced.
     * 
     * @return If successful, the current class is returned. Otherwise, null is returned.
     */
    public elseIf(conditions: Conditions, block?: Block[], replace?: boolean): If;
    /**
     * Adds an else-if branch to the if-block.
     *
     * @param conditions Else-if-conditions.
     * @param content    Else-if-block content.
     * @param replace    If conditions already exist and replace is set to true
     *                   the else-if-block's content will be replaced.
     * 
     * @return If successful, the current class is returned. Otherwise, null is returned.
     */
    public elseIf(conditions: Conditions, content?: StatementOrBlockOrString[], replace?: boolean): If;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public elseIf(arg: any, content?: any, replace=false): If {
        /* Only continue if If-condition doesn't cover provided condition. */
        if (this.conditions.equal(arg)) {
            throw new Error('Condition already covered by "if"');
        }
        let ok = true;
        let elseIf = this._elseIfs.find((value) => value.conditions.equal(arg));

        if (!elseIf) {
            elseIf = new ElseIf(arg, content); /* Create new else-if entry and add the reference to content. */

            this._elseIfs.push(elseIf);
            this._insertContent(insertIndex, elseIf);
        } else if (elseIf && replace) {
            elseIf.clearContent(); /* Replace else-if content. */
            elseIf.addContent(content);
        } else {
            ok = false;
        }
        return ok ? this : null;
    }

    /**
     * Sets the else branch for the if-block
     *
     * @param statement Else-block content.
     * @param replace   If the else-block is already present its content will be replaced.
     *
     * @return If successful, the current class is returned. Otherwise, null is returned.
     */
    public else(statement?: Statement, replace?: boolean): If;
    /**
     * Sets the else branch for the if-block
     *
     * @param statement Else-block content.
     * @param replace   If the else-block is already present its content will be replaced.
     *
     * @return If successful, the current class is returned. Otherwise, null is returned.
     */
    public else(statement?: string, replace?: boolean): If;
    /**
     * Sets the else branch for the if-block
     *
     * @param block   Else-block content.
     * @param replace If the else-block is already present its content will be replaced.
     *
     * @return If successful, the current class is returned. Otherwise, null is returned.
     */
    public else(block?: Block, replace?: boolean): If;
    /**
     * Sets the else branch for the if-block
     *
     * @param statements Else-block content.
     * @param replace    If the else-block is already present its content will be replaced.
     *
     * @return If successful, the current class is returned. Otherwise, null is returned.
     */
    public else(statements?: Statement[], replace?: boolean): If;
    /**
     * Sets the else branch for the if-block
     *
     * @param statements Else-block content.
     * @param replace    If the else-block is already present its content will be replaced.
     *
     * @return If successful, the current class is returned. Otherwise, null is returned.
     */
    public else(statements?: string[], replace?: boolean): If;
    /**
     * Sets the else branch for the if-block
     *
     * @param blocks  Else-block content.
     * @param replace If the else-block is already present its content will be replaced.
     *
     * @return If successful, the current class is returned. Otherwise, null is returned.
     */
    public else(blocks?: Block[], replace?: boolean): If;
    /**
     * Sets the else branch for the if-block
     *
     * @param content Else-block content.
     * @param replace If the else-block is already present its content will be replaced.
     *
     * @return If successful, the current class is returned. Otherwise, null is returned.
     */
    public else(content?: StatementOrBlockOrString[], replace?: boolean): If;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public else(content?: any, replace=false): If {
        let ok = true;

        if (!this._else) {
            this._else = new Else(content); /* Create new else-if entry and add the reference to content. */
            this._insertContent(this.raw.length - 1, this._else);
        } else if (this._else && replace) {
            this._else.clearContent(); /* Replace else content. */
            this._else.addContent(content);
        } else {
            ok = false;
        }
        return ok ? this : null;
    }
}
