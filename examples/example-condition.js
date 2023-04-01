import {
    Script,
    Condition
} from '../dist/index.mjs';

/* example-start */
const script = new Script([
    new Condition('1 -eq 1')
        .and('2 -eq 2')
        .or('2 -eq 2'),

    new Condition('3 -ne 2')
        .setTest(false)
        .setComment('Interpreter will throw an error here because the statement doesn\'t make sense.'),
]).dump({
    common: { newlinesBefore: 1 }
});

console.log(script);
/* example-end */
