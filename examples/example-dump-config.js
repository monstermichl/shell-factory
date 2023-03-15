import {
    For,
    Script,
    Statement,
} from '../dist/index.mjs';

const spacyConfig = {
    detailed: {
        interpreter: {
            newlinesAfter: 3,
        },
        statement: {
            newlinesBefore: 1,
            indentBeforeComment: 6,
        },
    }
};

const script = new Script([
    new For('i', [1, 2, 3], [
        new Statement('echo "Iteration $i"').setComment('Far away comment.'),
    ]),
    'echo "First statement"',
    'echo "Second statement"',
    'echo "Third statement"',
]).dump(spacyConfig);

console.log(script);
