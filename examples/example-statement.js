import {
    Statement,
    Script,
} from '../dist/index.mjs';

const script = new Script([
    'echo "Hello World"',
    new Statement('echo "Hello Statement"').setComment('Statement class example'),
]).dump();

console.log(script);
