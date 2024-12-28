export default class Vector3D {
    private _x: number;
    private _y: number;
    private _z: number;

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    get z(): number {
        return this._z;
    }

    constructor(x: number, y: number, z: number) {
        this._x = x;
        this._y = y;
        this._z = z;
    }

    addScalar(s: number): void {
        this._x += s;
        this._y += s;
        this._z += s;
    }

    addVector(vector: Vector3D): void {
        this._x += vector.x;
        this._y += vector.y;
        this._z += vector.z;
    }

    add(x: number, y: number, z: number): void {
        this._x += x;
        this._y += y;
        this._z += z;
    }

    subtractScalar(s: number): void {
        this._x -= s;
        this._y -= s;
        this._z -= s;
    }

    subtractVector(vector: Vector3D): void {
        this._x -= vector.x;
        this._y -= vector.y;
        this._z -= vector.z;
    }

    subtract(x:number, y:number, z:number): void {
        this._x -= x;
        this._y -= y;
        this._z -= z;
    }
}