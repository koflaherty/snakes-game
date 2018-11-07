import uniqueID from 'lodash/uniqueId';

const callbacks = {};
const handleDirectionInput = (e) => {
    let direction;
    if (e.key === 'ArrowLeft') {
        direction = { x: -1, y: 0 };
    }
    else if (e.key === 'ArrowDown') {
        direction = { x: 0, y: 1 };
    }
    else if (e.key === 'ArrowRight') {
        direction = { x: 1, y: 0 };
    }
    else if (e.key === 'ArrowUp') {
        direction = { x: 0, y: -1 };
    }

    if (direction) {
        Object.keys(callbacks).forEach((callbackID) => {
            callbacks[callbackID](direction);
        });
    }

    e.preventDefault();
};

function bindCallbackToControls(callback = () => {}) {
    const uniqueKey = uniqueID();

    callbacks[uniqueKey] = callback;

    // Start listening for input if this is the only callback
    if (Object.keys(callbacks).length === 1) {
        document.addEventListener('keydown', handleDirectionInput);
    }

    return uniqueKey;
}

function removeOnDirectionPress(callbackID) {
    delete callbacks[callbackID];

    // Stop listening for input there are no more callbacks
    if (Object.keys(callbacks).length === 0) {
        document.removeEventListener('keydown', handleDirectionInput);
    }
}

function addOnDirectionPress(callback) {
    return bindCallbackToControls(callback);
}

export { addOnDirectionPress, removeOnDirectionPress };
