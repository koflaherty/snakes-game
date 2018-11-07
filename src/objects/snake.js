import isEqual from "lodash/isEqual";

export default class Snake {

    constructor(position, direction, snakeSize = 1) {
        this._alive = true;
        this._bodyParts = [{ position, direction }];
        this.grow(snakeSize - 1);
    }

    grow(amount = 1) {
        const tail = this._bodyParts[this._bodyParts.length - 1];

        for (let i = 0; i < amount; i++) {
            // clone tail
            this._bodyParts.push({
                position: { ...tail.position },
                direction: { ...tail.direction },
            });
        }
    }

    slither() {
        for (let i = this._bodyParts.length - 1; i >= 0; i--) {
            const currentPart = this._bodyParts[i];
            const nextPart = i > 0 ? this._bodyParts[i - 1] : null;

            if (!nextPart || !isEqual(currentPart.position, nextPart.position)) {
                currentPart.position.x += currentPart.direction.x;
                currentPart.position.y += currentPart.direction.y;
            }

            if (nextPart) {
                currentPart.direction = { ...nextPart.direction };
            }
        }
    }

    killSnake() {
        this._alive = false;
    }

    setSnakeHeadDirection(direction) {
        this._bodyParts[0].direction = direction;
    }

    getAllBodyParts() {
        return this._bodyParts.map((part) => part.position);
    }

    getHead() {
        return this._bodyParts[0].position;
    }

    isAlive() {
        return this._alive;
    }


}

