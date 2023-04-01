import {
    Script,
    Command,
} from '../dist/index.mjs';

/* example-start */
const file = 'test.txt';
const script = new Script([
    new Command('echo "File content"').write(file),
    new Command('echo "Additional content"').append(file),
]).dump();

console.log(script);
