import {
    Script,
    Function,
} from '../dist/index.mjs';

const script = new Script([
    new Function('hello_world', [
        'echo "Greetings $first_name, $last_name"',
    ], [
        'first_name',
        'last name',
    ]),
    'hello_world',
]).dump();

console.log(script);
