import { randomUUID } from 'crypto';

export class MetaData {
    id: string;
}

export abstract class Base {
    private _id: string;

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
     * Fills the provided MetaData-struct with data. It's
     * done this way to get the meta-data of a newly
     * created object while still being able to chain
     * the required calls.
     *
     * @param metaData MetaData object to fill.
     * @returns The current object.
     */
    public metaData(metaData: MetaData): this {
        if (metaData) {
            metaData.id = this.id;
        }
        return this;
    }
}
