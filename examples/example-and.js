import {
    Script,
    Command,
    If
} from '../dist/index.mjs';

/* example-start */
const script = new Script([
    new Command('echo "File content"')
        .pipe('grep -o -e "content"')
        .and('echo "ok"'),

    new If('1 -eq 1').and('2 -eq 2').addContent([
        'echo "What a useless comparison"',
    ]),
]).dump();

console.log(script);
