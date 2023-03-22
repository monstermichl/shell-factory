import {
    Script,
    Statement,
} from '../dist/index.mjs';

const script = new Script([
    new Statement('echo "File content"').write('test.txt'),
]).dump();

console.log(script);
