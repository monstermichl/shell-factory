import { Conditions } from '../dist/components/condition/conditions.mjs';
import {
    Link,
    LinkedCondition,
} from '../dist/components/condition/linked-condition.mjs';
import {
    Script,
    If,
    While,
    For,
    Function,
    Case,
    CaseOption,
    Command,
} from '../dist/index.mjs';

const script = new Script([
    new Function('_run', [
        'echo $1',
    ]),
    new If('1 -eq 1', [
        'echo hello world',
        new If('"" == ""', [
            'echo "another layer"',
        ]).elseIf('4 -eq 4', [
            'echo "else-if"',
        ]).else([
            'echo "else"',
        ]),
    ])?.elseIf('1 -eq 2', [
        new For('i', [1, 2, 3], [
            new Command('echo "bye bye world"').setComment('This is a Statement'),
            new For('j', [5, 4, 3], [
                'echo "nested for"',
                'echo "$j works"',
            ]),
        ]),
    ])?.else([
        new While('$i -gt 1', [
            'echo "nothing to do here"',
            new For('j', '$i', [
                'echo "nested for"',
                'echo "$j works"',
            ]),
        ]),
    ]),
    new Case('$input', [
        new CaseOption('hello', [
            'echo "Found hello"',
        ]),
        new CaseOption('*', [
            new While(new Conditions(
                '$k -gt 2',
                new LinkedCondition(Link.And, '$i -gt 1'),
                new LinkedCondition(Link.Or, '$i -gt 1')
            ), [
                'echo "while in case"',
                'echo "$j works"',
            ]),
        ]),
    ]).setComment('This is a case block'),
    new If(new Conditions(
            '$k -gt 2',
            new LinkedCondition(Link.And, '$i -gt 1'),
            new LinkedCondition(Link.Or, '$i -gt 1')
        ), [
        'echo "multiple conditions"',
    ]),
]).dump();

console.log(script);
