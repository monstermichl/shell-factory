import {
    Script,
    If,
    While,
} from '../dist/index.mjs';

const script = new Script([
    new While('1', [
        'read -p "What do you want to say?" input',
        new If('"$input" == "Hello"', [
            'echo "Hello, my dear!"',
            'break',
        ]).else([
            'echo "Why aren\'t you greeting me? :("',
        ]),
    ]),
]).dump();

console.log(script);
