import {Renderer} from "./Renderer";

export interface WorldObject {
    tick(t: number): void;

    begin(): void;
}

export class World {
    public static readonly instance: World = new World();
    public static readonly renderer: Renderer = new Renderer();

    private static tickingObjects:WorldObject[] = [];

    private timeElapsed:number = 0;

    private constructor() {
        //todo: get the canvas
    }

    public attachToTick(obj: WorldObject): void {
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
            for (const obj of World.tickingObjects) {
                obj.tick(this.timeElapsed);
            }
        }, 1000);
    }
}