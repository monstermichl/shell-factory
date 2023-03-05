import { Block, StatementOrBlock, StatementOrBlockOrString } from '../../base/block.mjs';
import { Statement } from '../../base/statement.mjs';
import { Function } from '../function/function.mjs';
import { If } from '../flow/if/if.mjs';
import { While } from '../flow/while/while.mjs';
import { Case } from '../flow/case/case.mjs';
import { CaseOption } from '../flow/case/case-option.mjs';
import { ElseIf } from '../flow/if/else-if.mjs';
import { Else } from '../flow/if/else.mjs';
import { For } from '../flow/for/for.mjs';

type BlockConfig = {
    indent?: number;
    newlinesBefore?: number;
    newlinesAfter?: number;
};

export type Config = {
    common?: BlockConfig;
    detailed?: {
        function?: BlockConfig;
        if?: BlockConfig;
        elseIf?: BlockConfig;
        else?: BlockConfig;
        while?: BlockConfig;
        for?: BlockConfig;
        case?: BlockConfig;
        caseOption?: BlockConfig;
    }
};

/**
 * Represents a Bourne Shell script.
 */
export class Script extends Block {
    public static readonly DEFAULT_CONFIG = {
        common: {
            indent: 2,
            newlinesBefore: 0,
        },
        detailed: {
            function: { newlinesBefore: 1 },
            if: { newlinesBefore: 1 },
            while: { newlinesBefore: 1 },
            for: { newlinesBefore: 1 },
            case: { newlinesBefore: 1 },
        }
    } as Config;
    private readonly _INTERPRETER_START_PATTERN = '#!';

    private _interpreter = '/bin/sh';
    private _config = this._correctConfig(Script.DEFAULT_CONFIG);

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
        this.interpreter = this._interpreter;
    }

    /**
     * Gets the default config for dumping the script as string.
     */
    public get defaultConfig(): Config {
        return Script.DEFAULT_CONFIG;
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
    public get interpreter(): string {
        return this._interpreter;
    }

    /**
     * Sets the script interpreter location.
     */
    public set interpreter(interpreter: string) {
        const INTERPRETER_REGEX = new RegExp(`^${this._INTERPRETER_START_PATTERN}`);
        const INTERPRETER_STATEMENT = `${this._INTERPRETER_START_PATTERN}${interpreter.replace(INTERPRETER_REGEX, '')}`;
        const index = this._content.findIndex((value) => value instanceof Statement && value.value.match(INTERPRETER_REGEX));

        /* Removes the shebang from the provided interpreter and assigns it. */
        this._interpreter = interpreter.trim().replace(INTERPRETER_REGEX, '');

        if (index >= 0) {
            this._content[index] = new Statement(INTERPRETER_STATEMENT);
        } else if (this.raw.length === 0) {
            this._addContent(INTERPRETER_STATEMENT);
        } else {
            /* Defensive branch which should never be reached since
               interpreter is set in constructor. */
            this._insertContent(0, INTERPRETER_STATEMENT);
        }
    }

    /**
     * The magic function that turns the carefully crafted script
     * structure into a string.
     *
     * @param config: Config to configure the script dumping.
     * @return Script string.
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
     *
     * @return String representation of the provided Statement or Block list.
     */
    private _dump(content: StatementOrBlock[], config: Config, indentFactor=0): string {
        let s = '';
        config = this._correctConfig(config); /* Copy and correct config. */

        /* Defensive branches which should never be reached. */
        if (indentFactor < 0) {
            indentFactor = 0;
        }
        
        content.forEach((value) => {
            if (value instanceof Statement) {
                s += `${' '.repeat(config.common.indent * indentFactor)}${value.value}\n`;
            } else {
                let indentAddition = 0;
                let blockConfig: BlockConfig = null;

                if (value instanceof Function) {
                    blockConfig = config?.detailed?.function;
                } else if (value instanceof If) {
                    blockConfig = config?.detailed?.if;
                } else if (value instanceof ElseIf) {
                    blockConfig = config?.detailed?.elseIf;
                } else if (value instanceof Else) {
                    blockConfig = config?.detailed?.else;
                } else if (value instanceof While) {
                    blockConfig = config?.detailed?.while;
                } else if (value instanceof For) {
                    blockConfig = config?.detailed?.for;
                } else if (value instanceof Case) {
                    blockConfig = config?.detailed?.case;
                } else if (value instanceof CaseOption) {
                    blockConfig = config?.detailed?.caseOption;
                } else {
                    indentAddition = 1;
                    blockConfig = Script.DEFAULT_CONFIG.common;
                }

                /* Add newlines before block. */
                if (blockConfig?.newlinesBefore > 0) {
                    s += '\n'.repeat(blockConfig.newlinesBefore);
                }
                /* Process children. */
                s += this._dump(value.raw, config, indentFactor + indentAddition);

                /* Add newlines after block. */
                if (blockConfig?.newlinesAfter > 0) {
                    s += '\n'.repeat(blockConfig.newlinesAfter);
                }
            }
        });
        return s;
    }

    /**
     * Corrects the provided config to at least fulfil the default conditions.
     *
     * @param config Config to correct.
     * @return Corrected config.
     */
    private _correctConfig(config?: Config): Config {
        const correctedConfig: {[key: string]: unknown} = config ? {...config} : {...Script.DEFAULT_CONFIG};

        if (!correctedConfig.common) {
            correctedConfig.common = {...Script.DEFAULT_CONFIG.common};
        } else {
            Object.entries(Script.DEFAULT_CONFIG.common).forEach(([key, value]) => {
                const common = correctedConfig.common as {[key: string]: unknown};

                if (!Object.keys(common).includes(key) || (common[key] < 0)) {
                    common[key] = value;
                }
            });
        }
        return correctedConfig;
    }
}
