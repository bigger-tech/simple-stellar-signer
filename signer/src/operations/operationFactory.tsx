import { Operation, OperationType } from "stellar-base";
import paymentOperation from "./paymentOperation";

const operationHandlers = new Map<OperationType, Function>([
  ["payment", paymentOperation],
]);

export default (operation: Operation) => operationHandlers.get(operation.type)(operation)
