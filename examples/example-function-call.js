import {
    Script,
    Function,
    If,
    Statement,
} from '../dist/index.mjs';

const exitFunc = new Function('exit_function', [
    new If('"$2" != ""', [
        'echo "$2"',
    ]),
    new Statement('exit $1').setComment('Exiting with the provided error-code.'),
]);
const script = new Script([
    exitFunc,

    new If('-e "hello.txt"', [
        exitFunc.call(0),
    ]).else([
        exitFunc.call(-1, 'File doesn\'t exit.'),
    ])
]).dump();

console.log(script);
