# Script builder
Script builder is a simple yet powerful library that allows you to create Bourne shell scripts on the fly using Typescript. It's intuitive syntax and chainable commands take all the hassle of formatting strings manually and remembering weird syntax away from you and provides you with a rich set of configurations to configure the script output to tailor it according to your needs.

---

## Examples
*The output of the following examples was provided by console.log. It is not dumped to the console or any file automatically. This is shown in the first example but for readability reasons avoided in the other examples.*

### Functions
```typescript
const script = new Script([
    new Function('hello_world', [
        'echo "Hello World"',
    ]),
    'hello_world',
]).dump();

console.log(script);
```

```sh
#!/bin/sh

hello_world() {
  echo "Hello World"
}
hello_world
```

### If conditions
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

```sh
#!/bin/sh

input=0

while [ 1 ]; do
  input=$(expr $input + 1)
  echo $input
  sleep 1
done
```
