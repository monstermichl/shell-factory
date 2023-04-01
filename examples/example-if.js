import {
    Script,
    If,
} from '../dist/index.mjs';

/* example-start */
const script = new Script([
    'read -p "What do you want to say? " input',
    new If('"$input" == "Hello"', [
        'echo "Hello"',
    ]).elseIf('"$input" == "Bye"', [
        'echo "Bye"',
    ]).else([
        'echo "What shall we do with the drunken sailor?"',
    ]),
]).dump();

console.log(script);
