import Game from './engine/game';
import World from './engine/world';
import { addOnDirectionPress } from './engine/controls';
import './style.css';

function main() {
    const canvas = document.getElementById("game");
    const instructionOverlay = document.getElementById("instruction-overlay");
    const onGameStart = () => instructionOverlay.style.display = 'none';
    const onGameEnd = () => instructionOverlay.style.display = 'flex';

    // Canvas needs a specified height and width to render properly
    canvas.setAttribute('width', canvas.clientWidth);
    canvas.setAttribute('height', canvas.clientHeight);

    // Create game and world
    const world = new World(canvas.getContext("2d"), canvas.clientWidth, canvas.clientHeight);
    const game = new Game(world, onGameStart, onGameEnd);

    // Start a new game when if user interacts with it
    addOnDirectionPress((direction) => {
        if (!game.isGameInProgress()) {
            game.startGame(direction);
        }
    });
}

main();