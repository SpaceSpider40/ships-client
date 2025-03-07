import {Object, World} from "../World";
import Hex from "../math/Hex";
import {Sprite} from "../Sprite";

export default class Tile implements Object {
    protected set pos(value: Hex) {
        this._pos = value;
    }

    private _pos: Hex;
    private readonly _size: number = 0;
    private readonly _sprite: Sprite;

    get pos(): Hex {
        return this._pos;
    }

    get size(): number {
        return this._size;
    }

    get sprite(): Sprite {
        return this._sprite;
    }

    public constructor(position: Hex, size: number, sprite: Sprite) {
        this._pos = position;
        this._size = size;
        this._sprite = sprite;

        World.instance.attachToTick(this);
    }

    public getAllNeighbors(): Hex[] {
        return [
            new Hex(
                this.pos.q + 1,
                this.pos.r,
                this.pos.s - 1
            ),
            new Hex(
                this.pos.q + 1,
                this.pos.r - 1,
                this.pos.s
            ),
            new Hex(
                this.pos.q,
                this.pos.r - 1,
                this.pos.s + 1
            ),
            new Hex(
                this.pos.q - 1,
                this.pos.r,
                this.pos.s + 1
            ),
            new Hex(
                this.pos.q - 1,
                this.pos.r + 1,
                this.pos.s
            ),
            new Hex(
                this.pos.q,
                this.pos.r + 1,
                this.pos.s - 1
            )
        ]
    }

    public tick(t: number): void {}
    public begin(): void {}
}