import { Condition } from './condition.mjs';

/**
 * LinkedCondition link type.
 */
export enum Link {
    And,
    Or,
}

/**
 * Represents a condition which is linked with another condition by
 * a logical operator.
 */
export class LinkedCondition extends Condition {
    protected _link: Link;


    /**
     * LinkedCondition constructor.
     *
     * @param link      Link used to logically connect two conditions.
     * @param condition Condition string.
     */
    constructor(link: Link, condition: string);
    /**
     * LinkedCondition constructor.
     *
     * @param link      Link used to logically connect two conditions.
     * @param condition Boolean as condition (everything except false
     *                  will be converted to 1).
     */
    constructor(link: Link, condition: boolean);
    /**
     * LinkedCondition constructor.
     *
     * @param link      Link used to logically connect two conditions.
     * @param condition Number as condition (everything 0 will
     *                  will be converted to 1).
     */
    constructor(link: Link, condition: number);
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    constructor(link: Link, condition: any) {
        if (!Object.values(Link).includes(link)) {
            throw new Error('Invalid condition link provided');
        }
        super(condition);
        this._link = link;
    }

    /**
     * Returns the link used to logically connect two conditions.
     */
    public get link(): Link {
        return this._link;
    }

    /**
     * Compares if the provided condition is equal.
     *
     * @param condition Condition to compare.
     * @returns true if equal, otherwise false.
     */
    public override equal(condition: LinkedCondition): boolean {
        return super.equal(condition) && condition?.link === this.link;
    }
}
