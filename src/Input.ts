import Point from "./math/Point";
import WorldMap from "./WorldMap";
import {World} from "./World";
import Tile from "./world/Tile";
import Renderer from "./Renderer";

export interface InputListener {
    onLMBDown?: (target: Point) => void;
    onLMBUp?: (target: Point) => void;
    onRMBDown?: (target: Point) => void;
    onRMBUp?: (target: Point) => void;
    onMouseMove?: (target: Point) => void;
    onMouseWheelUp?: (target: Point) => void;
    onMouseWheelDown?: (target: Point) => void;
}

export class Input {
    get cursorDistance(): Point {
        return this._cursorDistance;
    }

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
    private _cursorDistance: Point = new Point(0, 0);

    private _isLeftBtnDown: boolean = false;
    private _isRightBtnDown: boolean = false;

    private interactionSpace = <HTMLElement>document.getElementById('game-canvas');

    private constructor() {
        this.interactionSpace.onmousemove = (ev: MouseEvent) => this.mouseMove(ev);
        this.interactionSpace.onmousedown = (ev: MouseEvent) => this.mouseDown(ev);
        this.interactionSpace.onmouseup = (ev: MouseEvent) => this.mouseUp(ev);
        this.interactionSpace.onwheel = (ev: WheelEvent) => this.mouseWheel(ev);

        this.interactionSpace.oncontextmenu = (ev:MouseEvent) => {ev.preventDefault();}
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
        });
    }

    private mouseMove(ev: MouseEvent): void {
        this._cursorPosition = new Point(ev.offsetX, ev.offsetY);
        this._cursorDistance = new Point(ev.movementX, ev.movementY);

        this.notifySubscribers("onMouseMove", this._cursorPosition);

        this.updateSelection();
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

        if (this._isLeftBtnDown) {
            this._isLeftBtnDown = false;
            this.notifySubscribers("onLMBUp", this._cursorPosition);
        }

        if (this._isRightBtnDown) {
            this._isRightBtnDown = false;
            this.notifySubscribers("onRMBUp", this._cursorPosition);
        }
    }

    private mouseWheel(ev: WheelEvent): void {
        ev.preventDefault();

        if (ev.deltaY > 0) {
            this.notifySubscribers("onMouseWheelUp", this._cursorPosition);
        } else {
            this.notifySubscribers("onMouseWheelDown", this._cursorPosition);
        }
    }

    private updateSelection(): void {
        const intersection = WorldMap.instance.checkIntersect(
            World.instance.renderer.screenOffset.subtract(this._cursorPosition),
            true
        );

        //TODO: [FIXME] fix mirroring of intersected tile

        if (intersection && intersection instanceof Tile) {
            World.instance.selectedTile = intersection
        }
    }
}