import {World, WorldObject} from "../World";
import {Vector} from "../math/Vector";

export class Tile implements WorldObject {
    protected pos: Vector;

    public constructor(position: Vector) {
        this.pos = position;

        World.instance.attachToTick(this);
    }

    begin(): void {
        console.log("tile begin");
    }

    tick(t: number): void {
        console.log("Tick: number:", t);

    }
}