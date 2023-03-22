import {
    Script,
    Statement,
} from '../dist/index.mjs';

const file = 'test.txt';
const script = new Script([
    new Statement('echo "File content"').write(file),
    new Statement('echo "Additional content"').append(file),
]).dump();

console.log(script);
