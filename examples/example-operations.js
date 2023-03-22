import {
    Script,
    Statement,
} from '../dist/index.mjs';

const script = new Script([
    new Statement('echo "Bauhaus in the middle of the street"').pipe('grep -e "middle"'),
    new Statement('echo "File info"').write('info.txt'),
    new Statement('echo "Another info"').append('info.txt'),
    new Statement('readFrom').read('/dev/null'),
]);

console.log(script.dump()); /* Dump the updated script. */
