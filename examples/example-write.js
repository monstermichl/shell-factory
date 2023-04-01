import {
    Script,
    Command,
} from '../dist/index.mjs';

/* example-start */
const script = new Script([
    new Command('echo "File content"').write('test.txt'),
]).dump();

console.log(script);
/* example-end */
