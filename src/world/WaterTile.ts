import {Tile} from "./Tile";
import {World} from "../World";
import {Vector} from "../math/Vector";
import {Sprite} from "../Sprite";

export default class WaterTile extends Tile {
    private sprite: Sprite;

    constructor() {
        super(new Vector(0, 0, 0));

        this.sprite = new Sprite(["/tiles/0000.png","/tiles/0001.png","/tiles/0002.png","/tiles/0003.png"])
    }

    tick(t: number) {
        super.tick(t);

        World.context.drawImage(this.sprite.getImage(), this.pos.x, this.pos.y)
    }

    begin() {
        super.begin();
    }
}