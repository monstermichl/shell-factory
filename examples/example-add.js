import {
    Script,
    MetaData,
    If,
} from '../dist/index.mjs';

/* example-start */
const meta = new MetaData(); /* MetaData container. */
const script = new Script([
    new If(1, [
        'echo "This is the first statement"',
    ]).meta(meta),
]);
console.log(script.dump()); /* Dump the original script. */

/* Find the If-block in the Script-block by its ID. */
const ifBlock = script.findContent(meta.id)[0];

/* Add another statement to the If-block. */
ifBlock.addContent('echo "Here\'s another statement"');

console.log(script.dump()); /* Dump the updated script. */
