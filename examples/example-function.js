import {
    Script,
    Function,
} from '../dist/index.mjs';

/* example-start */
const script = new Script([
    new Function('hello_world', [
        'echo "Greetings $first_name, $last_name"',
    ], [
        'first_name',
        'last_name',
    ]),
    'hello_world',
]).dump();

console.log(script);
/* example-end */
