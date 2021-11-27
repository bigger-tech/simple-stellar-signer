import {app, h as _h} from "hyperapp";
import html from 'hyperlit'
import xBull from "./wallets/xBull";

const h = _h;

function setPopup(state) {
    return ({...state, popup: true});
}

const Connect = (state) => [
  state,
  [
      dispatch => {
        xBull().then(console.log);
      }
  ]
];

const walletConnector = app({
    init: {popup: false},
    view: (state) => {
        return html`
            <div>
                <button onclick=${setPopup}>Connect wallet</button>
                ${state.popup ?
                        html`<a href="#" onclick=${Connect}>xBull</a>`
                        : ''
                }
            </div>`;
    },
    node: document.getElementById("app")
});
