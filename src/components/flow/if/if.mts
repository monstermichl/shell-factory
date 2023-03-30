import { ElseIf } from './else-if.mjs';
import { Else } from './else.mjs';
import { Statement } from '../../../base/statement.mjs';
import {
    Block,
    StatementOrBlockOrString,
} from '../../../base/block.mjs';
import { Condition } from '../../condition/condition.mjs';
import { SubshellableConditionBlock } from '../../../blocks/subshellable-condition-block.mjs';

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
export class If extends SubshellableConditionBlock {
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
    constructor(condition: number, statement?: Statement);
    /**
     * If constructor.
     *
     * @param condition If-condition.
     * @param statement If-block content.
     */
    constructor(condition: number, statement?: string);
    /**
     * If constructor.
     *
     * @param condition If-condition.
     * @param block     If-block content.
     */
    constructor(condition: number, block?: Block);
    /**
     * If constructor.
     *
     * @param condition  If-condition.
     * @param statements If-block content.
     */
    constructor(condition: number, statements?: Statement[]);
    /**
     * If constructor.
     *
     * @param condition  If-condition.
     * @param statements If-block content.
     */
    constructor(condition: number, statements?: string[]);
    /**
     * If constructor.
     *
     * @param condition If-condition.
     * @param blocks    If-block content.
     */
    constructor(condition: number, blocks?: Block[]);
    /**
     * If constructor.
     *
     * @param condition If-condition.
     * @param statement If-block content.
     */
    constructor(condition: number, content?: StatementOrBlockOrString[]);
    /**
     * If constructor.
     *
     * @param condition If-condition.
     * @param statement If-block content.
     */
    constructor(condition: boolean, statement?: Statement);
    /**
     * If constructor.
     *
     * @param condition If-condition.
     * @param statement If-block content.
     */
    constructor(condition: boolean, statement?: string);
    /**
     * If constructor.
     *
     * @param condition If-condition.
     * @param block     If-block content.
     */
    constructor(condition: boolean, block?: Block);
    /**
     * If constructor.
     *
     * @param condition  If-condition.
     * @param statements If-block content.
     */
    constructor(condition: boolean, statements?: Statement[]);
    /**
     * If constructor.
     *
     * @param condition  If-condition.
     * @param statements If-block content.
     */
    constructor(condition: boolean, statements?: string[]);
    /**
     * If constructor.
     *
     * @param condition If-condition.
     * @param blocks    If-block content.
     */
    constructor(condition: boolean, blocks?: Block[]);
    /**
     * If constructor.
     *
     * @param condition If-condition.
     * @param statement If-block content.
     */
    constructor(condition: boolean, content?: StatementOrBlockOrString[]);
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
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    constructor(condition: any, content?: any) {
        super('if', condition, 'then', content, 'fi');
    }

    /**
     * Returns the parts of the if-statement (if, else-if(s), else).
     *
     * @returns IfParts object.
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
     * @returns If successful, the current class is returned. Otherwise, null is returned.
     */
    public elseIf(condition: string, statement?: Statement, replace?: boolean): this;
    /**
     * Adds an else-if branch to the if-block.
     *
     * @param condition Else-if-condition.
     * @param statement Else-if-block content.
     * @param replace   If condition already exists and replace is set to true
     *                  the else-if-block's content will be replaced.
     * 
     * @returns If successful, the current class is returned. Otherwise, null is returned.
     */
    public elseIf(condition: string, statement?: string, replace?: boolean): this;
    /**
     * Adds an else-if branch to the if-block.
     *
     * @param condition Else-if-condition.
     * @param block     Else-if-block content.
     * @param replace   If condition already exists and replace is set to true
     *                  the else-if-block's content will be replaced.
     * 
     * @returns If successful, the current class is returned. Otherwise, null is returned.
     */
    public elseIf(condition: string, block?: Block, replace?: boolean): this;
    /**
     * Adds an else-if branch to the if-block.
     *
     * @param condition  Else-if-condition.
     * @param statements Else-if-block content.
     * @param replace    If condition already exists and replace is set to true
     *                   the else-if-block's content will be replaced.
     * 
     * @returns If successful, the current class is returned. Otherwise, null is returned.
     */
    public elseIf(condition: string, statements?: Statement[], replace?: boolean): this;
    /**
     * Adds an else-if branch to the if-block.
     *
     * @param condition  Else-if-condition.
     * @param statements Else-if-block content.
     * @param replace    If condition already exists and replace is set to true
     *                   the else-if-block's content will be replaced.
     * 
     * @returns If successful, the current class is returned. Otherwise, null is returned.
     */
    public elseIf(condition: string, statements?: string[], replace?: boolean): this;
    /**
     * Adds an else-if branch to the if-block.
     *
     * @param condition Else-if-condition.
     * @param blocks    Else-if-block content.
     * @param replace   If condition already exists and replace is set to true
     *                  the else-if-block's content will be replaced.
     * 
     * @returns If successful, the current class is returned. Otherwise, null is returned.
     */
    public elseIf(condition: string, blocks?: Block[], replace?: boolean): this;
    /**
     * Adds an else-if branch to the if-block.
     *
     * @param condition Else-if-condition.
     * @param content   Else-if-block content.
     * @param replace   If condition already exists and replace is set to true
     *                  the else-if-block's content will be replaced.
     * 
     * @returns If successful, the current class is returned. Otherwise, null is returned.
     */
    public elseIf(condition: string, content?: StatementOrBlockOrString[], replace?: boolean): this;
    /**
     * Adds an else-if branch to the if-block.
     *
     * @param condition Else-if-condition.
     * @param statement Else-if-block content.
     * @param replace   If condition already exists and replace is set to true
     *                  the else-if-block's content will be replaced.
     * 
     * @returns If successful, the current class is returned. Otherwise, null is returned.
     */
    public elseIf(condition: Condition, statement?: Statement, replace?: boolean): this;
    /**
     * Adds an else-if branch to the if-block.
     *
     * @param condition Else-if-condition.
     * @param statement Else-if-block content.
     * @param replace   If condition already exists and replace is set to true
     *                  the else-if-block's content will be replaced.
     * 
     * @returns If successful, the current class is returned. Otherwise, null is returned.
     */
    public elseIf(condition: Condition, statement?: string, replace?: boolean): this;
    /**
     * Adds an else-if branch to the if-block.
     *
     * @param condition Else-if-condition.
     * @param block     Else-if-block content.
     * @param replace   If condition already exists and replace is set to true
     *                  the else-if-block's content will be replaced.
     * 
     * @returns If successful, the current class is returned. Otherwise, null is returned.
     */
    public elseIf(condition: Condition, block?: Block, replace?: boolean): this;
    /**
     * Adds an else-if branch to the if-block.
     *
     * @param condition  Else-if-condition.
     * @param statements Else-if-block content.
     * @param replace    If condition already exists and replace is set to true
     *                   the else-if-block's content will be replaced.
     * 
     * @returns If successful, the current class is returned. Otherwise, null is returned.
     */
    public elseIf(condition: Condition, statements?: Statement[], replace?: boolean): this;
    /**
     * Adds an else-if branch to the if-block.
     *
     * @param condition  Else-if-condition.
     * @param statements Else-if-block content.
     * @param replace    If condition already exists and replace is set to true
     *                   the else-if-block's content will be replaced.
     * 
     * @returns If successful, the current class is returned. Otherwise, null is returned.
     */
    public elseIf(condition: Condition, statements?: string[], replace?: boolean): this;
    /**
     * Adds an else-if branch to the if-block.
     *
     * @param condition Else-if-condition.
     * @param blocks    Else-if-block content.
     * @param replace   If condition already exists and replace is set to true
     *                  the else-if-block's content will be replaced.
     * 
     * @returns If successful, the current class is returned. Otherwise, null is returned.
     */
    public elseIf(condition: Condition, blocks?: Block[], replace?: boolean): this;
    /**
     * Adds an else-if branch to the if-block.
     *
     * @param condition Else-if-condition.
     * @param content   Else-if-block content.
     * @param replace   If condition already exists and replace is set to true
     *                  the else-if-block's content will be replaced.
     * 
     * @returns If successful, the current class is returned. Otherwise, null is returned.
     */
    public elseIf(condition: Condition, content?: StatementOrBlockOrString[], replace?: boolean): this;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public elseIf(arg: any, content?: any, replace=false): this {
        const condition = Condition.fromString(arg);
        
        /* Only continue if If-condition doesn't cover provided condition. */
        if (this.condition.equal(condition)) {
            throw new Error('Condition already covered by "if"');
        }
        let ok = true;
        let elseIf = this._elseIfs.find((value) => value.condition.equal(condition));
        
        if (!elseIf) {
            let insertIndex = -1;

            elseIf = new ElseIf(condition, content); /* Create new else-if entry and add the reference to content. */
            this._elseIfs.push(elseIf);

            /* Make sure, to push else-if before else. */
            if (this.raw.at(insertIndex - 1) instanceof Else) {
                insertIndex -= 1;
            }
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
     * @returns If successful, the current class is returned. Otherwise, null is returned.
     */
    public else(statement?: Statement, replace?: boolean): this;
    /**
     * Sets the else branch for the if-block
     *
     * @param statement Else-block content.
     * @param replace   If the else-block is already present its content will be replaced.
     *
     * @returns If successful, the current class is returned. Otherwise, null is returned.
     */
    public else(statement?: string, replace?: boolean): this;
    /**
     * Sets the else branch for the if-block
     *
     * @param block   Else-block content.
     * @param replace If the else-block is already present its content will be replaced.
     *
     * @returns If successful, the current class is returned. Otherwise, null is returned.
     */
    public else(block?: Block, replace?: boolean): this;
    /**
     * Sets the else branch for the if-block
     *
     * @param statements Else-block content.
     * @param replace    If the else-block is already present its content will be replaced.
     *
     * @returns If successful, the current class is returned. Otherwise, null is returned.
     */
    public else(statements?: Statement[], replace?: boolean): this;
    /**
     * Sets the else branch for the if-block
     *
     * @param statements Else-block content.
     * @param replace    If the else-block is already present its content will be replaced.
     *
     * @returns If successful, the current class is returned. Otherwise, null is returned.
     */
    public else(statements?: string[], replace?: boolean): this;
    /**
     * Sets the else branch for the if-block
     *
     * @param blocks  Else-block content.
     * @param replace If the else-block is already present its content will be replaced.
     *
     * @returns If successful, the current class is returned. Otherwise, null is returned.
     */
    public else(blocks?: Block[], replace?: boolean): this;
    /**
     * Sets the else branch for the if-block
     *
     * @param content Else-block content.
     * @param replace If the else-block is already present its content will be replaced.
     *
     * @returns If successful, the current class is returned. Otherwise, null is returned.
     */
    public else(content?: StatementOrBlockOrString[], replace?: boolean): this;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public else(content?: any, replace=false): this {
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
