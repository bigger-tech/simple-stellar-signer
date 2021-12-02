import html from "hyperlit";
import { Operation } from "stellar-base";

export default (operation: Operation.Payment) => html`
    <div>Pay ${operation.amount} ${operation.asset.code}</div>`;
