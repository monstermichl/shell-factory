import {
    Script,
    Function,
} from '../dist/index.mjs';

const script = new Script([
    new Function('hello_world', [
        'echo "Hello World"',
    ]),
    'hello_world',
]).dump();

console.log(script);
