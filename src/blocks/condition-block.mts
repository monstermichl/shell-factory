import { WrapBlock } from './wrap-block.mjs';
import { Statement } from '../base/statement.mjs';
import {
    Block,
    StatementOrBlockOrString,
} from '../base/block.mjs';
import { Conditions } from '../components/condition/conditions.mjs';
import {
    Link,
    LinkedCondition,
} from '../components/condition/linked-condition.mjs';
import { Condition } from '../components/condition/condition.mjs';
import { ChainType } from '../base/statement.mjs';
import { IChainable } from '../interfaces/chainable.mjs';

/**
 * ConditionBlock bracket type.
 */
export enum BracketType {
    Square,
    Round,
    None,
}

/**
 * Serves as the base for all blocks that require to handle conditions
 * (e.g., If, While, ...).
 */
export abstract class ConditionBlock extends WrapBlock implements IChainable {
    protected _conditions: Conditions;

    private _testOverwritten: boolean;
    private _conditionKeyword: string;
    private _bracketType: BracketType;
    private _blockStartKeyword: string;
    private _blockEndKeyword: string;

    /**
     * Returns the condition block's conditions.
     */
    public get conditions(): Conditions {
        return this._conditions;
    }

    public get test(): this {
        this._testOverwritten = true;
        return this._test(true);
    }

    public get dontTest(): this {
        this._testOverwritten = true;
        return this._test(false);
    }

    /**
     * ConditionBlock constructor.
     *
     * @param conditionKeyword  ConditionBlock start keyword (e.g., 'if', 'while', 'for', ...).
     * @param bracketType       Bracket type.
     * @param blockStartKeyword ConditionBlock body start keyword (e.g. 'then', 'do', ...).
     * @param condition         Actual condition.
     * @param statement         ConditionBlock body content.
     * @param blockEndKeyword   ConditionBlock body end keyword (e.g. 'fi', 'done', ...).
     */
    protected constructor(conditionKeyword: string, bracketType: BracketType, condition: string, blockStartKeyword: string, statement?: Statement, blockEndKeyword?: string);
    /**
     * ConditionBlock constructor.
     *
     * @param conditionKeyword  ConditionBlock start keyword (e.g., 'if', 'while', 'for', ...).
     * @param bracketType       Bracket type.
     * @param blockStartKeyword ConditionBlock body start keyword (e.g. 'then', 'do', ...).
     * @param condition         Actual condition.
     * @param statement         ConditionBlock body content.
     * @param blockEndKeyword   ConditionBlock body end keyword (e.g. 'fi', 'done', ...).
     */
    protected constructor(conditionKeyword: string, bracketType: BracketType, condition: string, blockStartKeyword: string, statement?: string, blockEndKeyword?: string);
    /**
     * ConditionBlock constructor.
     *
     * @param conditionKeyword  ConditionBlock start keyword (e.g., 'if', 'while', 'for', ...).
     * @param bracketType       Bracket type.
     * @param blockStartKeyword ConditionBlock body start keyword (e.g. 'then', 'do', ...).
     * @param condition         Actual condition.
     * @param block             ConditionBlock body content.
     * @param blockEndKeyword   ConditionBlock body end keyword (e.g. 'fi', 'done', ...).
     */
    protected constructor(conditionKeyword: string, bracketType: BracketType, condition: string, blockStartKeyword: string, block?: Block, blockEndKeyword?: string);
    /**
     * ConditionBlock constructor.
     *
     * @param conditionKeyword  ConditionBlock start keyword (e.g., 'if', 'while', 'for', ...).
     * @param bracketType       Bracket type.
     * @param blockStartKeyword ConditionBlock body start keyword (e.g. 'then', 'do', ...).
     * @param condition         Actual condition.
     * @param statements        ConditionBlock body content.
     * @param blockEndKeyword   ConditionBlock body end keyword (e.g. 'fi', 'done', ...).
     */
    protected constructor(conditionKeyword: string, bracketType: BracketType, condition: string, blockStartKeyword: string, statements?: Statement[], blockEndKeyword?: string);
    /**
     * ConditionBlock constructor.
     *
     * @param conditionKeyword  ConditionBlock start keyword (e.g., 'if', 'while', 'for', ...).
     * @param bracketType       Bracket type.
     * @param blockStartKeyword ConditionBlock body start keyword (e.g. 'then', 'do', ...).
     * @param condition         Actual condition.
     * @param statements        ConditionBlock body content.
     * @param blockEndKeyword   ConditionBlock body end keyword (e.g. 'fi', 'done', ...).
     */
    protected constructor(conditionKeyword: string, bracketType: BracketType, condition: string, blockStartKeyword: string, statements?: string[], blockEndKeyword?: string);
    /**
     * ConditionBlock constructor.
     *
     * @param conditionKeyword  ConditionBlock start keyword (e.g., 'if', 'while', 'for', ...).
     * @param bracketType       Bracket type.
     * @param blockStartKeyword ConditionBlock body start keyword (e.g. 'then', 'do', ...).
     * @param condition         Actual condition.
     * @param blocks            ConditionBlock body content.
     * @param blockEndKeyword   ConditionBlock body end keyword (e.g. 'fi', 'done', ...).
     */
    protected constructor(conditionKeyword: string, bracketType: BracketType, condition: string, blockStartKeyword: string, blocks?: Block[], blockEndKeyword?: string);
    /**
     * ConditionBlock constructor.
     *
     * @param conditionKeyword  ConditionBlock start keyword (e.g., 'if', 'while', 'for', ...).
     * @param bracketType       Bracket type.
     * @param blockStartKeyword ConditionBlock body start keyword (e.g. 'then', 'do', ...).
     * @param condition         Actual condition.
     * @param content           ConditionBlock body content.
     * @param blockEndKeyword   ConditionBlock body end keyword (e.g. 'fi', 'done', ...).
     */
    protected constructor(conditionKeyword: string, bracketType: BracketType, condition: string, blockStartKeyword: string, content?: StatementOrBlockOrString[], blockEndKeyword?: string);
    /**
     * ConditionBlock constructor.
     *
     * @param conditionKeyword  ConditionBlock start keyword (e.g., 'if', 'while', 'for', ...).
     * @param bracketType       Bracket type.
     * @param blockStartKeyword ConditionBlock body start keyword (e.g. 'then', 'do', ...).
     * @param condition         Actual condition.
     * @param statement         ConditionBlock body content.
     * @param blockEndKeyword   ConditionBlock body end keyword (e.g. 'fi', 'done', ...).
     */
    protected constructor(conditionKeyword: string, bracketType: BracketType, condition: Condition, blockStartKeyword: string, statement?: Statement, blockEndKeyword?: string);
    /**
     * ConditionBlock constructor.
     *
     * @param conditionKeyword  ConditionBlock start keyword (e.g., 'if', 'while', 'for', ...).
     * @param bracketType       Bracket type.
     * @param blockStartKeyword ConditionBlock body start keyword (e.g. 'then', 'do', ...).
     * @param condition         Actual condition.
     * @param statement         ConditionBlock body content.
     * @param blockEndKeyword   ConditionBlock body end keyword (e.g. 'fi', 'done', ...).
     */
    protected constructor(conditionKeyword: string, bracketType: BracketType, condition: Condition, blockStartKeyword: string, statement?: string, blockEndKeyword?: string);
    /**
     * ConditionBlock constructor.
     *
     * @param conditionKeyword  ConditionBlock start keyword (e.g., 'if', 'while', 'for', ...).
     * @param bracketType       Bracket type.
     * @param blockStartKeyword ConditionBlock body start keyword (e.g. 'then', 'do', ...).
     * @param condition         Actual condition.
     * @param block             ConditionBlock body content.
     * @param blockEndKeyword   ConditionBlock body end keyword (e.g. 'fi', 'done', ...).
     */
    protected constructor(conditionKeyword: string, bracketType: BracketType, condition: Condition, blockStartKeyword: string, block?: Block, blockEndKeyword?: string);
    /**
     * ConditionBlock constructor.
     *
     * @param conditionKeyword  ConditionBlock start keyword (e.g., 'if', 'while', 'for', ...).
     * @param bracketType       Bracket type.
     * @param blockStartKeyword ConditionBlock body start keyword (e.g. 'then', 'do', ...).
     * @param condition         Actual condition.
     * @param statements        ConditionBlock body content.
     * @param blockEndKeyword   ConditionBlock body end keyword (e.g. 'fi', 'done', ...).
     */
    protected constructor(conditionKeyword: string, bracketType: BracketType, condition: Condition, blockStartKeyword: string, statements?: Statement[], blockEndKeyword?: string);
    /**
     * ConditionBlock constructor.
     *
     * @param conditionKeyword  ConditionBlock start keyword (e.g., 'if', 'while', 'for', ...).
     * @param bracketType       Bracket type.
     * @param blockStartKeyword ConditionBlock body start keyword (e.g. 'then', 'do', ...).
     * @param condition         Actual condition.
     * @param statements        ConditionBlock body content.
     * @param blockEndKeyword   ConditionBlock body end keyword (e.g. 'fi', 'done', ...).
     */
    protected constructor(conditionKeyword: string, bracketType: BracketType, condition: Condition, blockStartKeyword: string, statements?: string[], blockEndKeyword?: string);
    /**
     * ConditionBlock constructor.
     *
     * @param conditionKeyword  ConditionBlock start keyword (e.g., 'if', 'while', 'for', ...).
     * @param bracketType       Bracket type.
     * @param blockStartKeyword ConditionBlock body start keyword (e.g. 'then', 'do', ...).
     * @param condition         Actual condition.
     * @param blocks            ConditionBlock body content.
     * @param blockEndKeyword   ConditionBlock body end keyword (e.g. 'fi', 'done', ...).
     */
    protected constructor(conditionKeyword: string, bracketType: BracketType, condition: Condition, blockStartKeyword: string, blocks?: Block[], blockEndKeyword?: string);
    /**
     * ConditionBlock constructor.
     *
     * @param conditionKeyword  ConditionBlock start keyword (e.g., 'if', 'while', 'for', ...).
     * @param bracketType       Bracket type.
     * @param blockStartKeyword ConditionBlock body start keyword (e.g. 'then', 'do', ...).
     * @param condition         Actual condition.
     * @param content           ConditionBlock body content.
     * @param blockEndKeyword   ConditionBlock body end keyword (e.g. 'fi', 'done', ...).
     */
    protected constructor(conditionKeyword: string, bracketType: BracketType, condition: Condition, blockStartKeyword: string, content?: StatementOrBlockOrString[], blockEndKeyword?: string);
    /**
     * ConditionBlock constructor.
     *
     * @param conditionKeyword  ConditionBlock start keyword (e.g., 'if', 'while', 'for', ...).
     * @param bracketType       Bracket type.
     * @param blockStartKeyword ConditionBlock body start keyword (e.g. 'then', 'do', ...).
     * @param condition         Actual condition.
     * @param statement         ConditionBlock body content.
     * @param blockEndKeyword   ConditionBlock body end keyword (e.g. 'fi', 'done', ...).
     */
    protected constructor(conditionKeyword: string, bracketType: BracketType, conditions: Conditions, blockStartKeyword: string, statement?: Statement, blockEndKeyword?: string);
    /**
     * ConditionBlock constructor.
     *
     * @param conditionKeyword  ConditionBlock start keyword (e.g., 'if', 'while', 'for', ...).
     * @param bracketType       Bracket type.
     * @param blockStartKeyword ConditionBlock body start keyword (e.g. 'then', 'do', ...).
     * @param condition         Actual condition.
     * @param statement         ConditionBlock body content.
     * @param blockEndKeyword   ConditionBlock body end keyword (e.g. 'fi', 'done', ...).
     */
    protected constructor(conditionKeyword: string, bracketType: BracketType, conditions: Conditions, blockStartKeyword: string, statement?: string, blockEndKeyword?: string);
    /**
     * ConditionBlock constructor.
     *
     * @param conditionKeyword  ConditionBlock start keyword (e.g., 'if', 'while', 'for', ...).
     * @param bracketType       Bracket type.
     * @param blockStartKeyword ConditionBlock body start keyword (e.g. 'then', 'do', ...).
     * @param condition         Actual condition.
     * @param block             ConditionBlock body content.
     * @param blockEndKeyword   ConditionBlock body end keyword (e.g. 'fi', 'done', ...).
     */
    protected constructor(conditionKeyword: string, bracketType: BracketType, conditions: Conditions, blockStartKeyword: string, block?: Block, blockEndKeyword?: string);
    /**
     * ConditionBlock constructor.
     *
     * @param conditionKeyword  ConditionBlock start keyword (e.g., 'if', 'while', 'for', ...).
     * @param bracketType       Bracket type.
     * @param blockStartKeyword ConditionBlock body start keyword (e.g. 'then', 'do', ...).
     * @param condition         Actual condition.
     * @param statements        ConditionBlock body content.
     * @param blockEndKeyword   ConditionBlock body end keyword (e.g. 'fi', 'done', ...).
     */
    protected constructor(conditionKeyword: string, bracketType: BracketType, conditions: Conditions, blockStartKeyword: string, statements?: Statement[], blockEndKeyword?: string);
    /**
     * ConditionBlock constructor.
     *
     * @param conditionKeyword  ConditionBlock start keyword (e.g., 'if', 'while', 'for', ...).
     * @param bracketType       Bracket type.
     * @param blockStartKeyword ConditionBlock body start keyword (e.g. 'then', 'do', ...).
     * @param condition         Actual condition.
     * @param statements        ConditionBlock body content.
     * @param blockEndKeyword   ConditionBlock body end keyword (e.g. 'fi', 'done', ...).
     */
    protected constructor(conditionKeyword: string, bracketType: BracketType, conditions: Conditions, blockStartKeyword: string, statements?: string[], blockEndKeyword?: string);
    /**
     * ConditionBlock constructor.
     *
     * @param conditionKeyword  ConditionBlock start keyword (e.g., 'if', 'while', 'for', ...).
     * @param bracketType       Bracket type.
     * @param blockStartKeyword ConditionBlock body start keyword (e.g. 'then', 'do', ...).
     * @param condition         Actual condition.
     * @param blocks            ConditionBlock body content.
     * @param blockEndKeyword   ConditionBlock body end keyword (e.g. 'fi', 'done', ...).
     */
    protected constructor(conditionKeyword: string, bracketType: BracketType, conditions: Conditions, blockStartKeyword: string, blocks?: Block[], blockEndKeyword?: string);
    /**
     * ConditionBlock constructor.
     *
     * @param conditionKeyword  ConditionBlock start keyword (e.g., 'if', 'while', 'for', ...).
     * @param bracketType       Bracket type.
     * @param blockStartKeyword ConditionBlock body start keyword (e.g. 'then', 'do', ...).
     * @param condition         Actual condition.
     * @param content           ConditionBlock body content.
     * @param blockEndKeyword   ConditionBlock body end keyword (e.g. 'fi', 'done', ...).
     */
    protected constructor(conditionKeyword: string, bracketType: BracketType, conditions: Conditions, blockStartKeyword: string, content?: StatementOrBlockOrString[], blockEndKeyword?: string);
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    protected constructor(conditionKeyword: string, bracketType: BracketType, arg: any, blockStartKeyword: string, content?: any, blockEndKeyword?: string) {
        const conditions = Conditions.convert(arg);
        const openingStatement = ConditionBlock._buildOpeningStatementString(conditionKeyword, bracketType, conditions, blockStartKeyword);

        super(openingStatement, content, blockEndKeyword);

        this._conditionKeyword = conditionKeyword;
        this._bracketType = bracketType;
        this._conditions = conditions;
        this._blockStartKeyword = blockStartKeyword;
        this._blockEndKeyword = blockEndKeyword;
    }

    /**
     * Read from source.
     * 
     * @param source File to read from.
     * @returns The current instance.
     */
    public read(source: string): this;
    /**
     * Read from source.
     * 
     * @param source File to read from.
     * @returns The current instance.
     */
    public read(source: number): this;
    /**
     * Read from source.
     * 
     * @param source File to read from.
     * @returns The current instance.
     */
    public read(source: boolean): this;
    /**
     * Read from source.
     * 
     * @param source File to read from.
     * @returns The current instance.
     */
    public read(source: Statement): this;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public read(source: any): this {
        if (this.closingStatement) {
            this.closingStatement.read(source);

            /* If test has not been overwritten, dis-/enable it. */
            if (!this._testOverwritten) {
                const chain = this.closingStatement.chain;

                /* Disable testing if first chain element is of read-type. */
                if (chain.length && (chain[0].type === ChainType.Read)) {
                    /* Disable testing. */
                    this._test(false);
                } else {
                    /* Enable testing. */
                    this._test(true);
                }
            }
        }
        return this;
    }

    /**
     * Write to target.
     * 
     * @param target Target to write to.
     * @returns The current instance.
     */
    public write(target: string): this;
    /**
     * Write to target.
     * 
     * @param target Target to write to.
     * @returns The current instance.
     */
    public write(target: number): this;
    /**
     * Write to target.
     * 
     * @param target Target to write to.
     * @returns The current instance.
     */
    public write(target: boolean): this;
    /**
     * Write to target.
     * 
     * @param target Target to write to.
     * @returns The current instance.
     */
    public write(target: Statement): this;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public write(target: any): this {
        if (this.closingStatement) {
            this.closingStatement.write(target);
        }
        return this;
    }

    /**
     * Append to target.
     * 
     * @param target Target to append to.
     * @returns The current instance.
     */
    public append(target: string): this;
    /**
     * Append to target.
     * 
     * @param target Target to append to.
     * @returns The current instance.
     */
    public append(target: number): this;
    /**
     * Append to target.
     * 
     * @param target Target to append to.
     * @returns The current instance.
     */
    public append(target: boolean): this;
    /**
     * Append to target.
     * 
     * @param target Target to append to.
     * @returns The current instance.
     */
    public append(target: Statement): this;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public append(target: any): this {
        if (this.closingStatement) {
            this.closingStatement.append(target);
        }
        return this;
    }

    /**
     * Pipes the output into another command.
     * 
     * @param target Command to pipe to.
     * @returns The current instance.
     */
    public pipe(target: string): this;
    /**
     * Pipes the output into another command.
     * 
     * @param target Command to pipe to.
     * @returns The current instance.
     */
    public pipe(target: number): this;
    /**
     * Pipes the output into another command.
     * 
     * @param target Command to pipe to.
     * @returns The current instance.
     */
    public pipe(target: boolean): this;
    /**
     * Pipes the output into another command.
     * 
     * @param target Command to pipe to.
     * @returns The current instance.
     */
    public pipe(target: Statement): this;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public pipe(target: any): this {
        if (this.closingStatement) {
            this.closingStatement.pipe(target);
        }
        return this;
    }

    /**
     * Creates the opening statement.
     *
     * @param conditionKeyword  Condition keyword (e.g. if).
     * @param bracketType       Which brackets shall be used.
     * @param conditions        Conditions to incorporate.
     * @param blockStartKeyword Block end-keyword (e.g. fi)
     *
     * @returns The built opening statement string.
     */
    private static _buildOpeningStatementString(conditionKeyword: string, bracketType: BracketType, conditions: Conditions, blockStartKeyword: string): string {
        if (!conditionKeyword) {
            throw new Error('Missing condition');
        } else if (!blockStartKeyword) {
            throw new Error('Missing block-start keyword');
        }
        let startBracket = '';
        let stopBracket = '';

        switch (bracketType) {
            case BracketType.Square:
                startBracket = '[';
                stopBracket = ']';
                break;
            case BracketType.Round:
                startBracket = '(';
                stopBracket = ')';
                break;
        }
        /* Build conditions string. */
        let conditionString = '';
        conditions.conditions.forEach((condition) => {
            const value = condition.value;

            if (condition instanceof LinkedCondition) {
                conditionString += ` ${condition.link === Link.And ? '&&' : '||'} `;
            }
            conditionString += `${startBracket}${startBracket ? ` ${value}` : value}${startBracket ? ` ${stopBracket}` : stopBracket}`; /* Add space in front if brackets are used. */
        });
        return `${conditionKeyword} ${conditionString}; ${blockStartKeyword}`;
    }

    /**
     * Sets if the condition shall be tested.
     *
     * @param test If true the condition is being tested (brackets).
     * @returns The current instance.
     */
    private _test(test: boolean): this {
        return this._updateOpeningStatement(test);
    }

    /**
     * Updates the opening statement based on the test flag.
     *
     * @param test If true the condition is being tested (brackets).
     * @returns The current instance.
     */
    private _updateOpeningStatement(test: boolean): this {
        this._openingStatement.statement = ConditionBlock._buildOpeningStatementString(
            this._conditionKeyword,
            test ? this._bracketType : BracketType.None,
            this._conditions,
            this._blockStartKeyword,
        );
        return this;
    }
}
