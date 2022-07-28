export default function clickOutside(element: HTMLElement, callBackFunction: () => void) {
    // credits to https://svelte.dev/repl/8031c800d7e34fd692dd18174b514e4e?version=3.47.0
    function onClick(event: MouseEvent) {
        if (!element.contains(event.target as Node)) {
            callBackFunction();
        }
    }

    document.body.addEventListener('click', onClick);

    return {
        update(newCallbackFunction: () => void) {
            callBackFunction = newCallbackFunction;
        },
        destroy() {
            document.body.removeEventListener('click', onClick);
        },
    };
}
