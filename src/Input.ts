export default class Input {
    get cursorX(): number {
        return this._cursorX;
    }
    get cursorY(): number {
        return this._cursorY;
    }

    public static instance: Input = new Input();
    private _cursorX: number = 0;
    private _cursorY: number = 0;

    private canvasElement = <HTMLElement>document.getElementById('game-canvas');

    private constructor() {
        this.canvasElement.onmousemove = this.mouseMove;
        this.canvasElement.onmousedown = this.mouseClick;
    }

    private mouseMove(ev: MouseEvent): void {
        this._cursorX = ev.offsetX;
        this._cursorY = ev.offsetY;
    }

    private mouseClick(ev: MouseEvent): void {
        console.log('MOUSE LEFT CLICK: ', ev.button)
    }

    public onLeftClick(callback:any): void {
        this.canvasElement.addEventListener('mousedown', (ev: MouseEvent) => {
            if (ev.buttons === 1){
                callback()
            }
        });
    }

    public onRightClick(callback:any): void {
        this.canvasElement.removeEventListener('mousedown', (ev: MouseEvent) => {
            if (ev.buttons === 2){
                callback()
            }
        })
    }
}