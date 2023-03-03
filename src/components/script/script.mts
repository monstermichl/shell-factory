import { Block, StatementOrBlock, StatementOrBlockOrString } from '../../base/block.mjs';
import { FlowBlock } from '../../blocks/flow-block.mjs';
import { Statement } from '../../base/statement.mjs';

/**
 * Represents a Bourne Shell script.
 */
export class Script extends Block {
    public static readonly DEFAULT_SPACES = 2;
    private readonly _INTERPRETER_START_PATTERN = '#!';

    private _default_spaces = Script.DEFAULT_SPACES;
    private _interpreter = '/bin/sh';

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
     * Gets the default whitespaces when dumping the script as string.
     */
    public get defaultSpaces(): number {
        return this._default_spaces;
    }

    /**
     * Sets the default whitespaces for dumping the script as string.
     */
    public set defaultSpaces(spaces: number) {
        if (spaces < 0) {
            spaces = Script.DEFAULT_SPACES;
        }
        this._default_spaces = spaces;
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
     * @param spaces Whitespaces before each statement.
     * @return Script string.
     */
    public dump(spaces=this._default_spaces): string {
        if (spaces < 0) {
            spaces = Script.DEFAULT_SPACES;
        }
        return this._dump(this.raw, spaces);
    }

    /**
     * Internal dump function.
     *
     * @param content Stratements or Blocks which shall be stringified.
     * @param spaces Whitespaces before each statement.
     * @param indent Indent by which whitespaces are multiplied.
     *
     * @return String representation of the provided Statement or Block list.
     */
    private _dump(content: StatementOrBlock[], spaces: number, indent=0): string {
        let s = '';

        /* Defensive branches which should never be reached. */
        if (indent < 0) {
            indent = 0;
        } else if (spaces < 0) {
            spaces = Script.DEFAULT_SPACES;
        }
        content.forEach((value) => {
            if (value instanceof Statement) {
                s += `${' '.repeat(spaces * indent)}${value.value}\n`;
            } else {
                let indentAddition = 0;

                if (!(value instanceof FlowBlock)) {
                    indentAddition = 1;
                }
                s += this._dump(value.raw, spaces, indent + indentAddition);
            }
        });
        return s;
    }
}
