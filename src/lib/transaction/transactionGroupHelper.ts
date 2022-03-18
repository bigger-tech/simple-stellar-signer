import type { IGroupsFromParam, ITransactionGroup } from './ITxParams';
import type { OperationComponentTypes } from './operations/OperationComponentTypes';

export default function groupComponents(
    operations: typeof OperationComponentTypes[],
    groups: IGroupsFromParam[],
): (typeof OperationComponentTypes | ITransactionGroup)[] {
    const lastTo = groups[groups.length - 1]?.to;
    const group: (typeof OperationComponentTypes | ITransactionGroup)[] = [];

    if (groups.length === 0) {
        console.log("A group of operations wasn't provided");
        return operations;
    } else if (!operations[lastTo!]) {
        console.error('There are fewer operations than the groups says');
    } else {
        let startIndex = 0;

        for (let i = 0; i < groups.length; i++) {
            if (groups[i + 1] && groups[i]!.from > groups[i + 1]!.from) {
                console.error('The group object is not well sorted');
                return operations;
            }

            const array: typeof OperationComponentTypes[] = [];
            for (let k = startIndex; k < operations.length; k++) {
                if (k >= groups[i]!.from && k < groups[i]!.to) {
                    array.push(operations[k]!);
                } else if (k === groups[i]!.to) {
                    array.push(operations[k]!);
                    group.push({ description: groups[i]!.description, operationsComponents: array });
                    startIndex = k + 1;
                    if (i != groups.length - 1) {
                        break;
                    }
                } else {
                    group.push(operations[k]!);
                }
            }
        }
    }

    return group;
}
