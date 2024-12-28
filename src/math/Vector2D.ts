import Vector3D from "./Vector3D";

export default class Vector2D {
    private _x: number;
    private _y: number;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    public static fromVector3D(vector: Vector3D): Vector2D {
        return new Vector2D(vector.x, vector.y);
    }

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }
}