// Collision boxes can be defined as { x, y } or { x, y, width, height }
export function testCollision(boxA, boxB) {
    const testBoxA = {
        width: 1,
        height: 1,
        ...boxA
    };

    const testBoxB = {
        width: 1,
        height: 1,
        ...boxB
    };

    return testBoxA.x < testBoxB.x + ( testBoxB.width || 1 ) &&
        testBoxA.x + testBoxA.width > testBoxB.x &&
        testBoxA.y < testBoxB.y + testBoxB.height &&
        testBoxA.y + testBoxA.height > testBoxB.y;
}