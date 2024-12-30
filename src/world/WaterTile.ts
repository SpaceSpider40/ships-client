import Tile from "./Tile";
import {World} from "../World";
import {Sprite} from "../Sprite";
import Hex from "../math/Hex";

export default class WaterTile extends Tile {

    constructor(pos: Hex) {
        super(
            pos,
            44,
            new Sprite(
                ["/tiles/0001.png", "/tiles/0002.png", "/tiles/0003.png", "/tiles/0004.png"],
                {
                    x: 0,
                    y: 18
                }
            )
        );
    }

    tick(t: number) {
        super.tick(t);

        World.instance.renderer.renderTile(this);
    }

    begin() {
        super.begin();
    }
}