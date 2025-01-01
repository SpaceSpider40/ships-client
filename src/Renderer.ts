import Tile from "./world/Tile";
import Point from "./math/Point";
import {Input, InputListener} from "./Input";

export default class Renderer implements InputListener {
    private _canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private tilesToRender: Tile[] = [];
    private screenOffset: Point = new Point(0, 0);

    private changeSprite:boolean = false;

    constructor(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
        this.ctx = canvas.getContext("2d")!;

        Input.instance.addListener(this);
    }

    public renderTile(t: Tile) {
        this.tilesToRender.push(t);
    }

    public makePass(t:number) {
        console.log(t)
        if (t%60===0){
            this.changeSprite = true;
        }
        this.passClear();
        this.passDraw();
    }

    private passDraw() {
        this.tilesToRender.sort((a, b) => {
            return a.pos.r - b.pos.r;
        });

        this.tilesToRender.forEach((object) => {
            const pos = object.pos.toPoint(object.size, object.sprite.offset);
            const img = this.changeSprite?object.sprite.getNextImage():object.sprite.getImage();


            this.ctx.drawImage(
                img,
                (this.screenOffset.x - this._canvas.width/2) + (this._canvas.width / 2 + (pos.x - img.width / 2)),
                (this.screenOffset.y - this._canvas.height/2) + (this._canvas.height / 2 + (pos.y - img.height / 2))
            );
        });

        //reset renderer before next pass
        this.changeSprite = false;
        this.tilesToRender = [];
    }

    private passClear() {
        this.ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

    onMouseMove(target: Point) {
        if (Input.instance.isRightBtnDown) {
            this.screenOffset = target;

            // this.makePass();
        }
    }

    onRMBUp(target: Point) {
        // this.makePass();
    }
}