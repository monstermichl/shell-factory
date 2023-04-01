import { Statement } from '../../base/statement.mjs';

/**
 * Represents the subshell statement base.
 */
export abstract class SubshellBaseStatement extends Statement {
    protected _content: string;

    /**
     * SubshellBaseStatement constructor.
     *
     * @param openingPrefix Subshell opening prefix.
     * @param statement     Subshell value.
     */
    constructor(openingPrefix: string, statement: string);
    /**
     * SubshellBaseStatement constructor.
     *
     * @param openingPrefix Subshell opening prefix.
     * @param statement     Subshell value.
     */
    constructor(openingPrefix: string, statement: Statement);
    /**
     * SubshellBaseStatement constructor.
     *
     * @param openingPrefix Subshell opening prefix.
     * @param statement     Subshell value.
     */
    constructor(openingPrefix: string, statement: number);
    /**
     * SubshellBaseStatement constructor.
     *
     * @param openingPrefix Subshell opening prefix.
     * @param statement     Subshell value.
     */
    constructor(openingPrefix: string, statement: boolean);
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    public constructor(openingPrefix: string, statement: any) {
        if (typeof openingPrefix !== 'string') {
            throw new Error('Invalid opening-prefix provided');
        }
        const content = Statement.convert(statement);

        super(`${openingPrefix}(${content})`);
        this._content = content;
    }

    public get value(): string {
        return this.statement;
    }
}
