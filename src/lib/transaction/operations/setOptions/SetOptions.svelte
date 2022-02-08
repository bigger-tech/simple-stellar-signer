<script lang="ts">
    export let optionalSource: string;
    export let defaultSource: string;
    export let inflationDest: string;
    export let clearFlags: string;
    export let setFlags: string;
    export let masterWeight: string;
    export let lowThreshold: string;
    export let medThreshold: string;
    export let highThreshold: string;

    // Mejorar cuando se comitee
    // De inflationDest para abajo, son buffers, por eso se tienen que decriptar antes
</script>

<div class="simple-signer set-options-operation">
    <h3>Operation: Payment</h3>

    <p>Source Account: {optionalSource ? optionalSource : defaultSource}</p>
    <p>Destination inflation: {inflationDest}</p>
    <p>Clear Flags: {clearFlags}</p>
    <p>Set Flags: {setFlags}</p>
    <p>Master Weight: {masterWeight}</p>
    <p>Low Threshold: {lowThreshold}</p>
    <p>Medium Threshold: {medThreshold}</p>
    <p>High Threshold: {highThreshold}</p>
</div>
