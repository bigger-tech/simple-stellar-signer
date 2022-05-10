export function setMinimumPopUpSize(
    minimumHeight: number,
    minimumWidth: number,
    defaultHeight: number,
    defaultWidth: number,
): void {
    const width = window.outerWidth < minimumWidth ? defaultWidth : window.outerWidth;
    const height = window.outerHeight < minimumHeight ? defaultHeight : window.outerHeight;

    self.resizeTo(width, height);
}
