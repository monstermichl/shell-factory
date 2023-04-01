import {
    Script,
    While,
    If,
    StringVariable,
    NumberVariable,
} from '../dist/index.mjs';

/* example-start */
const stringVariable = new StringVariable('string');
const numberVariable = new NumberVariable('number');

const script = new Script([
    stringVariable.set(),  /* Initialize string variable. */
    numberVariable.set(0), /* Initialze the number variable. */

    /* Loop while number variable is less than 5. */
    new While(numberVariable.isLess(5), [

        /* If string variable is empty, set it to 'Hello'. */
        new If(stringVariable.isEqual(), [
            stringVariable.set('Hello'),

        /* If number variable is 1, append ' again' to string variable. */
        ]).elseIf(numberVariable.isEqual(1), [
            stringVariable.set(stringVariable.append(' again')),

        /* Ever other time, append ' and again' to the string variable. */
        ]).else([
            stringVariable.set(stringVariable.append(' and again')),
        ]),
        /* Print the string variable to console. */
        `echo "${stringVariable.value}"`,

        /* Increment the number variable by 1. */
        numberVariable.set(numberVariable.increment()),
    ]),
]).dump();

console.log(script);
