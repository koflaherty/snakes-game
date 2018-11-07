import {DEAD_SNAKE_COLOR, FOOD_COLOR, SNAKE_COLOR} from "../constants/colors";
import {GAME_SPEED, FOOD_SIZE, SNAKE_GROWTH_FROM_EATING, SNAKE_STARTING_SIZE } from "../constants/game";
import Snake from "../objects/snake";
import Food from "../objects/food";
import { testCollision } from "./collision";
import { addOnDirectionPress, removeOnDirectionPress } from './controls';

export default class Game {
    constructor(world, onGameStart = () => {}, onGameEnd = () => {}) {
        this._gameInProgress = false;
        this._controlsCallbackID = null;
        this._gameLoopIntervalID = null;
        this._onGameStart = onGameStart;
        this._onGameEnd = onGameEnd;
        this._snake = null;
        this._food = null;
        this.world = world;
    }

    startGame(snakeStartingDirection = { x: 0, y: 1 }) {
        if (!this.isGameInProgress()) {
            const worldBounds = this.world.getWorldSize();

            // spawn snake in the center of the screen
            this._snake = new Snake({
                x: Math.floor(worldBounds[0] / 2),
                y: Math.floor(worldBounds[1] / 2),
            }, snakeStartingDirection, SNAKE_STARTING_SIZE);

            // set up controls
            this._controlsCallbackID = addOnDirectionPress((direction) => {
                if (direction) {
                    if (this._snake) {
                        this._snake.setSnakeHeadDirection(direction);
                    }
                }
            });

            // create game loop
            this._gameLoopIntervalID = setInterval(() => this._gameLoop(), GAME_SPEED);

            this._gameInProgress = true;
            this._onGameStart();
        }
    }

    endGame() {
        if (this.isGameInProgress()) {
            // kill the snake
            this._renderSnake();

            // stop game loop
            clearInterval(this._gameLoopIntervalID);

            // stop listening to user input
            removeOnDirectionPress(this._controlsCallbackID);

            this._gameInProgress = false;
            this._onGameEnd();
        }
    }

    isGameInProgress() {
        return this._gameInProgress;
    }

    _gameLoop() {
        // Handle Game Logic
        this._foodLogic();
        this._snakeLogic();

        // Render
        this.world.clearScreen();
        this._renderFood();
        this._renderSnake();

        // End game if snake is dead
        if (!this._snake.isAlive()) {
            this.endGame();
        }
    }

    _foodLogic() {
        // There should always be food to eat
        if (!this._food) {
            this._spawnFood(FOOD_SIZE);
        }
    }

    _snakeLogic() {
        if (this._snake) {
            // Move snake
            this._snake.slither();

            // Check for collision with food
            if (this._food
                && testCollision(
                    this._snake.getHead(),
                    { ...this._food.getPosition(), width: FOOD_SIZE, height: FOOD_SIZE }
                )
            ) {
                this._snake.grow(SNAKE_GROWTH_FROM_EATING);
                this._food = null; // remove food
            }

            // Check for collision with snake body
            this._snake.getAllBodyParts().forEach((part, index) => {
                // Skip snake head
                if (index === 0) {
                    return;
                }

                if (testCollision(this._snake.getHead(), part)) {
                    this._snake.killSnake();
                }
            });

            // Check for collision with world boundaries
            if (this._isOutOfBounds(this._snake.getHead())) {
                this._snake.killSnake();
            }
        }
    }

    _renderFood() {
        if (this._food) {
            this.world.drawSquare(
                this._food.getPosition().x,
                this._food.getPosition().y,
                FOOD_COLOR,
                this._food.getSize(),
            );
        }
    }

    _renderSnake() {
        if (this._snake) {
            this._snake.getAllBodyParts().forEach((part) => {
                this.world.drawSquare(
                    part.x,
                    part.y,
                    this._snake.isAlive() ? SNAKE_COLOR : DEAD_SNAKE_COLOR
                );
            });
        }
    }

    _spawnFood(foodSize = 1) {
        const worldBound = this.world.getWorldSize();
        const additionFoodLength = foodSize - 1; // prevents from rendering off screen

        this._food = new Food({
            x: Math.floor( Math.random() * ( worldBound[0] - additionFoodLength ) ),
            y: Math.floor( Math.random() * ( worldBound[1] - additionFoodLength ) ),
        }, foodSize);
    }

    _isOutOfBounds(position) {
        const worldBounds = this.world.getWorldSize();

        return position.x < 0 || position.x > worldBounds[0]
            || position.y < 0 || position.y > worldBounds[1];
    }

}