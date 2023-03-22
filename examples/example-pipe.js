import {
    Script,
    Statement,
} from '../dist/index.mjs';

const script = new Script([
    new Statement('cat test.txt')
        .pipe('grep -e "hello"')
        .pipe('cut -d" " -f0')
        .write('test2.txt')
        .setComment('Nice chain!'),
]).dump();

console.log(script);
