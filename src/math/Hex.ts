import Point from "./Point";

export default class Hex {
    private _q: number;
    private _r: number;
    private _s: number;

    get q(): number {
        return this._q;
    }

    get r(): number {
        return this._r;
    }

    get s(): number {
        return this._s;
    }

    constructor(q: number, r:number, s:number) {
        this._q = q;
        this._r = r;
        this._s = s;
    }

    public toPoint(size:number):Point{
        const x = size * (Math.sqrt(3) * this._q + Math.sqrt(3)/2 * this._r);
        const y = size * (3./2 * this._r);

        return new Point(x, y);
    }
}