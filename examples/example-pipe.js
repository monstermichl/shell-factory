import {
    Script,
    Command,
} from '../dist/index.mjs';

/* example-start */
const script = new Script([
    new Command('cat test.txt')
        .pipe('grep -e "hello"')
        .pipe('cut -d" " -f0')
        .write('test2.txt')
        .setComment('Nice chain!'),
]).dump();

console.log(script);
