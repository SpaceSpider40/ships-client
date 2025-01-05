import WaterTile from "./world/WaterTile";
import Hex from "./math/Hex";
import Tile from "./world/Tile";
import Point from "./math/Point";

export default class WorldMap {
    public static readonly instance: WorldMap = new WorldMap();

    private tiles: Tile[] = []

    private constructor() {

    }

    public generateMap() {
        //Todo: dynamical generate a random map

        this.tiles = [
            new WaterTile(new Hex(0, 1, -1)),
            new WaterTile(new Hex(-1, 1, 0)),
            new WaterTile(new Hex(0, 0, 0)),
            new WaterTile(new Hex(1, -1, 0)),
            new WaterTile(new Hex(1, -2, 0)),
            new WaterTile(new Hex(2, -2, 0)),
            new WaterTile(new Hex(0, -1, 1)),
            new WaterTile(new Hex(0, -2, 2))
        ]
    }

    public checkIntersect(pos: Hex|Point, rtn:boolean=false): boolean|Tile {
        for (const tile of this.tiles) {
            let p = pos;
            if (p instanceof Point) {
                p = p.toHex(tile.size, tile.sprite.offset);
            }

            if (tile.pos.equals(p)) {
                console.log(tile.pos)
                return rtn?tile:true;
            }
        }

        return false;
    }
}