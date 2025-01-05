import Point from "../math/Point";
import {Sprite} from "../Sprite";
import Tile from "./Tile";
import Hex from "../math/Hex";

export default class Indicator extends Tile {
    constructor() {
        super(
            new Hex(0, 0, 0),
            44,
            new Sprite(
                ['tile_indicator.png'],
                {x: 0, y: 18}
            )
        );
    }

    public moveTo(p: Hex) {
        this.pos = p;
    }
}