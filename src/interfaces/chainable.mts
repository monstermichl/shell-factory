import { Statement } from '../base/statement.mjs';

/**
 * Chain element.
 */
export class ChainElement<LinkType extends string, ElementType extends Statement> {
    type: LinkType;
    target: ElementType;

    constructor(type: LinkType, target: ElementType) {
        this.type = type;
        this.target = target;
    }
}

/**
 * A class that implements this interface handles a chain for linking
 * several statements.
 */
export interface IChainable<LinkType extends string, ElementType extends Statement> {
    /**
     * Returns the applied chain.
     */
    get chain(): ChainElement<LinkType, ElementType>[];

    /**
     * Finds all elements based on the provided ID or pattern in the chain.
     * 
     * @param idOrPattern Content ID or Statement pattern.
     * @param type        If provided, the type must also match.
     *
     * @returns List of found chain elements.
     */
    findInChain(idOrPattern: string, type?: LinkType): ChainElement<LinkType, ElementType>[];
    /**
     * Finds all elements based on the provided ID or pattern in the chain.
     * 
     * @param pattern Content ID or Statement pattern.
     * @param type    If provided, the type must also match.
     *
     * @returns List of found chain elements.
     */
    findInChain(pattern: RegExp, type?: LinkType): ChainElement<LinkType, ElementType>[];
    /**
     * Finds all elements based on the provided type.
     * 
     * @param type Type to look for.
     * @returns List of found chain elements.
     */
    findInChain(type: LinkType): ChainElement<LinkType, ElementType>[];

    /**
     * Removes all elements based on the provided ID or pattern from the chain.
     * 
     * @param idOrPattern Content ID or Statement pattern.
     * @param type        If provided, the type must also match.
     *
     * @returns The current instance.
     */
    removeFromChain(idOrPattern: string, type?: LinkType): this;
    /**
     * Removes all elements based on the provided ID or pattern from the chain.
     * 
     * @param pattern Content ID or Statement pattern.
     * @param type    If provided, the type must also match.
     *
     * @returns The current instance.
     */
    removeFromChain(pattern: RegExp, type?: LinkType): this;
    /**
     * Removes all elements based on the provided type.
     * 
     * @param type Type to remove.
     * @returns The current instance.
     */
    removeFromChain(type: LinkType): this;

    /**
     * Clears the whole chain.
     *
     * @returns The current instance.
     */
    clearChain(): this;
}
