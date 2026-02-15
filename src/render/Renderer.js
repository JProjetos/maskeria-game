export class Renderer {
    constructor(canvas) {
        if (!(canvas instanceof HTMLCanvasElement))
            throw new TypeError("canvas precisa ser um HTMLCanvasElement");

        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.width = canvas.width;
        this.height = canvas.height;
    }

    drawBGContain(image) {
        this.ctx.drawImage(image, 0, 0, this.width, this.height);
    }

    drawBGCover(image) {
        const canvasRatio = this.width / this.height;
        const imageRatio = image.width / image.height;

        let sx = 0;
        let sy = 0;
        let sWidth = image.width;
        let sHeight = image.height;

        if (imageRatio > canvasRatio) {
            sWidth = image.height * canvasRatio;
            sx = (image.width - sWidth) / 2;
        } else {
            sHeight = image.width / canvasRatio;
            sy = (image.height - sHeight) / 2;
        }

        this.ctx.drawImage(
            image,
            sx, sy, sWidth, sHeight,
            0, 0, this.width, this.height
        );
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = width;
        this.height = height;
    }
}
