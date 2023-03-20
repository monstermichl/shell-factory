import {
    Script,
    While,
} from '../dist/index.mjs';

const script = new Script([
    new While('read -r line', [
        'echo $line',
    ]).read('what-do-you-want-to-say.txt'),
]).dump();

console.log(script);
