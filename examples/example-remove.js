import {
    Command,
    Script,
} from '../dist/index.mjs';

const script = new Script([
    new Command().setComment('First line of this script'),
    'echo "Is this going to be removed?"',
    'echo "Will this also be removed?"',
    new Command().setComment('Last line of this script'),
]);

/* Dump the original script. */
console.log(script.dump());

/* Remove statements by pattern. */
script.removeContent(/remove/);

/* Dump the altered script. */
console.log(script.dump());
