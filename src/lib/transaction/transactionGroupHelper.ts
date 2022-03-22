import type { IGroup, ITransactionGroup } from './ITxParams';
import type { OperationComponentTypes } from './operations/OperationComponentTypes';
import InvalidGroupsSortError from '../errors/InvalidGroupsSortError';

export default function groupComponents(
    operations: typeof OperationComponentTypes[],
    groups: IGroup[],
): (typeof OperationComponentTypes | ITransactionGroup)[] {
    const positions = groups
        .map((group) => {
            return [...new Array(group.to - group.from + 1).keys()].map((i) => group.from + i);
        })
        .flat();

    if (
        [...positions]
            .sort((a, b) => {
                return a - b;
            })
            .join() !== positions.join()
    ) {
        throw new InvalidGroupsSortError(positions.join());
    }

    const lastGroup = groups[groups.length - 1];
    const transactionGroups: (typeof OperationComponentTypes | ITransactionGroup)[] = [];

    if (groups.length === 0) {
        console.log("A group of operations wasn't provided");
        return operations;
    } else if (lastGroup && !operations[lastGroup.to]) {
        console.error('There are fewer operations than the group says');
        return operations;
    } else {
        let startIndex = 0;

        for (let i = 0; i < groups.length; i++) {
            const currentGroup = groups[i];
            const nextGroup = groups[i + 1];

            const operationComponents: typeof OperationComponentTypes[] = [];
            for (let j = startIndex; j < operations.length; j++) {
                const currentOperation = operations[j];
                if (currentGroup && currentOperation) {
                    if (j >= currentGroup.from && j < currentGroup.to) {
                        operationComponents.push(currentOperation);
                    } else if (j === currentGroup.to) {
                        operationComponents.push(currentOperation);
                        transactionGroups.push({
                            description: currentGroup.description,
                            operationComponents,
                        });
                        startIndex = j + 1;
                        if (nextGroup) {
                            break;
                        }
                    } else {
                        transactionGroups.push(currentOperation);
                    }
                }
            }
        }
    }

    return transactionGroups;
}
