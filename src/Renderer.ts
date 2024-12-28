import Vector2D from "./math/Vector2D";

export default class Renderer {
    private _canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    constructor(canvas:HTMLCanvasElement) {
        this._canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
    }

    public drawSprite(img:HTMLImageElement, pos:Vector2D):void {
        this.ctx.drawImage(img, pos.x - img.width/2, pos.y - img.height/2);
    }
}