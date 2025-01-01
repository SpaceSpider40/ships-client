import {World} from "./World";
import {Input} from "./Input";

function registerSelectIndicators(): void {
    const elements = document.getElementsByClassName("select-indicator") as HTMLCollectionOf<HTMLElement>;

    for (const element of elements) {
        element.onmouseover = () => {
            element.textContent = `>${element.textContent}`;
        }

        element.onmouseout = () => {
            element.textContent = element.textContent?.replace(">", "")??"";
        }
    }
}

function registerButtons(): void {
    document.getElementById("create-room")!.onclick = () => {
        switchPage("room-menu")
    }
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

window.onload = () => {
    registerSelectIndicators();
    registerButtons();

    World.instance.start();
}