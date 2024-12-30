import Tile from "./world/Tile";
import Point from "./math/Point";

export default class Renderer {
    private _canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private tilesToRender: Tile[] = [];

    constructor(canvas:HTMLCanvasElement) {
        this._canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
    }

    public renderTile(t:Tile){
        this.tilesToRender.push(t);
    }

    public makePass(){
        this.passClear();
        this.passDraw();
    }

    private passDraw() {

        this.tilesToRender.sort((a, b) =>  {
            return a.pos.r - b.pos.r;
        });

        this.tilesToRender.forEach((object) => {
            const pos = object.pos.toPoint(object.size, object.sprite.offset);
            const img = object.sprite.getImage();

            this.ctx.drawImage(img, this._canvas.width/2 + pos.x - img.width/2, this._canvas.height/2 + (pos.y - img.height/2));
        });

        this.tilesToRender = [];
    }

    private passClear(){
        this.ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }
}