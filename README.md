# Snakes
## To Build
Run `npm install` and `npm run start`

## Architecture Improvements
I made an assumption that snapping game objects to some sort of grid was going to make the game easier to play and
program. Initially I took that assumption further and created the game where all objects took up one square. After play
testing the game I quickly realized that food was too small to consistently hit and I decided to make it bigger.

If I were to build the game again or wanted to spend more time refactoring I would have made a generic game object with
position, size, and a method to get a bounding box and extend actual game objects from it. This would improve collision,
rendering, and spawning code.

## UX Improvements
1) The snake looks like it pauses when it grows which doesn't feel like a rewarding experience. Maybe changing the color
of non moving body parts or adding a divider would help.
2) I think it'd be fun if the snake speed increased overtime or as the snake consumes food.
