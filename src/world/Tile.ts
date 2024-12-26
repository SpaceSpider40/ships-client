import {Object, World} from "../World";
import {Vector} from "../math/Vector";

export class Tile implements Object {
    protected pos: Vector;

    public constructor(position: Vector) {
        this.pos = position;

        World.instance.attachToTick(this);
    }

    public tick(t: number): void {

    }

    public begin(): void {

    }
}