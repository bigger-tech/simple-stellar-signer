declare const window: any;

export async function initXBull() {
    const permissions = await window.xBullSDK.connect({
        canRequestPublicKey: true,
        canRequestSign: true,
    });
    const publicKey = await window.xBullSDK.getPublicKey();
    console.log(publicKey, permissions);
}
