import {
    Case,
    CaseOption,
    Script,
} from '../dist/index.mjs';

/* example-start */
const script = new Script([
    'read -p "Where are we running? " input',
    new Case('$input', [
        new CaseOption('We need some time to clear our heads', [
            'echo "Keep on working \'til we\'re dead"',
        ]),
        new CaseOption('*', [
            'echo "I have no idea"'
        ]),
        'echo "I\'m added to the last CaseOption"',
    ]),
]).dump();

console.log(script);
/* example-end */
