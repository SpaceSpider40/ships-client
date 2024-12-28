import {Object, World} from "../World";
import Vector3D from "../math/Vector3D";

export class Tile implements Object {
    protected pos: Vector3D;

    public constructor(position: Vector3D) {
        this.pos = position;

        World.instance.attachToTick(this);
    }

    public tick(t: number): void {

    }

    public begin(): void {

    }
}