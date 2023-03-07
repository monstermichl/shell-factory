import { randomUUID } from 'crypto';

export class MetaData {
    id: string;
    comment: string;
}

export abstract class Base {
    private _id: string;
    private _comment: string;

    /**
     * Base constructor.
     */
    public constructor() {
        this._id = randomUUID();
    }

    /**
     * Returns the object's ID.
     */
    public get id(): string {
        return this._id;
    }

    /**
     * Returns the object's comment.
     */
    public get comment(): string | undefined {
        return this._comment;
    }

    /**
     * Attaches a comment to the object.
     *
     * @param comment Comment to set.
     * @returns The current object.
     */
    public setComment(comment: string): this {
        this._comment = comment;
        return this;
    }

    /**
     * Removes the object's comment.
     *
     * @returns The current object.
     */
    public deleteComment(): this {
        this._comment = undefined;
        return this;
    }

    /**
     * Fills the provided MetaData-struct with data. It's
     * done this way to get the meta-data of a newly
     * created object while still being able to chain
     * the required calls.
     *
     * @param container MetaData object to fill.
     * @returns The current object.
     */
    public meta(container: MetaData): this {
        if (container) {
            container.id = this.id;
            container.comment = this.comment;
        }
        return this;
    }
}
