import { writeFileSync } from 'fs';
import {
    Command,
    If,
    NumberVariable,
    Script,
    StringVariable,
    Subshell,
    While,
} from '../dist/index.mjs';

const outputFile = 'README-generated.md';
const lineVariable = new StringVariable('line');
const matchVariable = new StringVariable('match');
const exampleStartVariable = new NumberVariable('example_started');

const script = new Script([
    new Command('echo -n ""').write(outputFile),
    'npm run build',

    /* Read all lines from the README-template.md file. */
    new While(`read -r ${lineVariable.name}`, [
        /* Try to match the replacement pattern (e.g.: (example:subshell) ). */
        matchVariable.set(
            new Command(`echo "${lineVariable.value}"`)
                .pipe('grep "(example:[a-zA-Z][a-zA-Z-]*)"')
                .eval(),
        ),

        /* If replacement pattern was found, get the example name. */
        new If(matchVariable.isNotEmpty, [
            /* Remove replacement pattern parts. */
            matchVariable.set(matchVariable.replace('(example:', '')),
            matchVariable.set(matchVariable.replace(')', '')),

            /* Create example-file path. */
            matchVariable.set(`"examples/example-${matchVariable.value}.js"`),

            /* Reset example start variable. */
            exampleStartVariable.set(0),

            /* Write example file content to generated README.md. */
            new Command(`echo "\\\`\\\`\\\`typescript"`).append(outputFile),
            new While(`IFS= read -r ${lineVariable.name}`, [
                /* Only write data until example-start marker has been found. */
                new If(exampleStartVariable.isEqual(0), [
                    new If(lineVariable.matches('example-start'), [
                        exampleStartVariable.set(1),
                    ]),
                ]).else([
                    new If(lineVariable.matches('example-end'), [
                        exampleStartVariable.set(0),
                    ]).else([
                        new Command(`echo "${lineVariable.value}"`).append(outputFile),
                    ]),
                ]),
            ]).read(matchVariable.value),
            new Command(`echo "\\\`\\\`\\\`"`).append(outputFile),
            '',

            /* Write result content to generated README.md. */
            new Command(`echo "\\\`\\\`\\\`sh"`).append(outputFile),
            new Command(Subshell.call(
                `node ${matchVariable.value}`
            )).append(outputFile),
            new Command(`echo "\\\`\\\`\\\`"`).append(outputFile),
        ]).else([
            new Command(`echo "${lineVariable.value}"`).append(outputFile),
        ]),
    ]).read('README-template.md'),
]);

writeFileSync('test.sh', script.dump());
console.log(script.dump());
