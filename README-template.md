# Shell-factory
Shell-factory is a simple yet powerful ESM module that allows you to create Bourne shell scripts on the fly using Typescript. It's intuitive syntax and chainable commands take all the hassle of formatting strings manually and remembering weird syntax away from you and provides you with a rich set of configurations to tailor the script according to your needs.

```sh
npm install shell-factory
```

## Components
Each shell-script is built with the Script-class which serves as the container for all building blocks. At this point, the following building-blocks are supported.

### Command
A command represents a single line of code. It can be a string or an instance of the Command class. Usually, a simple string is sufficient. However, the Command class inherits from the Statement class which offers additional functionalities like having an ID for later adjustment or adding comments which will be added to the generated code. For further modification commands also can be chained with several operators (see [Operations](#operations)).

(example:command)

### Variable
At this point two types of Variables are supported. *StringVariable* (or *StrVar*) and *NumberVariable* (or *NumVar*). They inherit from the *Variable* class and offer a variety or functions based on their type to support you with using variables comfortably. Each of the functions returns a new Statement instance which can be added as content directly or passed to other functions which accept Statements as their inputs. *NICE-TO-KNOW: If a variable is set as local, the first time the set-method is being called, the assignment statement is preceded with the "local" keyword.*

The example might seem intimidating at first glance as some of the concepts like *If* or *While* have not been discussed yet. Don't worry, just focus on the *Variable* operations to understand, how they work and how they can be combined. The rest will become clear later on (or intuitionally).

(example:variable)

### If
If-statements control the further code execution flow. The If-class adds the possibility to add all required else-if (+ else) branches via chaining as shown in the example. *NICE-TO-KNOW: The If-class also supports dis-/enabling testing (the brackets in the statement) by using the dontTest-, respectively test-getter.*

(example:if)

### While
While-loops execute the content in their body as long as the condition is fulfilled. *NICE-TO-KNOW: The While-class also supports dis-/enabling testing (the brackets in the statement) by using the dontTest-, respectively test-getter.*

(example:while)

### Until
Until-loops execute the content in their body until the condition is fulfilled. *NICE-TO-KNOW: The Until-class also supports dis-/enabling testing (the brackets in the statement) by using the dontTest-, respectively test-getter.*

(example:until)

### For
For-loops iterate over a defined collection of values and provid the current value via the specified variable.

(example:for)

### Select
Select is a builtin Shell function which provides the user with a selection menu based on the provided values.

(example:select)

### Case
Case looks at the provided input and decides, based on the defined cases, which branch to execute. *The Case-class expects CaseOption as it's content. Everything that is not a CaseOption instance is being added to the latest defined CaseOption.*

(example:case)

### Function
Functions are reusable code blocks which can be called at later points in the script. The Function-class also adds the possibility to map the positional parameters to function-internal variables for better usability.

(example:function)

The Function class additionally provides the *call*-method to return a function-call Command with the provided parameters.
(example:function-call)

### Condition
Conditions are separate Statement instances which test the passed condition string. Each string or Statement that is passed to a ConditionBlock (e.g., If, While, Until, ...) is converted to a Condition instance. However, they can also exist and be tested on their own. The Condition class additionally provides logical chaining using the *and*- and *or*-method. If you don't want to test the Condition, you can easily disable it using the *setTest*-method.

(example:condition)

## Operations
Commands and ConditionBlocks support the appliance of operations in a chained manner to provide you with comprehensive command combination options. At this point, the following operations are supported. *Further modification can be accomplished by using the findInChain-, removeFromChain- and clearChain-methods or getting the chain content via the chain-getter.*

### Read
Reads content from a file into the Command or ConditionBlock. *NOTICE: If testing has not been explicitely set on the ConditionBlock (e.g. If, While, Until, ...), testing gets disabled automatically (see example).*

(example:read)

### Write
Writes content to a file. *NOTICE: An existing file gets overwritten.*

(example:write)

### Append
Appends content to a file.

(example:append)

### Pipe
Pipes the output of a command into another command.

(example:pipe)

### And
Connects two commands with a logical AND. In case of a ConditionBlock instance, this operation adds a new AND-connected condition. *NICE-TO-KNOW: This operation can also be applied to standalone Condition-class instances.*

(example:and)

### Or
Connects two commands with a logical OR. In case of a ConditionBlock instance, this operation adds a new OR-connected condition. *NICE-TO-KNOW: This operation can also be applied to standalone Condition-class instances.*

(example:or)

### Subshell/Evaluation
Many Statement- and Block-types support subshelling/evaluation, meaning, the Statement or Block can be ran in a subshell and - in case of evaluation - its value directly be used. If a Statement or Block does not support subshelling/evaluation directly, it can be tried to pass the object to the *Subshell.call* or *Subshell.eval* method.

(example:subshell)

## Formatting
How scripts are being dumped can be configured separatelly by either setting the config directly on the Script instance via the *config*-setter or by passing it to the *dump*-method. Passing the config to the *dump*-method uses it only temporarily.

(example:dump-config)

## Modification
### Add
New content can be added to a block (e.g. If) by using the *addContent* method.

(example:add)

### Remove
Blocks and Statements can be removed from their parent block (e.g. Script) via their ID or a statement pattern using the *removeContent* method.

(example:remove)

### Alter
Blocks and Statements can be altered by retrieving them via their ID or a statement pattern through their parent block (e.g. Script) with the *findContent* method and altering the returned object(s).

(example:alter)
