export function setMinimumPopUpSize(popup: string): void {
    const defaultConnectPopupWidth = 360;
    const defaultConnectPopupHeight = 510;
    const minimumConnectPopupHeight = 210;
    const minimumConnectPopupWidth = 340;

    const minimumSignPopupHeight = 570;
    const minimumSignPopupWidth = 360;
    const defaultSignPopupHeight = 570;
    const defaultSignPopupWidth = 360;

    if (popup === 'connect') {
        if (window.outerHeight < minimumConnectPopupHeight) {
            self.resizeTo(self.outerWidth, defaultConnectPopupHeight);
        }

        if (window.outerWidth < minimumConnectPopupWidth) {
            self.resizeTo(defaultConnectPopupWidth, self.outerHeight);
        }
    } else if (popup === 'sign') {
        if (window.outerHeight < minimumSignPopupHeight) {
            self.resizeTo(self.outerWidth, defaultSignPopupHeight);
        }

        if (window.outerWidth < minimumSignPopupWidth) {
            self.resizeTo(defaultSignPopupWidth, self.outerHeight);
        }
    }
}
