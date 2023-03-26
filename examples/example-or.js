import {
    Script,
    Command,
    If,
} from '../dist/index.mjs';

const script = new Script([
    new Command('echo "File content"')
        .pipe('grep -o -e "content"')
        .or('echo "nevermind"'),

    new If('1 -eq 1').or('2 -eq 2').addContent([
        'echo "What a useless comparison"',
    ]),
]).dump();

console.log(script);
