const textElement = document.getElementById("text");
const optionButtonsElement = document.getElementById("option-buttons");

let correctAnswers = 0;
let incorrectAnswers = 0;

if (localStorage.getItem("correctAnswers")) {
  correctAnswers = parseInt(localStorage.getItem("correctAnswers"));
}
if (localStorage.getItem("incorrectAnswers")) {
  incorrectAnswers = parseInt(localStorage.getItem("incorrectAnswers"));
}

function startGame() {
  correctAnswers = 0;
  incorrectAnswers = 0;
  resultsArray.length = 0;
  showTextNode(1);
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);
  textElement.innerText = textNode.text;
  document.getElementById("image").src = textNode.img;
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }

  textNode.options.forEach((option) => {
    const button = document.createElement("button");
    button.innerText = option.text;
    button.classList.add("btn");
    button.addEventListener("click", () => selectOption(option));
    optionButtonsElement.appendChild(button);
  });
}

const resultsArray = [];

function selectOption(option) {
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId <= 0) {
    startGame(); // Reset scores at the start of the game
    return;
  }
  showTextNode(nextTextNodeId);

  const correctIds = [8, 13, 16, 28, 20, 22, 24, 27];
  const incorrectIds = [9, 12, 15, 19, 26, 29];

  if (correctIds.includes(nextTextNodeId)) {
    correctAnswers++;
  } else if (incorrectIds.includes(nextTextNodeId)) {
    incorrectAnswers++;
  }

  // Push the updated values into the resultsArray
  resultsArray.push({ correctAnswers, incorrectAnswers });

  localStorage.setItem("correctAnswers", correctAnswers);
  localStorage.setItem("incorrectAnswers", incorrectAnswers);
}

let highScores = [];
if (localStorage.getItem("highScores")) {
  highScores = JSON.parse(localStorage.getItem("highScores"));
}

function updateHighScores() {
  const playerName = playerUsername; /* prompt("Enter your name:") */
  if (playerName) {
    const playerScore = { name: playerName, correctAnswers };

    highScores.push({ name: playerName, correctAnswers, incorrectAnswers });
    highScores.sort((a, b) => b.correctAnswers - a.correctAnswers);
    const maxHighScores = 10;
    highScores.splice(maxHighScores);

    localStorage.setItem("highScores", JSON.stringify(highScores));

    // Redirect to the leaderboard page and pass the results and player's name as query parameters
    displayHighScores();
    window.location.href = `leaderboard.html`;
  }
}

function displayHighScores() {
  const highScoresElement = document.createElement("ul");
  highScoresElement.classList.add("high-scores");

  highScores.forEach((score, index) => {
    const scoreItem = document.createElement("li");
    scoreItem.textContent = `${index + 1}. ${score.name}: ${
      score.correctAnswers
    } correct answers`;
    highScoresElement.appendChild(scoreItem);
  });

  // Add or update the high scores element in your HTML
  const existingHighScoresElement = document.querySelector(".high-scores");
  if (existingHighScoresElement) {
    document.body.replaceChild(highScoresElement, existingHighScoresElement);
  } else {
    document.body.appendChild(highScoresElement);
  }
}

let playerUsername = localStorage.getItem("username");

const textNodes = [
  {
    id: 1,
    text: `Welcome ${playerUsername}! There is a key in front of you, what would you like to do?`,
    img: (src = "./images/key1.png"),
    options: [
      {
        text: "Pick up the key",
        nextText: 2,
      },
      {
        text: "Ignore the key",
        nextText: 3,
      },
    ],
  },
  {
    id: 2,
    text: "You open the door. You are now standing in a hallway.",
    img: (src = "./images/hallway1.png"),
    options: [
      {
        text: "Move right",
        nextText: 4,
      },
      {
        text: "Walk up stairs",
        nextText: 5,
      },
      {
        text: "Move left",
        nextText: 6,
      },
    ],
  },
  {
    id: 3,
    text: `You needed that key ${playerUsername}! Journey over.`,
    img: (src = "./images/journeyover1.png"),
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 4,
    text: "You come to another door. The door is open, so you step through, but fall into a bottomless pit! Oh how the mighty have fallen!",
    img: (src = "./images/bottomlesspit1.png"),
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 5,
    text: "A bat attacks! Answer this question to block this attack and counter!",
    img: (src = "./images/knightbats1.png"),
    options: [
      {
        text: "Question",
        nextText: 7,
      },
    ],
  },
  {
    id: 6,
    text: "You come to another door. The door is open, but you are attacked by a troll! Answer these questions to block the attacks and counter!",
    img: (src = "./images/troll1.png"),
    options: [
      {
        text: "Questions",
        nextText: 11,
      },
    ],
  },
  {
    id: 7,
    text: "Bat maths question: 8 x 7 = ",
    img: (src = "./images/roman_abacus_2.gif"),
    options: [
      {
        text: "Answer 56",
        nextText: 8,
      },
      {
        text: "Answer 60",
        nextText: 9,
      },
      {
        text: "Answer 52",
        nextText: 9,
      },
    ],
  },
  {
    id: 8,
    text: "Correct! You evade the bat as it loops down, and catch it with a fatal glancing blow!",
    img: (src = "./images/batattack1.png"),
    options: [
      {
        text: "Proceed down hallway",
        nextText: 10,
      },
    ],
  },
  {
    id: 9,
    text: `Wrong! The bat is lightning quick, and swoops in before you have time to draw your shield! A ghastly end for ${playerUsername}!`,
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 11,
    text: "Troll maths question one: 4 x 4 =",
    img: (src = "./images/roman_abacus_2.gif"),
    options: [
      {
        text: "Answer 8",
        nextText: 12,
      },
      {
        text: "Answer 16",
        nextText: 13,
      },
    ],
  },
  {
    id: 12,
    text: "Incorrect! Fatality! The last things you see are two humongous troll fist raining down on you.",
    img: (src = "./images/trolldefeat.png"),
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 13,
    text: "Correct! You dodge the first blow, and slice across the troll's heel! It still has some fight left however!",
    img: (src = "./images/troll2.png"),
    options: [
      {
        text: "More questions to survive",
        nextText: 14,
      },
    ],
  },
  {
    id: 14,
    text: "Troll maths questions two: 27 x 6 =",
    img: (src = "./images/roman_abacus_2.gif"),
    options: [
      {
        text: "Answer 68",
        nextText: 15,
      },
      {
        text: "Answer 72",
        nextText: 15,
      },
      {
        text: "Answer 162",
        nextText: 16,
      },
    ],
  },
  {
    id: 15,
    text: "Incorrect! The troll tricked you into believing it was more injured that it was, and surprises you with a swift, and fatal, attack.",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 16,
    text: "Correct! The troll attempted one final attack with the last of its energy, however you deflect this with your shield and it is left at your mercy. You show no mercy.",
    img: (src = "./images/trollslay.png"),
    options: [
      {
        text: "Proceed down hallway",
        nextText: 10,
      },
    ],
  },
  {
    id: 10,
    text: "Victorious, but tired, you proceed down the hallway. You come to another door, the lock has been burnt off. You enter a dark, cavernous chamber, to be confronted by the dragon! Only your logic can help you in battle . . . ",
    img: (src = "./images/dragonconfront.png"),
    options: [
      {
        text: "Questions",
        nextText: 17,
      },
    ],
  },
  {
    id: 17,
    text: "Dragon maths question one: 64 x 9 =",
    img: (src = "./images/roman_abacus_2.gif"),
    options: [
      {
        text: "Answer 576",
        nextText: 28,
      },
      {
        text: "Answer 224",
        nextText: 29,
      },
      {
        text: "Answer 336",
        nextText: 29,
      },
      {
        text: "Answer 102",
        nextText: 29,
      },
    ],
  },
  {
    id: 28,
    text: "Correct! The dragon underestimated the might of your shield! It withstood the first barage of flames, and in the dragons puzzlement you were able to strike the first blow! The first of many that will be needed it seems . . . ",
    img: (src = "./images/dragonfight1.png"),
    options: [
      {
        text: "More questions to survive",
        nextText: 18,
      },
    ],
  },
  {
    id: 29,
    text: `Incorrect! The dragon swallows you up whole! It was expecting more of a fight from you ${playerUsername}!`,
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 18,
    text: "Dragon maths question two: 87 x 7 =",
    img: (src = "./images/roman_abacus_2.gif"),
    options: [
      {
        text: "Answer 666",
        nextText: 19,
      },
      {
        text: "Answer 520",
        nextText: 19,
      },
      {
        text: "Answer 567",
        nextText: 19,
      },
      {
        text: "Answer 609",
        nextText: 20,
      },
    ],
  },
  {
    id: 19,
    text: `Incorrect! Disaster! You were too slow to act this time, the dragon connecting with a mighty blow of its tail, spelling the end for ${playerUsername}`,
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 20,
    text: `Correct! A second victorious blow from our hero ${playerUsername}! While the dragon is still somewhat dazed, you were able to get close enough to attack again. You hear the cheer of the princess, ensconced high above the battle on a balcony.`,
    img: (src = "./images/dragonblow2.png"),
    options: [
      {
        text: "More questions to survive",
        nextText: 21,
      },
    ],
  },
  {
    id: 21,
    text: "Dragon maths question three: 112 x 3 =",
    img: (src = "./images/roman_abacus_2.gif"),
    options: [
      {
        text: "Answer 709",
        nextText: 16,
      },
      {
        text: "Answer 610",
        nextText: 16,
      },
      {
        text: "Answer 336",
        nextText: 22,
      },
      {
        text: "Answer 740",
        nextText: 16,
      },
    ],
  },
  {
    id: 22,
    text: "Correct! The dragon came steaming in, but with a lack of concentration, you were able to roll underneath and strike out at the dragons soft underbelly! A terrific hit, but the dragon is not done yet . . . ",
    img: (src = "./images/dragonblow3.png"),
    options: [
      {
        text: "More questions to survive",
        nextText: 23,
      },
    ],
  },
  {
    id: 23,
    text: "Dragon maths question four: 15 x 71 - 34 =",
    img: (src = "./images/roman_abacus_2.gif"),
    options: [
      {
        text: "Answer 1031",
        nextText: 24,
      },
      {
        text: "Answer 439",
        nextText: 19,
      },
      {
        text: "Answer 2399",
        nextText: 19,
      },
      {
        text: "Answer 878",
        nextText: 19,
      },
    ],
  },
  {
    id: 24,
    text: "Correct! The dragon, lashing out wildly, appeared to set the entire chamber ablaze! But you had managed to create a refuge using your shield and an old statue. Out of the smoke, you launch a surprise attack to the back of the dragons head! It is in real pain now, but has a little fight left still . . . ",
    img: (src = "./images/dragonblow4.png"),
    options: [
      {
        text: "One more question to win",
        nextText: 25,
      },
    ],
  },
  {
    id: 25,
    text: "Dragon maths question five: 12 x 39 ÷ 8 + 35.5 =",
    img: (src = "./images/confusedmath.jpg"),
    options: [
      {
        text: "Answer 409",
        nextText: 26,
      },
      {
        text: "Answer 940.5",
        nextText: 26,
      },
      {
        text: "Answer 49.5",
        nextText: 26,
      },
      {
        text: "Answer 94",
        nextText: 27,
      },
    ],
  },
  {
    id: 26,
    text: `Incorrect! Disaster! The dragon appeared to be falling, but it was a ruse! Before it hit the floor, and with your guard down, it shot a concentrated beam of hot blue flame directly at you. The last thing you see is the look of despair in the princesses face as she calls out your name "${playerUsername}!" in anguish.`,
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 27,
    text: "Correct! Victory! The dragon rose to the sky and divebombed down, a desperate act. It was not expecting you to leap into the air to meet it however, and before it can react, your mighty blade has severed its head! A gruesome end. The princess is overjoyed with relief, and runs down the curved stairwell to meet you.",
    img: (src = "./images/knightandprincess.png"),
    options: [
      {
        text: `You win, ${playerUsername}! Restart`,
        nextText: 1,
      },
    ],
  },
];

startGame();

//
localStorage.removeItem("correctAnswers");
localStorage.removeItem("incorrectAnswers");

// Get references to the audio element, the toggle button, and the volume control
const audio = document.getElementById("audio-player");
const toggleButton = document.getElementById("toggle-audio");
const volumeControl = document.getElementById("volume-control");

// Initialize audio playing state to off
let isAudioPlaying = false;

// Function to toggle audio playback
function toggleAudio() {
  if (isAudioPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
  isAudioPlaying = !isAudioPlaying;
  updateToggleButtonLabel();
}

// Function to update the button label based on the audio state
function updateToggleButtonLabel() {
  toggleButton.textContent = isAudioPlaying ? "Pause Audio" : "Play Audio";
}

// Add a click event listener to the toggle button
toggleButton.addEventListener("click", toggleAudio);

// Add an input event listener to the volume control
volumeControl.addEventListener("input", function () {
  audio.volume = volumeControl.value;
});
