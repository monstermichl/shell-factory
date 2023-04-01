import { IChainable } from '../interfaces/chainable.mjs';
import { Command } from '../base/command.mjs';
import { IConditionable } from '../interfaces/conditionable.mjs';
import {
    LogicalConnectType,
    ILogicallyConnectable,
} from '../interfaces/logically-connectable.mjs';
import { OperationalConnectType } from '../interfaces/operationally-connectable.mjs';
import { ConditionBlock } from './condition-block.mjs';
import { SubshellBlock } from '../components/subshell/subshell-block.mjs';
import { EvalSubshellBlock } from '../components/subshell/eval-subshell-block.mjs';

/**
 * Serves as the base for all blocks that require to handle conditions
 * (e.g., If, While, ...) and can be executed in a subshell.
 */
export abstract class SubshellableConditionBlock extends ConditionBlock implements IChainable<OperationalConnectType | LogicalConnectType, Command>, IConditionable, ILogicallyConnectable {
    /**
     * Returns the block in a subshell block.
     *
     * @returns A new SubshellBlock instance.
     */
    public subshell(): SubshellBlock {
        return new SubshellBlock(this);
    }

    /**
     * Returns the block in an evaluation-subshell block.
     *
     * @returns A new EvalSubshellBlock instance.
     */
    public eval(): EvalSubshellBlock {
        return this.subshell().eval();
    }
}
