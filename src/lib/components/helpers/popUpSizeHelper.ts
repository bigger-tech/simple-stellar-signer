export function setMinimumPopUpSize(
    minimumHeight: number,
    minimumWidth: number,
    defaultHeight: number,
    defaultWidth: number,
): void {
    if (window.outerHeight < minimumHeight) {
        self.resizeTo(self.outerWidth, defaultHeight);
    }

    if (window.outerWidth < minimumWidth) {
        self.resizeTo(defaultWidth, self.outerHeight);
    }
}
