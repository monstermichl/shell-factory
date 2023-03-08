# Script builder
Script builder is a simple yet powerful library to create Bourne shell scripts on the fly using Typescript. It's intuitive syntax and chainable commands takes all the hassle of formatting strings manually away and gives the user a rich set of configurations to configure the script output to its desired needs.

## Example
### Script
```typescript
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
```

```sh
#!/bin/sh

while [ 1 ]; do
  read -p "What do you want to say?" input

  if [ "$input" == "Hello" ]; then
    echo "Hello, my dear!"
    break
  else
    echo "Why aren't you greeting me? :("
  fi
done

```
