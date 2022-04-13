/**
 * @jest-environment jsdom
 */
import { expect } from '@jest/globals';

import type { ITransactionMessageComponentGroup } from '../../../bridge/transactionMessage/ITransactionMessageComponentGroup';
import type IOperationComponent from '../operations/IOperationComponent';
import groupOperationComponents from '../transactionGroupHelper';

let groups: ITransactionMessageComponentGroup[];

const operations = ['op0', 'op1', 'op2', 'op3', 'op4', 'op5', 'op6'] as unknown as IOperationComponent[];

it('should recieve an array with grouped components var1', () => {
    groups = [
        {
            from: 0,
            to: 1,
            description: 'test',
            title: 'test',
        },
        {
            from: 2,
            to: 3,
            description: 'test',
            title: 'test',
        },
        {
            from: 4,
            to: 5,
            description: 'test',
            title: 'test',
        },
    ];

    const result = groupOperationComponents(operations, groups);
    expect(result).toStrictEqual([
        { description: 'test', operationComponents: ['op0', 'op1'] },
        { description: 'test', operationComponents: ['op2', 'op3'] },
        { description: 'test', operationComponents: ['op4', 'op5'] },
        'op6',
    ]);
});

it('should recieve an array with grouped components var2', () => {
    groups = [
        {
            from: 0,
            to: 1,
            description: 'test',
            title: 'test',
        },
        {
            from: 4,
            to: 5,
            description: 'test',
            title: 'test',
        },
    ];
    const result = groupOperationComponents(operations, groups);
    expect(result).toStrictEqual([
        { description: 'test', operationComponents: ['op0', 'op1'] },
        'op2',
        'op3',
        { description: 'test', operationComponents: ['op4', 'op5'] },
        'op6',
    ]);
});

it('should recieve an array with grouped components var3', () => {
    groups = [
        {
            from: 1,
            to: 2,
            description: 'test',
            title: 'test',
        },
    ];
    const result = groupOperationComponents(operations, groups);
    expect(result).toStrictEqual([
        'op0',
        { description: 'test', operationComponents: ['op1', 'op2'] },
        'op3',
        'op4',
        'op5',
        'op6',
    ]);
});

it("should recieve an error if the groups aren't well sorted", () => {
    groups = [
        {
            from: 4,
            to: 5,
            description: 'test',
            title: 'test',
        },
        {
            from: 0,
            to: 1,
            description: 'test',
            title: 'test',
        },
    ];

    expect(() => groupOperationComponents(operations, groups)).toThrow(
        `The groups aren't sorted sequentially [4,5,0,1]`,
    );
});

it('should recieve an error if there are less operations that the group says', () => {
    groups = [
        {
            from: 4,
            to: 5,
            description: 'test',
            title: 'test',
        },
        {
            from: 6,
            to: 10,
            description: 'test',
            title: 'test',
        },
    ];

    expect(() => groupOperationComponents(operations, groups)).toThrow(
        'There are fewer operations than the groups says. (7) operations | (11) operations on the groups',
    );
});
