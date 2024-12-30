﻿import Hex from "./Hex";

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

    public toHex(size:number):Hex{
        let q = (Math.sqrt(3)/3 * this._x - 1./3 * this._y - 1./3) / size;
        let r = (2./3 * this._y) / size;
        let s = -q-r;

        return new Hex(q, r, s);
    }
}