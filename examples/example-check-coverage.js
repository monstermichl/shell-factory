import {
    For,
    Command,
    Script,
    StringVariable,
} from '../dist/index.mjs';
import { readdirSync, statSync } from 'fs';
import path from 'path';
import { exec } from 'child_process';

const validExtensions = ['js', 'mjs', 'ts', 'mts'];

function getSourceFiles(from) {
    const files = [];

    readdirSync(from).map((file) => path.join(from, file)).forEach((file) => {
        const stats = statSync(file);

        /* If directory, dig deeper. */
        if (stats.isDirectory(file)) {
            files.push(...getSourceFiles(file));
            
        /* Checking the extension by splitting the file name and using the last part. */
        } else if (validExtensions.includes(file.split('.').at(-1))) {
            files.push(file);
        }
    });
    return files;
}

const files = getSourceFiles('src')
    .map((file) => file.split('/').at(-1))
    .map((file) => file.replace(/\.\w+$/, ''));

const variable = new StringVariable('file');
const script = new Script([
    new For(variable, files, [
        `echo "------------------ testing ${variable.value} ------------------"`,
        new Command('npx tsc -p tsconfig-tests.json')
            .and(`npx c8 mocha ./tests-build/tests/${variable.value}.test.js`)
            .pipe(`grep -e "${variable.value}"`),
    ]),
]).dump();

console.log(script);
/* example-end */
