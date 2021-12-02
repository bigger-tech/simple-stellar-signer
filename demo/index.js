/**
 * @Global StellarSdk
 */

const $button = document.querySelector("#checkout");
$button.addEventListener("click", (e) => {
  e.preventDefault();
  const simpleSigner = document.querySelector("#simple-signer").contentWindow;
  simpleSigner.postMessage({
    xdr: document.querySelector("#xdr").value,
    networkPassphrase: StellarSdk.Networks.TESTNET,
  }, "*");
});
