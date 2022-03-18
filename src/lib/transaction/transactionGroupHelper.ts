import type { IGroupsFromParam } from './ITxParams';
import type { OperationComponentTypes } from './operations/OperationComponentTypes';

export default function groupComponents(operations: typeof OperationComponentTypes[], groups: IGroupsFromParam[]) {
    const lastTo = groups[groups.length - 1]?.to;
    const group: any[] = [];

    if (groups.length === 0) {
        console.log("A group of operations wasn't provided");
    } else if (!operations[lastTo!]) {
        console.error('There are fewer operations than the groups says');
    } else {
        let startIndex = 0;

        for (let j = 0; j < groups.length; j++) {
            if (groups[j + 1] && groups[j]!.from > groups[j + 1]!.from) {
                console.error('the object is wrong sorted'); // TO DO mejora esto
                break;
            }

            const array = [];
            for (let i = 0; i < operations.length; i++) {
                console.log(i);

                if (i >= groups[j]!.from && i < groups[j]!.to) {
                    array.push(operations[i]);
                } else if (i === groups[j]!.to) {
                    array.push(operations[i]);
                    group.push(array);
                    startIndex = i + 1;
                    if (j != groups.length - 1) {
                        break;
                    }
                } else if (i >= startIndex) {
                    group.push(operations[i]);
                }
            }
        }
    }

    console.log(group);
}
