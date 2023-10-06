# cyos

Story!
Plot!

Hero Knight has to walk through castle to rescue princess from the Dragon (the dragon is the end boss)!

The knight has two weapons (sword, shield).

To defeat the enemies, you have to solve math problems.

3 correct answers for the trolls. 1 correct answer for the bats.

When user has input an answer show image on screen.

Example:
// Prompt the user for their answer
let userAnswer = prompt("What is 2 + 2?");
let userNumber = parseInt(userAnswer);

// Define the correct answer
const correctAnswer = 4;

// Check if the user's answer is correct
if (userNumber === correctAnswer) {
console.log("Enemy killed!");
} else if(userNumber !== correctAnswer) {
console.log("Wrong answer. The enemy lives. The troll slashes his sword again!");
}
