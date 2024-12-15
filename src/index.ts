function selectionIndicator(self: HTMLElement, show: boolean): void {
    if (show)
        self.textContent = `> ${self.textContent ?? ''}`
    else
        self.textContent = (self.textContent ?? '').replace(/>\s*/, '')
}

function hide(self: HTMLElement): void {
    self.classList.add('hide');
}

function show(self: HTMLElement): void {
    self.classList.remove('hide');
}

let currentPageId: string = 'main-menu';

function switchPage(pageId: string): void {
    const element = document.getElementById(pageId);

    if (element) {
        show(element);
        const currentElement = document.getElementById(currentPageId);
        if (currentElement) {
            hide(currentElement)
        }

        currentPageId = pageId;
    }
}