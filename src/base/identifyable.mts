import { randomUUID } from 'crypto';

export abstract class Identifyable {
    private _id: string;

    public constructor() {
        this._id = randomUUID();
    }

    public get id(): string {
        return this._id;
    }
}
