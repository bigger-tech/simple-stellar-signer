import type { IGroupsFromParam, ITransactionGroup } from './ITxParams';
import type { OperationComponentTypes } from './operations/OperationComponentTypes';

export default function groupComponents(
    operations: typeof OperationComponentTypes[],
    groups: IGroupsFromParam[],
): (typeof OperationComponentTypes | ITransactionGroup)[] {
    const lastGroup = groups[groups.length - 1];
    const transactionGroups: (typeof OperationComponentTypes | ITransactionGroup)[] = [];

    if (groups.length === 0) {
        console.log("A group of operations wasn't provided");
        return operations;
    } else if (lastGroup && !operations[lastGroup.to]) {
        console.error('There are fewer operations than the groups says');
        return operations;
    } else {
        let startIndex = 0;

        for (let i = 0; i < groups.length; i++) {
            const currentGroup = groups[i];
            const nextGroup = groups[i + 1];

            if (nextGroup && currentGroup && currentGroup.from > nextGroup.from) {
                console.error('The group object is not well sorted');
                return operations;
            }

            const array: typeof OperationComponentTypes[] = [];
            for (let j = startIndex; j < operations.length; j++) {
                const currentOperation = operations[j];
                if (currentGroup && currentOperation) {
                    if (j >= currentGroup.from && j < currentGroup.to) {
                        array.push(currentOperation);
                    } else if (j === currentGroup.to) {
                        array.push(currentOperation);
                        transactionGroups.push({ description: currentGroup.description, operationsComponents: array });
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
