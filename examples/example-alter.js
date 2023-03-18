import {
    Statement,
    Script,
    MetaData,
} from '../dist/index.mjs';

const meta = new MetaData(); /* MetaData container. */
const script = new Script([
    new Statement('echo "Hello"')
        .setComment('This might be altered at the next dump')
        .meta(meta), /* Get the Statement's meta-data. */
]);
console.log(script.dump()); /* Dump the original script. */

/* Find the statement in the script by its ID. */
const statement = script.findContent(meta.id)[0];

/* Update the Statement's value and comment. */
statement.value = 'echo "World"';
statement.setComment('It has been altered"');

console.log(script.dump()); /* Dump the altered script. */
