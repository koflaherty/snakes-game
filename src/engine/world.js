import { BACKGROUND_COLOR } from "../constants/colors";

const UNIT_SIZE = 10; // in pixels

export default class World {

    constructor(canvasCtx, worldWidthPixels, worldHeightPixels) {
        this.context = canvasCtx;
        this.windowSize = [worldWidthPixels, worldHeightPixels];
        console.log(this.getWorldSize());
    }

    clearScreen(completelyClear = false) {
        this.context.globalAlpha = completelyClear ? 1 : 0.8; // not clearing the screen fully adds a trailing effect
        this.context.fillStyle = BACKGROUND_COLOR;
        this.context.fillRect(0, 0, this.windowSize[0], this.windowSize[1]);
    }

    drawSquare(x, y, color, size = 1) {
        const squareSize = UNIT_SIZE * size;
        this.context.globalAlpha = 1;
        this.context.fillStyle = color;
        this.context.fillRect(x * UNIT_SIZE, y * UNIT_SIZE, squareSize, squareSize);
    }

    getWorldSize() {
        return [
            Math.floor(this.windowSize[0] / UNIT_SIZE) - 1,
            Math.floor(this.windowSize[1] / UNIT_SIZE) - 1,
        ];
    }
}