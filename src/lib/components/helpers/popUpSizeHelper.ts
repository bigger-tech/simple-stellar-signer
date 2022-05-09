export function setMinimumPopUpSize(
    minimumHeight: number,
    minimumWidth: number,
    defaultHeight: number,
    defaultWidth: number,
): void {
    if (window.outerHeight < minimumHeight && window.outerWidth < minimumWidth) {
        self.resizeTo(defaultWidth, defaultHeight);
    } else if (window.outerHeight < minimumHeight) {
        self.resizeTo(window.outerWidth, defaultHeight);
    } else if (window.outerWidth < minimumWidth) {
        self.resizeTo(defaultWidth, window.outerHeight);
    }
}
