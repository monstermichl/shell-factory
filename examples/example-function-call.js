import {
    Script,
    Function,
    If,
    Command,
} from '../dist/index.mjs';

/* example-start */
const exitFunc = new Function('exit_function', [
    new If('"$2" != ""', [
        'echo "$2"',
    ]),
    new Command('exit $1').setComment('Exiting with the provided error-code.'),
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
/* example-end */
