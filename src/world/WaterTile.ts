import {Tile} from "./Tile";
import {World} from "../World";
import Vector3D from "../math/Vector3D";
import {Sprite} from "../Sprite";
import Vector2D from "../math/Vector2D";

export default class WaterTile extends Tile {
    private sprite: Sprite;

    constructor() {
        super(new Vector3D(0, 0, 0));

        this.sprite = new Sprite(["/tiles/0001.png","/tiles/0002.png","/tiles/0003.png","/tiles/0004.png"])
    }

    tick(t: number) {
        super.tick(t);

        World.instance.renderer.drawSprite(this.sprite.getImage(), Vector2D.fromVector3D(this.pos))
    }

    begin() {
        super.begin();
    }
}