import type { ITransactionMessageComponentGroup } from '../../bridge/transactionMessage/ITransactionMessageComponentGroup';
import type { IOperationGroupComponent } from './IOperationGroupComponent';
import InsufficientOperationsError from './errors/InsufficientOperationsError';
import InvalidGroupsSortError from './errors/InvalidGroupsSortError';
import type { OperationComponent } from './operations/OperationComponent';

export default function groupOperationComponents(
    operations: OperationComponent[],
    groups: ITransactionMessageComponentGroup[],
): (OperationComponent | IOperationGroupComponent)[] {
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
    const transactionGroups: (OperationComponent | IOperationGroupComponent)[] = [];

    if (lastGroup && !operations[lastGroup.to]) {
        throw new InsufficientOperationsError(operations.length, lastGroup.to);
    } else {
        let startIndex = 0;

        for (let i = 0; i < groups.length; i++) {
            const nextGroup = groups[i + 1];

            const operationComponents: OperationComponent[] = [];
            for (let j = startIndex; j < operations.length; j++) {
                if (j >= groups[i]!.from && j < groups[i]!.to) {
                    operationComponents.push(operations[j]!);
                } else if (j === groups[i]!.to) {
                    operationComponents.push(operations[j]!);
                    transactionGroups.push({
                        title: groups[i]!.title,
                        description: groups[i]!.description,
                        operationComponents,
                    });
                    startIndex = j + 1;
                    if (nextGroup) {
                        break;
                    }
                } else {
                    transactionGroups.push(operations[j]!);
                }
            }
        }
    }

    return transactionGroups;
}
