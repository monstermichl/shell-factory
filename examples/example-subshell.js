import {
    Script,
    If,
    StringVariable,
    Subshell,
} from '../dist/index.mjs';

/* example-start */
const variable = new StringVariable('response');
const script = new Script([
    'read -p "What\'s your name? " name',

    variable.set(
        new If('"$name" != ""', [
            'echo "Hello $name"',
        ]).eval(),
    ),

    new If(variable.isEmpty, [
        variable.set(Subshell.eval('echo "I don\'t understand"')),
    ]),

    `echo "${variable.value}"`,
]).dump();

console.log(script);
