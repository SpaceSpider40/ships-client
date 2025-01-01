import Point from "./math/Point";

export interface InputListener {
    onLMBDown?: (target: Point) => void;
    onLMBUp?: (target: Point) => void;
    onRMBDown?: (target: Point) => void;
    onRMBUp?: (target: Point) => void;
    onMouseMove?: (target: Point) => void;
}

export class Input {
    get cursorPosition(): Point {
        return this._cursorPosition;
    }
    get isLeftBtnDown(): boolean {
        return this._isLeftBtnDown;
    }
    get isRightBtnDown(): boolean {
        return this._isRightBtnDown;
    }

    public static instance: Input = new Input();

    private static subscribedListeners: InputListener[] = [];

    private _cursorPosition: Point = new Point(0, 0);

    private _isLeftBtnDown: boolean = false;
    private _isRightBtnDown: boolean = false;

    private canvasElement = <HTMLElement>document.getElementById('game-canvas');

    private constructor() {
        this.canvasElement.onmousemove = (ev:MouseEvent) => this.mouseMove(ev);
        this.canvasElement.onmousedown = (ev:MouseEvent)=> this.mouseDown(ev);
        this.canvasElement.onmouseup = (ev:MouseEvent)=> this.mouseUp(ev);
    }

    public addListener(listener: InputListener) {
        if (!Input.subscribedListeners.includes(listener)) {
            Input.subscribedListeners.push(listener);
        }
    }

    private notifySubscribers(what: keyof InputListener, where: Point): void {
        Input.subscribedListeners.forEach((listener: InputListener) => {
            if (listener[what])
                listener[what](where);
        })
    }

    private mouseMove(ev: MouseEvent): void {
        this._cursorPosition = new Point(ev.offsetX, ev.offsetY);

        this.notifySubscribers("onMouseMove", this._cursorPosition);
    }

    private mouseDown(ev: MouseEvent): void {
        this._cursorPosition = new Point(ev.offsetX, ev.offsetY);

        switch (ev.buttons) {
            case 1:
                this._isLeftBtnDown = true;
                this.notifySubscribers("onLMBDown", this._cursorPosition);
                break;
            case 2:
                this._isRightBtnDown = true;
                this.notifySubscribers("onRMBDown", this._cursorPosition);
                break;
        }
    }

    private mouseUp(ev: MouseEvent): void {
        this._cursorPosition = new Point(ev.offsetX, ev.offsetY);

        if (ev.buttons !== 0) return;

        if (this._isLeftBtnDown){
            this._isLeftBtnDown = false;
            this.notifySubscribers("onLMBUp", this._cursorPosition);
        }

        if (this._isRightBtnDown){
            this._isRightBtnDown = false;
            this.notifySubscribers("onRMBUp", this._cursorPosition);
        }
    }
}