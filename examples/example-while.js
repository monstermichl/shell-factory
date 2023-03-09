import {
    Script,
    While,
} from '../dist/index.mjs';

const script = new Script([
    'input=0',
    new While(true, [
        'input=$(expr $input + 1)',
        'echo $input',
        'sleep 1',
    ]),
]).dump();

console.log(script);
