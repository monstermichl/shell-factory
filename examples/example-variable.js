import {
    Script,
    While,
    If,
    StringVariable,
    NumberVariable,
} from '../dist/index.mjs';

const stringVariable = new StringVariable('string');
const numberVariable = new NumberVariable('number');

const script = new Script([
    stringVariable.set('"Start here"'),
    numberVariable.set(0),

    new While(numberVariable.isLess(5), [
        new If(stringVariable.isEqual('Start here'), [
            'echo "Hello World"',
            stringVariable.set('Changed value'),
        ]).else([
            `echo ${numberVariable.value}`,
        ]),
        numberVariable.set(numberVariable.increment()),
    ]).setComment('Loop while number variable is less than 5'),
]).dump();

console.log(script);
