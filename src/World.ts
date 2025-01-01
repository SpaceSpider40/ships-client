import WaterTile from "./world/WaterTile";
import Renderer from "./Renderer";
import Hex from "./math/Hex";

export interface Object {
    tick(t: number): void;

    begin(): void;
}

export class World {
    public static readonly instance: World = new World();
    private static readonly context: CanvasRenderingContext2D = (<HTMLCanvasElement>document.getElementById('game-canvas'))!.getContext("2d")!
    private static readonly canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('game-canvas');

    public readonly renderer: Renderer = new Renderer(<HTMLCanvasElement>document.getElementById('game-canvas'));

    private static tickingObjects: Object[] = [];

    private timeElapsed: number = 0;
    private isRunning: boolean = false;

    private constructor() {
    }

    public attachToTick(obj: Object): void {
        if (World.tickingObjects.includes(obj)) return;

        World.tickingObjects.push(obj);
    }

    private createMap() {
        new WaterTile(new Hex(0, 0, 0));
        new WaterTile(new Hex(1, -1, 0));
        new WaterTile(new Hex(1, -2, 0));
        new WaterTile(new Hex(2, -2, 0));
        new WaterTile(new Hex(0, -1, 1));
        new WaterTile(new Hex(0, -2, 1));
    }

    public start(): void {
        if (this.isRunning) return;

        console.log(`[WORLD] Starting world`);
        World.canvas.oncontextmenu = this.onRightClick;

        console.log(`[WORLD] Attaching to events`)

        this.isRunning = true;

        console.log(`[WORLD] creating map`);
        this.createMap();
        console.log(`[WORLD] Attached objects: ${World.tickingObjects.toString()}`);


        //Call begin
        for (const obj of World.tickingObjects) {
            obj.begin();
        }

        setInterval(() => {
            //Begin ticking
            this.timeElapsed++;

            for (const obj of World.tickingObjects) {
                obj.tick(this.timeElapsed);
            }

            //render visuals
            this.renderer.makePass(this.timeElapsed);

        }, 16.6);
    }

    private onRightClick(evt: MouseEvent): void {
        evt.preventDefault();

    }
}