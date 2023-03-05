import { Script } from '../src/components/script/script.mjs';
import { expect } from 'chai';
import { Function } from '../src/components/function/function.mjs';
import { If } from '../src/components/flow/if/if.mjs';
import { While } from '../src/components/flow/while/while.mjs';
import { For } from '../src/components/flow/for/for.mjs';
import { Case } from '../src/components/flow/case/case.mjs';
import { CaseOption } from '../src/components/flow/case/case-option.mjs';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('Script tests', () => {
    const scriptBlock = new Script([
        new Function('func1', [
            'echo "First level Function"',
            new Function('func2', [
                'echo "Second level Function"',
                new Function('func3', [
                    'echo "Third level Function"',
                ]),
            ]),
        ]),
        new If('1 -eq 1', [
            'echo "First level If"',
            new If('2 -eq 2', [
                'echo "Second level If"',
                new If('3 -eq 3', [
                    'echo "Third level If"',
                ]),
            ]),
        ]),
        new While('$i -gt 0', [
            'echo "First level While"',
            new While('$i -gt 1', [
                'echo "Second level While"',
                new While('$i -gt 0', [
                    'echo "Third level While"',
                    'break',
                ]),
                'break',
            ]),
            'break',
        ]),
        new For('i', [1, 2, 3], [
            'echo "First level For ($i)"',
            new For('j', [1, 2, 3], [
                'echo "Second level For ($j)"',
                new For('k', [1, 2, 3], [
                    'echo "Third level For ($k)"',
                ]),
            ]),
        ]),
        new Case('$input', [
            new CaseOption('1', 'echo "First level Case"'),
            new CaseOption('*', [
                new Case('$input', [
                    new CaseOption('2', 'echo "Second level Case"'),
                    new CaseOption('*', [
                        new Case('$input', [
                            new CaseOption('*', 'echo "Third level Case"'),
                        ]),
                    ]),
                ]),
            ]),
        ]),
    ]);

    function loadScript(name: string): string {
        return readFileSync(join('tests', 'assets' ,name)).toString();
    }

    describe('interpreter', () => {
        describe('successful', () => {
            it('get default', () => {
                expect(new Script().interpreter).to.be.equal('/bin/sh');
            });

            it('set bash', () => {
                const script = new Script();
                const interpreter = '/bin/bash';

                script.interpreter = interpreter
                expect(script.interpreter).to.be.equal(interpreter);
            });
        });
    });

    describe('dump', () => {
        describe('successful', () => {
            it('default spaces', () => {
                const compareScript = loadScript('script-default-spaces.sh');
                const dumpedScript = scriptBlock.dump();

                expect(dumpedScript).to.be.equal(compareScript);
            });

            it('4 spaces', () => {
                const compareScript = loadScript('script-4-spaces.sh');
                const dumpedScript = scriptBlock.dump({
                    common: {
                        indent: 4,
                    },
                });
                expect(dumpedScript).to.be.equal(compareScript);
            });

            it('0 spaces', () => {
                const compareScript = loadScript('script-0-spaces.sh');
                const dumpedScript = scriptBlock.dump({
                    common: {
                        indent: 0,
                    },
                });
                expect(dumpedScript).to.be.equal(compareScript);
            });

            it('negative spaces', () => {
                const compareScript = loadScript('script-default-spaces.sh');
                const dumpedScript = scriptBlock.dump({
                    common: {
                        indent: -1,
                    },
                });
                expect(dumpedScript).to.be.equal(compareScript);
            });
        });
    });

    describe('config', () => {
        describe('successful', () => {
            it('set default to 4', () => {
                const compareScript = loadScript('script-4-spaces.sh');
                const config = {
                    common: {
                        indent: 4,
                    },
                };

                scriptBlock.config = config;
                expect(scriptBlock.config).to.be.equal(config);

                const dumpedScript = scriptBlock.dump();
                expect(dumpedScript).to.be.equal(compareScript);

                scriptBlock.config = Script.DEFAULT_CONFIG; /* Reset to original default value. */
            });

            it('set default to negative value', () => {
                const compareScript = loadScript('script-default-spaces.sh');

                scriptBlock.config = {
                    common: {
                        indent: -1,
                    },
                };
                const dumpedScript = scriptBlock.dump();
                expect(dumpedScript).to.be.equal(compareScript);
            });
        });
    });
});
