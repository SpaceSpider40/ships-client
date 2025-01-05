import Tile from "./world/Tile";
import Point from "./math/Point";
import {Input, InputListener} from "./Input";
import {World} from "./World";
import Indicator from "./world/Indicator";

export default class Renderer implements InputListener {
    private _canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private tilesToRender: Tile[] = [];
    public screenOffset: Point = new Point(0, 0);

    private changeSprite: boolean = false;

    private indicator: Indicator | null = null;

    constructor(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
        this.ctx = canvas.getContext("2d")!;

        Input.instance.addListener(this);
    }

    public renderTile(t: Tile) {
        this.tilesToRender.push(t);
    }

    public makePass(t: number) {
        if (t % 60 === 0) {
            this.changeSprite = true;
        }
        this.passClear();
        this.passDraw();
        this.passIndicator();
    }

    private drawImage(img: HTMLImageElement, pos: Point) {
        this.ctx.drawImage(
            img,
            this.screenOffset.x + (pos.x - img.width / 2),
            this.screenOffset.y + (pos.y - img.height / 2)
        );
    }

    private passDraw() {
        this.tilesToRender.sort((a, b) => {
            return a.pos.r - b.pos.r;
        });

        this.tilesToRender.forEach((object) => {
            const pos = object.pos.toPoint(object.size, object.sprite.offset);
            const img = this.changeSprite ? object.sprite.getNextImage() : object.sprite.getImage();

            this.drawImage(img, pos);
        });

        //reset renderer before next pass
        this.changeSprite = false;
        this.tilesToRender = [];
    }

    private passClear() {
        this.ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

    private passIndicator() {
        const selectedTile = World.instance.selectedTile;

        if (selectedTile === null) return;
        if (this.indicator === null) {
            this.indicator = new Indicator();
        }


        this.indicator.moveTo(selectedTile.pos);

        // console.log(this.indicator.pos, selectedTile.pos);

        this.drawImage(this.indicator.sprite.getImage(), this.indicator.pos.toPoint(this.indicator.size, this.indicator
            .sprite.offset))
    }

    onMouseMove(target: Point) {
        if (Input.instance.isRightBtnDown) {
            this.screenOffset = new Point(
                this.screenOffset.x + Input.instance.cursorDistance.x,
                this.screenOffset.y + Input.instance.cursorDistance.y
            );
        }
    }

    onMouseWheelUp(target: Point) {
        //todo: zoom in
    }

    onMouseWheelDown(target: Point) {
        //todo: zoom out
    }
}