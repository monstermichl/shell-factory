import {
    Select,
    Script,
} from '../dist/index.mjs';

const script = new Script([
    new Select('selection', ['a', 'b', 'c'], [
        'echo "You\'ve selected $selection"',
    ]),
]).dump();

console.log(script);
