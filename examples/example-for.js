import {
    For,
    Script,
} from '../dist/index.mjs';

/* example-start */
const script = new Script([
    new For('i', [true, 2, 'three'], [
        'echo $i',
        'sleep 1',
    ]),
]).dump();

console.log(script);
