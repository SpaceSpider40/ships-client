export type SpriteOffset = {
    x: number;
    y: number;
}

export class Sprite {
    get offset(): SpriteOffset {
        return this._offset;
    }

    private static readonly PATH: string = "./img/sprites/";
    private images: HTMLImageElement[] = [];

    private _offset: SpriteOffset;

    private imageIndex = 0;

    constructor(paths: string[], offset: SpriteOffset = {x: 0, y: 0}) {
        for (let path of paths) {
            if (path.startsWith("/")) {
                path = path.substring(1, path.length);
            }

            const image = document.createElement("img");
            image.src = Sprite.PATH + path;

            this.images.push(image);
        }
        this._offset = offset;
    }

    public getImage(): HTMLImageElement {
        this.imageIndex++;

        if (this.imageIndex >= this.images.length) {
            this.imageIndex = 0;
        }

        return this.images[this.imageIndex];
    }
}