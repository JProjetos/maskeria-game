export class Renderer {
    constructor(canvas) {
        if(!(canvas instanceof HTMLCanvasElement))
            throw new TypeError("canvas precisa ser um HTMLCanvasElement");

        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.width = canvas.width;
        this.height = canvas.height;
    }

    drawBackground(image) {
        this.ctx.drawImage(image, 0, 0, this.width, this.height);
    }

    clean() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = width;
        this.height = height;
    }
}
