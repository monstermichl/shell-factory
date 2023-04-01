import {
    Command,
    Script,
} from '../dist/index.mjs';

/* example-start */
const script = new Script([
    'echo "Hello World"',
    new Command('echo "Hello Command"').setComment('Command class example'),
]).dump();

console.log(script);
/* example-end */
