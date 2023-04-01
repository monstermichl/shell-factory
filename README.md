# Shell-factory
Shell-factory is a simple yet powerful ESM module that allows you to create Bourne shell scripts on the fly using Typescript. It's intuitive syntax and chainable commands take all the hassle of formatting strings manually and remembering weird syntax away from you and provides you with a rich set of configurations to tailor the script according to your needs.

```sh
npm install shell-factory
```

## Components
Each shell-script is built with the Script-class which serves as the container for all building blocks. At this point, the following building-blocks are supported.

### Command
A command represents a single line of code. It can be a string or an instance of the Command class. Usually, a simple string is sufficient. However, the Command class inherits from the Statement class which offers additional functionalities like having an ID for later adjustment or adding comments which will be added to the generated code. For further modification commands also can be chained with several operators (see [Operations](#operations)).

*To give you a head start with regularly used commands, please have a look at the [common commands collection (shell-factory-cocos)](https://github.com/monstermichl/shell-factory-cocos).*

```typescript
const script = new Script([
    'echo "Hello World"',
    new Command('echo "Hello Command"').setComment('Command class example'),
]).dump();

console.log(script);
```

```sh
#!/bin/sh

echo "Hello World"
echo "Hello Command" # Command class example
```

### Variable
At this point two types of Variables are supported. *StringVariable* (or *StrVar*) and *NumberVariable* (or *NumVar*). They inherit from the *Variable* class and offer a variety or functions based on their type to support you with using variables comfortably. Each of the functions returns a new Statement instance which can be added as content directly or passed to other functions which accept Statements as their inputs. *NICE-TO-KNOW: If a variable is set as local, the first time the set-method is being called, the assignment statement is preceded with the "local" keyword.*

The example might seem intimidating at first glance as some of the concepts like *If* or *While* have not been discussed yet. Don't worry, just focus on the *Variable* operations to understand, how they work and how they can be combined. The rest will become clear later on (or intuitionally).

```typescript
const stringVariable = new StringVariable('string');
const numberVariable = new NumberVariable('number');

const script = new Script([
    stringVariable.set(),  /* Initialize string variable. */
    numberVariable.set(0), /* Initialze the number variable. */

    /* Loop while number variable is less than 5. */
    new While(numberVariable.isLess(5), [

        /* If string variable is empty, set it to 'Hello'. */
        new If(stringVariable.isEqual(), [
            stringVariable.set('Hello'),

        /* If number variable is 1, append ' again' to string variable. */
        ]).elseIf(numberVariable.isEqual(1), [
            stringVariable.set(stringVariable.append(' again')),

        /* Ever other time, append ' and again' to the string variable. */
        ]).else([
            stringVariable.set(stringVariable.append(' and again')),
        ]),
        /* Print the string variable to console. */
        `echo "${stringVariable.value}"`,

        /* Increment the number variable by 1. */
        numberVariable.set(numberVariable.increment()),
    ]),
]).dump();

console.log(script);
```

```sh
#!/bin/sh

string=""
number=0

while [ ${number} -lt 5 ]; do
  if [ "${string}" = "" ]; then
    string="Hello"
  elif [ ${number} -eq 1 ]; then
    string="${string} again"
  else
    string="${string} and again"
  fi
  echo "${string}"
  number=$(expr ${number} + 1)
done
```

### If
If-statements control the further code execution flow. The If-class adds the possibility to add all required else-if (+ else) branches via chaining as shown in the example. *NICE-TO-KNOW: The If-class also supports dis-/enabling testing (the brackets in the statement) by using the setTest-method.*

```typescript
const script = new Script([
    'read -p "What do you want to say? " input',
    new If('"$input" == "Hello"', [
        'echo "Hello"',
    ]).elseIf('"$input" == "Bye"', [
        'echo "Bye"',
    ]).else([
        'echo "What shall we do with the drunken sailor?"',
    ]),
]).dump();

console.log(script);
```

```sh
#!/bin/sh

read -p "What do you want to say? " input

if [ "$input" == "Hello" ]; then
  echo "Hello"
elif [ "$input" == "Bye" ]; then
  echo "Bye"
else
  echo "What shall we do with the drunken sailor?"
fi
```

### While
While-loops execute the content in their body as long as the condition is fulfilled. *NICE-TO-KNOW: The While-class also supports dis-/enabling testing (the brackets in the statement) by using the setTest-method.*

```typescript
const script = new Script([
    'input=0',
    new While(true, [
        'input=$(expr $input + 1)',
        'echo $input',
        'sleep 1',
    ]),
]).dump();

console.log(script);
```

```sh
#!/bin/sh

input=0

while [ 1 ]; do
  input=$(expr $input + 1)
  echo $input
  sleep 1
done
```

### Until
Until-loops execute the content in their body until the condition is fulfilled. *NICE-TO-KNOW: The Until-class also supports dis-/enabling testing (the brackets in the statement) by using the setTest-method.*

```typescript
const script = new Script([
    'input=0',
    new Until(false, [
        'input=$(expr $input + 1)',
        'echo $input',
        'sleep 1',
    ]),
]).dump();

console.log(script);
```

```sh
#!/bin/sh

input=0

until [ 0 ]; do
  input=$(expr $input + 1)
  echo $input
  sleep 1
done
```

### For
For-loops iterate over a defined collection of values and provide the current value via the specified variable.

```typescript
const script = new Script([
    new For('i', [true, 2, 'three'], [
        'echo $i',
        'sleep 1',
    ]),
]).dump();

console.log(script);
```

```sh
#!/bin/sh

for i in true 2 three; do
  echo $i
  sleep 1
done
```

### Select
Select is a builtin Shell function which provides the user with a selection menu based on the provided values.

```typescript
const script = new Script([
    new Select('selection', ['a', 'b', 'c'], [
        'echo "You\'ve selected $selection"',
    ]),
]).dump();

console.log(script);
```

```sh
#!/bin/sh

select selection in a b c; do
  echo "You've selected $selection"
done
```

### Case
Case looks at the provided input and decides, based on the defined cases, which branch to execute. *The Case-class expects CaseOption as it's content. Everything that is not a CaseOption instance is being added to the latest defined CaseOption.*

```typescript
const script = new Script([
    'read -p "Where are we running? " input',
    new Case('$input', [
        new CaseOption('We need some time to clear our heads', [
            'echo "Keep on working \'til we\'re dead"',
        ]),
        new CaseOption('*', [
            'echo "I have no idea"'
        ]),
        'echo "I\'m added to the last CaseOption"',
    ]),
]).dump();

console.log(script);
```

```sh
#!/bin/sh

read -p "Where are we running? " input

case $input in
  "We need some time to clear our heads")
    echo "Keep on working 'til we're dead"
    ;;
  *)
    echo "I have no idea"
    echo "I'm added to the last CaseOption"
    ;;
esac
```

### Function
Functions are reusable code blocks which can be called at later points in the script. The Function-class also adds the possibility to map the positional parameters to function-internal variables for better usability.

```typescript
const script = new Script([
    new Function('hello_world', [
        'echo "Greetings $first_name, $last_name"',
    ], [
        'first_name',
        'last_name',
    ]),
    'hello_world',
]).dump();

console.log(script);
```

```sh
#!/bin/sh

hello_world() {
  local first_name="$1"
  local last_name="$2"
  echo "Greetings $first_name, $last_name"
}
hello_world
```

The Function class additionally provides the *call*-method to return a function-call Command with the provided parameters.
```typescript
const exitFunc = new Function('exit_function', [
    new If('"$2" != ""', [
        'echo "$2"',
    ]),
    new Command('exit $1').setComment('Exiting with the provided error-code.'),
]);
const script = new Script([
    exitFunc,

    new If('-e "hello.txt"', [
        exitFunc.call(0),
    ]).else([
        exitFunc.call(-1, 'File doesn\'t exit.'),
    ])
]).dump();

console.log(script);
```

```sh
#!/bin/sh

exit_function() {
  if [ "$2" != "" ]; then
    echo "$2"
  fi
  exit $1 # Exiting with the provided error-code.
}

if [ -e "hello.txt" ]; then
  exit_function 0
else
  exit_function -1 "File doesn't exit."
fi
```

### Condition
Conditions are separate Statement instances which test the passed condition string. Each string or Statement that is passed to a ConditionBlock (e.g., If, While, Until, ...) is converted to a Condition instance. However, they can also exist and be tested on their own. The Condition class additionally provides logical chaining using the *and*- and *or*-method. If you don't want to test the Condition, you can easily disable it using the *setTest*-method.

```typescript
const script = new Script([
    new Condition('1 -eq 1')
        .and('2 -eq 2')
        .or('2 -eq 2'),

    new Condition('3 -ne 2')
        .setTest(false)
        .setComment('Interpreter will throw an error here because the statement doesn\'t make sense.'),
]).dump({
    common: { newlinesBefore: 1 }
});

console.log(script);
```

```sh
#!/bin/sh

[ 1 -eq 1 -a 2 -eq 2 -o 2 -eq 2 ]

3 -ne 2 # Interpreter will throw an error here because the statement doesn't make sense.
```

## Operations
Commands and ConditionBlocks support the appliance of operations in a chained manner to provide you with comprehensive command combination options. At this point, the following operations are supported. *Further modification can be accomplished by using the findInChain-, removeFromChain- and clearChain-methods or getting the chain content via the chain-getter.*

### Read
Reads content from a file into the Command or ConditionBlock. *NOTICE: If testing has not been explicitely set on the ConditionBlock (e.g. If, While, Until, ...), testing gets disabled automatically (see example).*

```typescript
const script = new Script([
    new While('read -r line', [
        'echo "$line"',
    ]).read('input.txt'),

    new Command('cat').read('test.txt'),
]).dump({
    detailed: { while: { newlinesAfter: 1 } }
});

console.log(script);
```

```sh
#!/bin/sh

while read -r line; do
  echo "$line"
done < input.txt

cat < test.txt
```

### Write
Writes content to a file. *NOTICE: An existing file gets overwritten.*

```typescript
const script = new Script([
    new Command('echo "File content"').write('test.txt'),
]).dump();

console.log(script);
```

```sh
#!/bin/sh

echo "File content" > test.txt
```

### Append
Appends content to a file.

```typescript
const file = 'test.txt';
const script = new Script([
    new Command('echo "File content"').write(file),
    new Command('echo "Additional content"').append(file),
]).dump();

console.log(script);
```

```sh
#!/bin/sh

echo "File content" > test.txt
echo "Additional content" >> test.txt
```

### Pipe
Pipes the output of a command into another command.

```typescript
const script = new Script([
    new Command('cat test.txt')
        .pipe('grep -e "hello"')
        .pipe('cut -d" " -f0')
        .write('test2.txt')
        .setComment('Nice chain!'),
]).dump();

console.log(script);
```

```sh
#!/bin/sh

cat test.txt | grep -e "hello" | cut -d" " -f0 > test2.txt # Nice chain!
```

### And
Connects two commands with a logical AND. In case of a ConditionBlock instance, this operation adds a new AND-connected condition. *NICE-TO-KNOW: This operation can also be applied to standalone Condition-class instances.*

```typescript
const script = new Script([
    new Command('echo "File content"')
        .pipe('grep -o -e "content"')
        .and('echo "ok"'),

    new If('1 -eq 1').and('2 -eq 2').addContent([
        'echo "What a useless comparison"',
    ]),
]).dump();

console.log(script);
```

```sh
#!/bin/sh

echo "File content" | grep -o -e "content" && echo "ok"

if [ 1 -eq 1 -a 2 -eq 2 ]; then
  echo "What a useless comparison"
fi
```

### Or
Connects two commands with a logical OR. In case of a ConditionBlock instance, this operation adds a new OR-connected condition. *NICE-TO-KNOW: This operation can also be applied to standalone Condition-class instances.*

```typescript
const script = new Script([
    new Command('echo "File content"')
        .pipe('grep -o -e "content"')
        .or('echo "nevermind"'),

    new If('1 -eq 1').or('2 -eq 2').addContent([
        'echo "What a useless comparison"',
    ]),
]).dump();

console.log(script);
```

```sh
#!/bin/sh

echo "File content" | grep -o -e "content" || echo "nevermind"

if [ 1 -eq 1 -o 2 -eq 2 ]; then
  echo "What a useless comparison"
fi
```

### Subshell/Evaluation
Many Statement- and Block-types support subshelling/evaluation, meaning, the Statement or Block can be ran in a subshell and - in case of evaluation - its value directly be used. If a Statement or Block does not support subshelling/evaluation directly, it can be tried to pass the object to the *Subshell.call* or *Subshell.eval* method.

```typescript
const variable = new StringVariable('response');
const script = new Script([
    'read -p "What\'s your name? " name',

    variable.set(
        new If('"$name" != ""', [
            'echo "Hello $name"',
        ]).eval(),
    ),

    new If(variable.isEmpty, [
        variable.set(Subshell.eval('echo "I don\'t understand"')),
    ]),

    `echo "${variable.value}"`,
]).dump();

console.log(script);
```

```sh
#!/bin/sh

read -p "What's your name? " name
response=$(
  if [ "$name" != "" ]; then
    echo "Hello $name"
  fi
)

if [ -z "${response}" ]; then
  response="$(echo "I don't understand")"
fi
echo "${response}"
```

## Formatting
How scripts are being dumped can be configured separatelly by either setting the config directly on the Script instance via the *config*-setter or by passing it to the *dump*-method. Passing the config to the *dump*-method uses it only temporarily.

```typescript
const spacyConfig = {
    detailed: {
        for: {
            newlinesAfter: 2,
        },
        command: {
            newlinesBefore: 1,
            indentBeforeComment: 6,
        },
    }
};

const script = new Script([
    new For('i', [1, 2, 3], [
        new Command('echo "Iteration $i"').setComment('Far away comment.'),
    ]),
    'echo "First statement"',
    new Command('echo "Second statement"').setComment('Another far away comment.'),
    'echo "Third statement"',
]).dump(spacyConfig);

console.log(script);
```

```sh
#!/bin/sh

for i in 1 2 3; do
  echo "Iteration $i"      # Far away comment.
done


echo "First statement"

echo "Second statement"      # Another far away comment.

echo "Third statement"
```

## Modification
### Add
New content can be added to a block (e.g. If) by using the *addContent* method.

```typescript
const meta = new MetaData(); /* MetaData container. */
const script = new Script([
    new If(1, [
        'echo "This is the first statement"',
    ]).meta(meta),
]);
console.log(script.dump()); /* Dump the original script. */

/* Find the If-block in the Script-block by its ID. */
const ifBlock = script.findContent(meta.id)[0];

/* Add another statement to the If-block. */
ifBlock.addContent('echo "Here\'s another statement"');

console.log(script.dump()); /* Dump the updated script. */
```

```sh
#!/bin/sh

if [ 1 ]; then
  echo "This is the first statement"
fi
```

```sh
#!/bin/sh

if [ 1 ]; then
  echo "This is the first statement"
  echo "Here's another statement"
fi
```

### Remove
Blocks and Statements can be removed from their parent block (e.g. Script) via their ID or a statement pattern using the *removeContent* method.

```typescript
const script = new Script([
    new Command().setComment('First line of this script'),
    'echo "Is this going to be removed?"',
    'echo "Will this also be removed?"',
    new Command().setComment('Last line of this script'),
]);

/* Dump the original script. */
console.log(script.dump());

/* Remove statements by pattern. */
script.removeContent(/remove/);

/* Dump the altered script. */
console.log(script.dump());
```

```sh
#!/bin/sh

# First line of this script
echo "Is this going to be removed?"
echo "Will this also be removed?"
# Last line of this script
```

```sh
#!/bin/sh

# First line of this script
# Last line of this script
```

### Alter
Blocks and Statements can be altered by retrieving them via their ID or a statement pattern through their parent block (e.g. Script) with the *findContent* method and altering the returned object(s).

```typescript
const meta = new MetaData(); /* MetaData container. */
const script = new Script([
    new Command('echo "Hello"')
        .setComment('This might be altered at the next dump')
        .meta(meta), /* Get the Statement's meta-data. */
]);
console.log(script.dump()); /* Dump the original script. */

/* Find the statement in the script by its ID. */
const statement = script.findContent(meta.id)[0];

/* Update the Statement's value and comment. */
statement.statement = 'echo "World"';
statement.setComment('It has been altered"');

console.log(script.dump()); /* Dump the altered script. */
```

```sh
#!/bin/sh

echo "Hello" # This might be altered at the next dump
```

```sh
#!/bin/sh

echo "World" # It has been altered"
```
