import Point from "./Point";
import {SpriteOffset} from "../Sprite";

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

    constructor(q: number, r: number, s: number) {
        this._q = q;
        this._r = r;
        this._s = s;
    }

    public toPoint(size: number, offset: SpriteOffset): Point {
        const x = (size - offset.x) * (Math.sqrt(3) * this._q + Math.sqrt(3) / 2 * this._r);
        const y = (size - offset.y) * (3. / 2 * this._r);

        return new Point(x, y);
    }

    public equals(other: Hex): boolean {
        return (other._q == this._q &&
            other._s == this._s &&
            other._r == this._r)
    }

    public static round(hex: Hex): Hex {
        let q = Math.round(hex.q);
        let r = Math.round(hex.r);
        let s = Math.round(hex.s);

        let q_diff = Math.abs(q - hex.q);
        let r_diff = Math.abs(r - hex.r);
        let s_diff = Math.abs(s - hex.s);

        if (q_diff > r_diff && q_diff > s_diff) {
            q = -r - s;
        } else if (r_diff > s_diff) {
            r = -q - s;
        } else {
            s = -q - r;
        }

        return new Hex(q, r, s);
    }
}