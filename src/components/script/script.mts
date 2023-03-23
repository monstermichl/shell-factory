import {
    Block,
    StatementOrBlock,
    StatementOrBlockOrString,
} from '../../base/block.mjs';
import { Statement } from '../../base/statement.mjs';
import { Function } from '../function/function.mjs';
import { If } from '../flow/if/if.mjs';
import { While } from '../flow/while/while.mjs';
import { Until } from '../flow/until/until.mjs';
import { Case } from '../flow/case/case.mjs';
import { CaseOption } from '../flow/case/case-option.mjs';
import { ElseIf } from '../flow/if/else-if.mjs';
import { Else } from '../flow/if/else.mjs';
import { For } from '../flow/for/for.mjs';
import { copyOver } from '../../helpers/copy.mjs';
import {
    ClosingStatement,
    OpeningStatement,
    WrapBlock,
} from '../../blocks/wrap-block.mjs';
import { Select } from '../select/select.mjs';
import { Command } from '../../base/command.mjs';

/**
 * Used to help the Script dump-method to understand, in which
 * context the current content is being processed. These enum
 * values are used for bit masking (hence, the bit-shifting
 * notation).
 */
enum ContextFlags {
    Block      = 1 <<  0, /*    1 */
    WrapBlock  = 1 <<  1, /*    2 */
    Function   = 1 <<  2, /*    4 */
    If         = 1 <<  3, /*    8 */
    ElseIf     = 1 <<  4, /*   16 */
    Else       = 1 <<  5, /*   32 */
    While      = 1 <<  6, /*   64 */
    Until      = 1 <<  7, /*  128 */
    For        = 1 <<  8, /*  256 */
    Case       = 1 <<  9, /*  512 */
    CaseOption = 1 << 10, /* 1024 */
    Select     = 1 << 11, /* 2048 */
}

/**
 * Script string dump block configuration.
 */
export type Format = {
    indent?: number;
    newlinesBefore?: number;
    newlinesAfter?: number;
    indentBeforeComment?: number;
};

/**
 * Script string dump configuration.
 */
export type Config = {
    common?: Format;
    detailed?: {
        function?: Format;
        if?: Format;
        elseIf?: Format;
        else?: Format;
        while?: Format;
        until?: Format;
        for?: Format;
        select?: Format;
        case?: Format;
        caseOption?: Format;
        statement?: Format;
        command?: Format;
        interpreter?: Omit<Format, 'newlinesBefore'>;
    }
};

/**
 * Represents the interpreter (shebang) statement.
 */
export class Interpreter extends Statement {
    private _path: string;

    constructor(path: string) {
        const shebang = '#!';
        const shebangRegex = new RegExp(`^${shebang}`);
        const cleanedPath = path.replace(shebangRegex, '');
        const interpreter = `${shebang}${cleanedPath}`;

        /* Removes the shebang from the provided interpreter and assigns it. */
        super(interpreter);
        this._path = cleanedPath;
    }

    public get value(): string {
        return this.statement;
    }

    public get path(): string {
        return this._path;
    }

    public static get defaultInterpreter(): Interpreter {
        return new Interpreter('/bin/sh');
    }
}

/**
 * Represents a Bourne Shell script.
 */
export class Script extends Block {
    private static readonly _DEFAULT_INDENT = 2;
    private static readonly _DEFAULT_COMMENT_INDENT = 1;
    private static readonly _DEFAULT_NEW_LINES_AFTER_INTERPRETER = 1;
    private static readonly _DEFAULT_NEW_LINES_BEFORE_COMMON = 0;
    private static readonly _DEFAULT_NEW_LINES_BEFORE_FLOW_BLOCKS = 1;
    private static readonly _DEFAULT_CONFIG = {
        common: {
            indent: Script._DEFAULT_INDENT,
            newlinesBefore: Script._DEFAULT_NEW_LINES_BEFORE_COMMON,
            indentBeforeComment: Script._DEFAULT_COMMENT_INDENT,
        },
        detailed: {
            interpreter: { newlinesAfter: Script._DEFAULT_NEW_LINES_AFTER_INTERPRETER },
            function: { newlinesBefore: Script._DEFAULT_NEW_LINES_BEFORE_FLOW_BLOCKS },
            if: { newlinesBefore: Script._DEFAULT_NEW_LINES_BEFORE_FLOW_BLOCKS },
            while: { newlinesBefore: Script._DEFAULT_NEW_LINES_BEFORE_FLOW_BLOCKS },
            until: { newlinesBefore: Script._DEFAULT_NEW_LINES_BEFORE_FLOW_BLOCKS },
            for: { newlinesBefore: Script._DEFAULT_NEW_LINES_BEFORE_FLOW_BLOCKS },
            select: { newlinesBefore: Script._DEFAULT_NEW_LINES_BEFORE_FLOW_BLOCKS },
            case: { newlinesBefore: Script._DEFAULT_NEW_LINES_BEFORE_FLOW_BLOCKS },
        }
    } as Config;

    private _interpreter = Interpreter.defaultInterpreter;
    private _config = Script._correctConfig();

    /**
     * Script constructor.
     *
     * @param statement Script content.
     */
    constructor(statement?: Statement);
    /**
     * Script constructor.
     *
     * @param statement Script content.
     */
    constructor(statement?: string);
    /**
     * Script constructor.
     *
     * @param block Script content.
     */
    constructor(block?: Block);
    /**
     * Script constructor.
     *
     * @param statements Script content.
     */
    constructor(statements?: Statement[]);
    /**
     * Script constructor.
     *
     * @param statements Script content.
     */
    constructor(statements?: string[]);
    /**
     * Script constructor.
     *
     * @param blocks Script content.
     */
    constructor(blocks?: Block[]);
    /**
     * Script constructor.
     *
     * @param content Script content.
     */
    constructor(content?: StatementOrBlockOrString[]);
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    constructor(content?: any) {
        super(content);
        this.setInterpreter(this._interpreter.statement);
    }

    /**
     * Gets the default config for dumping the script as string.
     */
    public static get defaultConfig(): Config {
        return Script._correctConfig();
    }

    /**
     * Gets the default config for dumping the script as string.
     */
    public get config(): Config {
        return this._config;
    }

    /**
     * Sets the default config for dumping the script as string.
     */
    public set config(config: Config) {
        this._config = config;
    }

    /**
     * Gets the script interpreter location.
     */
    public getInterpreter(): Interpreter {
        return this._interpreter;
    }

    /**
     * Sets the script interpreter location.
     *
     * @param interpreter Interpreter path.
     */
    public setInterpreter(interpreter: string): this;
    /**
     * Sets the script interpreter location.
     *
     * @param interpreter Interpreter path.
     */
    public setInterpreter(interpreter: Interpreter): this;
    /**
     * Sets the script interpreter location.
     *
     * @param interpreter Interpreter path.
     */
    public setInterpreter(interpreter: unknown): this {
        if (interpreter)
        {
            this._interpreter = (interpreter instanceof Interpreter) ? interpreter : new Interpreter(`${interpreter}`);

            /* Look for an already existing interpreter. */
            const index = this._content.findIndex((value) => value instanceof Interpreter);

            if (index >= 0) {
                this._content[index] = this._interpreter;
            } else if (this.raw.length === 0) {
                this._addContent(this._interpreter);
            } else {
                /* Defensive branch which should never be reached since
                interpreter is set in constructor. */
                this._insertContent(0, this._interpreter);
            }
        }
        return this;
    }

    /**
     * The magic function that turns the carefully crafted script
     * structure into a string.
     *
     * @param config: Config to configure the script dumping.
     * @returns Script string.
     */
    public dump(config = this._config): string {
        return this._dump(this.raw, config);
    }

    /**
     * Internal dump function.
     *
     * @param content      Stratements or Blocks which shall be stringified.
     * @param spaces       Whitespaces before each statement.
     * @param indentFactor Indent by which whitespaces are multiplied.
     * @param contextFlags Additional info for recursive calls to understand,
     *                     in which context the content is being processed.
     *
     * @returns String representation of the provided Statement or Block list.
     */
    private _dump(content: StatementOrBlock[], config: Config, indentFactor=0, contextFlags=ContextFlags.Block): string {
        const checkValue = (value: number) => ((typeof value === 'number') && (value >= 0));
        const contextFlagsCopy = contextFlags;
        let s = '';

        /* Copy and correct config. */
        config = Script._correctConfig(config);

        /* Process common indent. */
        let commonIndent = config.common?.indent;

        /* Correct indent if necessary. */
        if (!checkValue(commonIndent)) {
            commonIndent = Script._DEFAULT_INDENT;
        }

        /* Defensive branches which should never be reached. */
        if (indentFactor < 0) {
            indentFactor = 0;
        }
        let previousNewlines = 0;
        
        content.forEach((value, index) => {
            let indentAddition = 0;
            let format: Format = null;

            /* Statements */
            if (value instanceof Interpreter) {
                format = config?.detailed?.interpreter;
            } else if ((value instanceof OpeningStatement) || (value instanceof ClosingStatement)) {
                /* Nothing to do. Ignore special formatting for now. */
                format = config?.detailed?.statement;
            } else if (value instanceof Command) {
                format = config?.detailed?.command;
            } else if (value instanceof Statement) {
                format = config?.detailed?.statement;
            /* Blocks */
            } else if (value instanceof Function) {
                format = config?.detailed?.function;
                contextFlags |= ContextFlags.Function;
            } else if (value instanceof If) {
                format = config?.detailed?.if;
                contextFlags |= ContextFlags.If;
            } else if (value instanceof ElseIf) {
                format = config?.detailed?.elseIf;
                contextFlags |= ContextFlags.ElseIf;
            } else if (value instanceof Else) {
                format = config?.detailed?.else;
                contextFlags |= ContextFlags.Else;
            } else if (value instanceof While) {
                format = config?.detailed?.while;
                contextFlags |= ContextFlags.While;
            } else if (value instanceof Until) {
                format = config?.detailed?.until;
                contextFlags |= ContextFlags.Until;
            } else if (value instanceof Select) {
                format = config?.detailed?.select;
                contextFlags |= ContextFlags.Select;
            } else if (value instanceof For) {
                format = config?.detailed?.for;
                contextFlags |= ContextFlags.For;
            } else if (value instanceof Case) {
                format = config?.detailed?.case;
                contextFlags |= ContextFlags.Case;
            } else if (value instanceof CaseOption) {
                format = config?.detailed?.caseOption;
                contextFlags |= ContextFlags.CaseOption;
            } else {
                indentAddition = 1;
                format = Script.defaultConfig.common;
            }
            
            /* Make sure there's a format. */
            if (!format) {
                format = config.common;
            }

            /* Add newlines before statement or block. */
            if (format?.newlinesBefore > 0) {
                let newlinesBefore = 0;

                /* Use only the difference between previous newlines and current newlines. */
                if (format.newlinesBefore > previousNewlines) {
                    newlinesBefore = format.newlinesBefore - previousNewlines;
                }

                if ((index > 0) || (contextFlagsCopy & ContextFlags.WrapBlock)) {
                    s += '\n'.repeat(newlinesBefore);
                }
            }

            if (value instanceof Statement) {
                let indentBeforeComment = format?.indentBeforeComment;
                
                /* Correct comment-indent if necessary. */
                if (!checkValue(indentBeforeComment)) {
                    indentBeforeComment = Script._DEFAULT_COMMENT_INDENT;
                }
                s += `${' '.repeat((checkValue(format.indent) ? format.indent : commonIndent) * indentFactor)}${value.value}`;

                /* Add comment behind line. */
                if (value.comment) {
                    s += `${' '.repeat(value.statement ? indentBeforeComment : 0)}# ${value.comment}`;
                }
                s += '\n';
            } else {
                /* Set basic content-type. */
                if (value instanceof WrapBlock) {
                    contextFlags = ContextFlags.WrapBlock;
                } else {
                    contextFlags = ContextFlags.Block;
                }
                const indent = checkValue(format?.indent) ? format.indent : commonIndent;

                /* Add comment before block. */
                if (value.comment) {
                    s += `${' '.repeat(indent * indentFactor)}# ${value.comment}\n`;
                }
                /* Process children. */
                s += this._dump(value.raw, config, indentFactor + indentAddition, contextFlags);
            }
            /* Add newlines after statement or block. */
            previousNewlines = (format?.newlinesAfter > 0) ? format?.newlinesAfter : 0;

            if (previousNewlines > 0) {
                s += '\n'.repeat(previousNewlines);
            }
        });
        return s;
    }

    /**
     * Corrects the provided config to at least fulfil the default conditions.
     *
     * @param config Config to correct.
     * @returns Corrected config.
     */
    private static _correctConfig(config?: Config): Config {
        const correctedConfig = {} as Config; /* Copy default config. */

        copyOver(correctedConfig, Script._DEFAULT_CONFIG, true);
        copyOver(correctedConfig, config || {}, true);

        return correctedConfig;
    }
}
