import {
    Script,
    Until,
} from '../dist/index.mjs';

/* example-start */
const script = new Script([
    'input=0',
    new Until(false, [
        'input=$(expr $input + 1)',
        'echo $input',
        'sleep 1',
    ]),
]).dump();

console.log(script);
