import {Tile} from "./world/Tile";
import WaterTile from "./world/WaterTile";

export interface Object {
    tick(t: number): void;

    begin(): void;
}

export class World {
    public static readonly instance: World = new World();
    public static readonly context: CanvasRenderingContext2D = (<HTMLCanvasElement>document.getElementById('game-canvas'))!.getContext("2d")!
    private static readonly canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('game-canvas');

    private static tickingObjects:Object[] = [];

    private timeElapsed:number = 0;
    private isRunning = false;

    private constructor() {
    }

    public attachToTick(obj: Object): void {
        if (World.tickingObjects.includes(obj)) return;

        World.tickingObjects.push(obj);
    }

    private startWorld(): void {
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

    public begin(): void {
        if (this.isRunning) return;

        new WaterTile();
    }
}