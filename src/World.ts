import {Tile} from "./world/Tile";
import WaterTile from "./world/WaterTile";
import Vector3D from "./math/Vector3D";
import Vector2D from "./math/Vector2D";
import Renderer from "./Renderer";

export interface Object {
    tick(t: number): void;

    begin(): void;
}

export class World {
    public static readonly instance: World = new World();
    private static readonly context: CanvasRenderingContext2D = (<HTMLCanvasElement>document.getElementById('game-canvas'))!.getContext("2d")!
    private static readonly canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('game-canvas');

    public readonly renderer: Renderer = new Renderer(<HTMLCanvasElement>document.getElementById('game-canvas'));

    private static tickingObjects:Object[] = [];

    private timeElapsed:number = 0;
    private isRunning = false;

    private constructor() {
    }

    public attachToTick(obj: Object): void {
        if (World.tickingObjects.includes(obj)) return;

        World.tickingObjects.push(obj);
    }

    private createMap() {
        new WaterTile();
    }

    public start(): void {
        if (this.isRunning) return;

        console.log(`[WORLD] Starting world`);

        this.isRunning = true;

        console.log(`[WORLD] creating map`);
        this.createMap();
        console.log(`[WORLD] Attached objects: ${World.tickingObjects.toString()}`);


        //Call begin
        for (const obj of World.tickingObjects) {
            obj.begin();
        }

        //Begin ticking
        this.timeElapsed++;
        setInterval(() => {
            //before every loop clear canvas
            World.context.clearRect(0, 0, World.canvas.width, World.canvas.height);

            for (const obj of World.tickingObjects) {
                obj.tick(this.timeElapsed);
            }
        }, 1000);
    }
}