import { IfBase } from '../src/components/flow/if/if-base.mjs';

/* Helper class to instantiate IfBase. */
class IfBaseHelper extends IfBase {
    constructor(ifKeyword: string, condition: string, content?: any, endKeyword?: string) {
        super(ifKeyword, condition, content, endKeyword);
    }
}

describe('IfBase tests', () => {
    describe('constructor', () => {
        describe('successful', () => {
            it('construct', () => {
                new IfBaseHelper('if', '1 -eq 1', undefined, 'fi');
            });
        });
    });
});
