# Script builder
Script builder is a simple yet powerful library that allows you to create Bourne shell scripts on the fly using Typescript. It's intuitive syntax and chainable commands take all the hassle of formatting strings manually and remembering weird syntax away from you and provides you with a rich set of configurations to tailor the script according your needs.

## Examples
*The output of the following examples was provided by console.log. It is not dumped to the console or any file automatically. This is shown in the first example but for readability reasons avoided in the other examples.*

### Functions
#### Typescript
```typescript
const script = new Script([
    new Function('hello_world', [
        'echo "Hello World"',
    ]),
    'hello_world',
]).dump();

console.log(script);
```

#### Shell
```sh
#!/bin/sh

hello_world() {
  echo "Hello World"
}
hello_world
```

### If conditions
#### Typescript
```typescript
new Script([
    'read -p "What do you want to say? " input',
    new If('"$input" == "Hello"', [
        'echo "Hello"',
    ]).elseIf('"$input" == "Bye"', [
        'echo "Bye"',
    ]).else([
        'echo "What shall we do with the drunken sailor?"',
    ]),
]).dump();
```

#### Shell
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

### While loop
#### Typescript
```typescript
new Script([
    'input=0',
    new While(true, [
        'input=$(expr $input + 1)',
        'echo $input',
        'sleep 1',
    ]),
]).dump();
```

#### Shell
```sh
#!/bin/sh

input=0

while [ 1 ]; do
  input=$(expr $input + 1)
  echo $input
  sleep 1
done
```

### For loop
#### Typescript
```typescript
new Script([
    new For('i', [true, 2, 'three'], [
        'echo $i',
        'sleep 1',
    ]),
]).dump();
```

#### Shell
```sh
#!/bin/sh

for i in true 2 three; do
  echo $i
  sleep 1
done
```

### Select
#### Typescript
```typescript
new Script([
    new Select('selection', ['a', 'b', 'c'], [
        'echo "You\'ve selected $selection"',
    ]),
]).dump();
```

#### Shell
```sh
#!/bin/sh

select selection in a b c; do
  echo "You've selected $selection"
done
```

### Case
#### Typescript
```typescript
new Script([
    'read -p "Where are we running? " input',
    new Case('$input', [
        new CaseOption('We need some time to clear our heads', [
            'echo "Keep on working \'til we\'re dead"',
        ]),
        new CaseOption('*', [
            'echo "I have no idea"'
        ]),
    ]),
]).dump();
```

#### Shell
```sh
#!/bin/sh

read -p "Where are we running? " input

case $input in
  "We need some time to clear our heads")
    echo "Keep on working 'til we're dead"
    ;;
  *)
    echo "I have no idea"
    ;;
esac
```
