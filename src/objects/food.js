export default class Food {

    constructor (position, size = 1) {
        this._position = position || { x: 0, y: 0 };
        this._size = size;
    }

    getPosition() {
        return {
            x: this._position.x,
            y: this._position.y
        };
    }

    getSize() {
        return this._size;
    }
}