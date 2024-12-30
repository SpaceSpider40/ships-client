import Hex from "./Hex";
import {SpriteOffset} from "../Sprite";

export default class Point {
    private _x: number;
    private _y: number;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    public toHex(size:number, offset:SpriteOffset):Hex{
        let q = (Math.sqrt(3)/3 * this._x - 1./3 * this._y - 1./3) / (size + offset.x);
        let r = (2./3 * this._y) / (size + offset.y);
        let s = -q-r;

        return new Hex(q, r, s);
    }
}