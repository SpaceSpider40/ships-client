import Hex from "../math/Hex";
import { Sprite } from "../Sprite";
import { World } from "../World";
import Tile from "./Tile";

export default class DestroyerTile extends Tile {
    constructor(pos: Hex) {
        super(
            pos,
            1080,
            new Sprite(
                [
                    "/destroyer/destroyer_000.png",
                    "/destroyer/destroyer_001.png",
                    "/destroyer/destroyer_002.png",
                    "/destroyer/destroyer_003.png",
                    "/destroyer/destroyer_004.png",
                    "/destroyer/destroyer_005.png",
                ],
                {
                    x: 0,
                    y: 0,
                }
            )
        );
    }

    public tick(t: number): void {
        World.instance.renderer.renderTile(this);
    }
}
