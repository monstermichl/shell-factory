import {
    Script,
    Statement,
    While,
} from '../dist/index.mjs';

const script = new Script([
    new While('read -r line', [
        'echo "$line"',
    ]).read('input.txt'),

    new Statement('cat').read('test.txt'),
]).dump({
    detailed: { while: { newlinesAfter: 1 } }
});

console.log(script);
