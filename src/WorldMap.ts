import WaterTile from "./world/WaterTile";
import Hex from "./math/Hex";
import Tile from "./world/Tile";
import Point from "./math/Point";
import DestroyerTile from "./world/DestroyerTile";

export default class WorldMap {
    public static readonly instance: WorldMap = new WorldMap();

    private tiles: Tile[] = [];

    private constructor() {}

    public generateMap() {
        this.spawnTile(new WaterTile(new Hex(0, 0, 0)));
    }

    public spawnVesseles(){
        this.tiles.push(new DestroyerTile(new Hex(0, 0, 0)));
    }

    public checkIntersect(
        pos: Hex | Point,
        rtn: boolean = false
    ): boolean | Tile {
        for (const tile of this.tiles) {
            let p = pos;
            if (p instanceof Point) {
                p = p.toHex2(tile.size); //, tile.sprite.offset
            }

            if (tile.pos.equals(p)) {
                return rtn ? tile : true;
            }
        }

        return false;
    }

    private spawnTile(originTile: Tile, depth: number = 0) {
        this.tiles.push(originTile);

        if (depth > 200) {
            return;
        }

        originTile.getAllNeighbors().forEach((pos) => {
            const rand = Math.random() * 100;
            // console.log(rand)
            if (
                rand - depth/2 > 50 &&
                this.tiles.findIndex((t) => t.pos.equals(pos)) == -1
            ) {
                this.spawnTile(new WaterTile(pos), depth + 1);
            }
        });
    }
}
