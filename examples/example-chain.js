import {
    Script,
    Command,
} from '../dist/index.mjs';

/* example-start */
const script = new Script([
    new Command('echo "Bauhaus in the middle of the street"').pipe('grep -e "middle"'),
    new Command('echo "File info"').write('info.txt'),
    new Command('echo "Another info"').append('info.txt'),
    new Command('readFrom').read('/dev/null'),
    new Command('cat info.txt').pipe('grep -e "[^the]"').write('xyz.txt'),
]);

console.log(script.dump()); /* Dump the updated script. */
/* example-end */
