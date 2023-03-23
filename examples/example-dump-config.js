import {
    For,
    Script,
    Command,
} from '../dist/index.mjs';

const spacyConfig = {
    detailed: {
        for: {
            newlinesAfter: 2,
        },
        command: {
            newlinesBefore: 1,
            indentBeforeComment: 6,
        },
    }
};

const script = new Script([
    new For('i', [1, 2, 3], [
        new Command('echo "Iteration $i"').setComment('Far away comment.'),
    ]),
    'echo "First statement"',
    new Command('echo "Second statement"').setComment('Another far away comment.'),
    'echo "Third statement"',
]).dump(spacyConfig);

console.log(script);
