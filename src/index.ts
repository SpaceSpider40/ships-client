function selectionIndicator(self: HTMLElement, show: boolean): void {
    if (show)
        self.textContent = `> ${self.textContent ?? ''}`
    else
        self.textContent = (self.textContent ?? '').replace(/>\s*/, '')
}

function hide(self: HTMLElement) :void{
    self.classList.add('hide');
}

function show(self: HTMLElement) :void{
    self.classList.remove('hide');
}


