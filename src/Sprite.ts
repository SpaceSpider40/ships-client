export class Sprite {
    private static readonly PATH: string = "./img/sprites/";
    private images: HTMLImageElement[] = [];

    private currentOffset = 0;

    constructor(paths: string[]) {
        for (let path of paths) {
            if (path.startsWith("/")){
                path.substring(1, path.length);
            }

            const image = new Image();
            image.src = path;

            this.images.push(image);
        }
    }

    public getImage(): HTMLImageElement {
        this.currentOffset++;

        if(this.currentOffset >= this.images.length) {
            this.currentOffset = 0;
        }

        return this.images[this.currentOffset];
    }
}