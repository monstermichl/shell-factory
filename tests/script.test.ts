import {
    Interpreter,
    Script,
} from '../src/components/script/script.mjs';
import { expect } from 'chai';
import { Function } from '../src/components/function/function.mjs';
import { If } from '../src/components/flow/if/if.mjs';
import { While } from '../src/components/flow/while/while.mjs';
import { For } from '../src/components/flow/for/for.mjs';
import { Case } from '../src/components/flow/case/case.mjs';
import { CaseOption } from '../src/components/flow/case/case-option.mjs';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Statement } from '../src/base/statement.mjs';
import { Select } from '../src/components/select/select.mjs';

describe('Script tests', () => {
    const scriptBlock = new Script([
        new Statement().setComment('Script start'),
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
                ]).elseIf('4 -eq 4', [
                    'echo "Third level If-ElseIf"',
                ]).else([
                    new Statement('echo "Third level If-Else"').setComment('I have no idea how I got here.'),
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
                ]).setComment('Come on...Stop it...'),
            ]).setComment('This is a for-loop again...'),
        ]).setComment('This is a for-loop'),
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
        new Select('selection', [true, 2, 'three'], [
            new Case('$selection', [
                new CaseOption('true', 'echo "It\'s true! I swear!"'),
                new CaseOption('*', 'echo "Whatever..."'),
            ]),
        ]),
    ]);

    function loadScript(name: string): string {
        return readFileSync(join('tests', 'assets' ,name)).toString();
    }

    describe('getInterpreter', () => {
        describe('successful', () => {
            it('get default', () => {
                const defaultInterpreter = '/bin/sh';

                expect(new Script().getInterpreter().path).to.be.equal(defaultInterpreter);
                expect(new Script().getInterpreter().value).to.be.equal(`#!${defaultInterpreter}`);
            });
        });
    });

    describe('setInterpreter', () => {
        describe('successful', () => {
            it('set bash', () => {
                const script = new Script();
                const interpreter = '/bin/bash';

                script.setInterpreter(interpreter);

                expect(script.getInterpreter().path).to.be.equal(interpreter);
                expect(script.getInterpreter().value).to.be.equal(`#!${interpreter}`);
            });

            it('set interpreter object', () => {
                const script = new Script();
                const interpreter = new Interpreter('/bin/bash');

                script.setInterpreter(interpreter);

                expect(script.getInterpreter()).to.be.equal(interpreter);
                expect(script.getInterpreter().path).to.be.equal(interpreter.path);
                expect(script.getInterpreter().value).to.be.equal(interpreter.value);
            });
        });

        describe('failed', () => {
            it('set undefined', () => {
                const script = new Script();

                script.setInterpreter(undefined as any);

                expect(script.getInterpreter().path).to.be.equal(Interpreter.defaultInterpreter.path);
                expect(script.getInterpreter().value).to.be.equal(Interpreter.defaultInterpreter.value);
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

            it('newline after function blocks', () => {
                const compareScript = loadScript('script-new-lines-after-function-blocks.sh');
                const dumpedScript = scriptBlock.dump({
                    detailed: {
                        function: {
                            newlinesAfter: 2,
                        },
                    },
                });
                expect(dumpedScript).to.be.equal(compareScript);
            });

            it('negative spaces before comments', () => {
                const compareScript = loadScript('script-default-spaces-before-comments.sh');
                const dumpedScript = scriptBlock.dump({
                    common: {
                        indentBeforeComment: -1,
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

                scriptBlock.config = Script.defaultConfig; /* Reset to original default value. */
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
