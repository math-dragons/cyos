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
  const playerName = prompt("Enter your name:");
  if (playerName) {
    const playerScore = { name: playerName, correctAnswers };

    highScores.push({ name: playerName, correctAnswers, incorrectAnswers });
    highScores.sort((a, b) => b.correctAnswers - a.correctAnswers);
    const maxHighScores = 10;
    highScores.splice(maxHighScores);

    localStorage.setItem("highScores", JSON.stringify(highScores));

    // Redirect to the leaderboard page and pass the results and player's name as query parameters
    displayHighScores();
    window.location.href = `leaderboard.html?highScores=${encodeURIComponent(
      JSON.stringify(highScores)
    )}`;
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

const textNodes = [
  {
    id: 1,
    text: "There is a key in front of you",
    img: (src = "Sword1.png"),
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
    img: (src = "rWMmW1696607622.jpg"),
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
    text: "You needed that key! Journey over.",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 4,
    text: "You come to another door. The door is open, so you step through, but fall into a bottomless pit!",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 5,
    text: "A bat attacks! Answer this question to block these attacks and counter",
    options: [
      {
        text: "Questions",
        nextText: 7,
      },
    ],
  },
  {
    id: 6,
    text: "You come to another door. The door is open, but you are attacked by a troll! Answer this question to block these attacks and counter",
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
    options: [
      {
        text: "Answer 56?",
        nextText: 8,
      },
      {
        text: "Answer 60?",
        nextText: 9,
      },
      {
        text: "Answer 52?",
        nextText: 9,
      },
    ],
  },
  {
    id: 8,
    text: "Correct! You evade the bat as it loops down, and catch it with a fatal glancing blow!",
    options: [
      {
        text: "Proceed down hallway",
        nextText: 10,
      },
    ],
  },
  {
    id: 9,
    text: "Wrong! The bat is lightning quick, and swoops in before you have time to draw your shield!",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 11,
    text: "Troll maths question: 4 x 4 =",
    options: [
      {
        text: "Answer 8?",
        nextText: 12,
      },
      {
        text: "Answer 16?",
        nextText: 13,
      },
    ],
  },
  {
    id: 12,
    text: "Incorrect! Fatality! The last things you see are two humongous troll fist raining down on you.",
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
    options: [
      {
        text: "More questions to survive",
        nextText: 14,
      },
    ],
  },
  {
    id: 14,
    text: "Troll maths questions: 27 x 6 =",
    options: [
      {
        text: "Answer 68?",
        nextText: 15,
      },
      {
        text: "Answer 72?",
        nextText: 15,
      },
      {
        text: "Answer 78?",
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
    text: "Correct! The troll attempted one last attack with the last of its energy, however you deflect this with your shield and it is left at your mercy. You show no mercy.",
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
    options: [
      {
        text: "Questions",
        nextText: 17,
      },
    ],
  },
  {
    id: 17,
    text: "Dragon maths question: 64 x 9 =",
    options: [
      {
        text: "Answer 384?",
        nextText: 28,
      },
      {
        text: "Answer 224?",
        nextText: 29,
      },
      {
        text: "Answer 336?",
        nextText: 29,
      },
      {
        text: "Answer 102?",
        nextText: 29,
      },
    ],
  },
  {
    id: 28,
    text: "Correct! The dragon underestimated the might of your shield! It withstood the first barage of flames, and in the dragons puzzlement you were able to strike the first blow! The first of many that will be needed it seems . . . ",
    options: [
      {
        text: "More questions to survive",
        nextText: 18,
      },
    ],
  },
  {
    id: 29,
    text: "Incorrect! The dragon swallows you up whole! It was expecting more of a fight!",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 18,
    text: "Dragon maths question: 87 x 7 =",
    options: [
      {
        text: "Answer 666?",
        nextText: 19,
      },
      {
        text: "Answer 520?",
        nextText: 19,
      },
      {
        text: "Answer 567?",
        nextText: 19,
      },
      {
        text: "Answer 576?",
        nextText: 20,
      },
    ],
  },
  {
    id: 19,
    text: "Incorrect! Disaster! You were too slow to act this time, the dragon connecting with a mighty blow of its tail.",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 20,
    text: "Correct! A second victorious blow from our hero! While the dragon is still somewhat dazed, you were able to get close enough to attack again. You hear the cheer of the princess, ensconced high above the battle on a balcony.",
    options: [
      {
        text: "More questions to survive",
        nextText: 21,
      },
    ],
  },
  {
    id: 21,
    text: "Dragon maths question: 112 x 3 =",
    options: [
      {
        text: "Answer 709?",
        nextText: 16,
      },
      {
        text: "Answer 610?",
        nextText: 16,
      },
      {
        text: "Answer 609?",
        nextText: 22,
      },
      {
        text: "Answer 740?",
        nextText: 16,
      },
    ],
  },
  {
    id: 22,
    text: "Correct! The dragon came steaming in, but with a lack of concentration, you were able to roll underneath and strike out at the dragons soft underbelly! A terrific hit, but the dragon is not done yet . . . ",
    options: [
      {
        text: "More questions to survive",
        nextText: 23,
      },
    ],
  },
  {
    id: 23,
    text: "Dragon maths question: 108 x 16 =",
    options: [
      {
        text: "Answer 336?",
        nextText: 24,
      },
      {
        text: "Answer 334?",
        nextText: 19,
      },
      {
        text: "Answer 436?",
        nextText: 19,
      },
      {
        text: "Answer four 320?",
        nextText: 19,
      },
    ],
  },
  {
    id: 24,
    text: "Correct! The dragon, lashing out wildly, appeared to set the entire chamber ablaze! But you had managed to to create a refuge using your shield and an old statue. Out of the smoke, you launch a surprise attack to the back of the dragons head! It is in real pain now, but is not quite finished yet . . . ",
    options: [
      {
        text: "More questions to survive",
        nextText: 25,
      },
    ],
  },
  {
    id: 25,
    text: "Dragon maths question: 97 x 6 =",
    options: [
      {
        text: "Answer 572?",
        nextText: 26,
      },
      {
        text: "Answer 592?",
        nextText: 26,
      },
      {
        text: "Answer 410?",
        nextText: 26,
      },
      {
        text: "Answer four 582?",
        nextText: 27,
      },
    ],
  },
  {
    id: 26,
    text: "Incorrect! Disaster! The dragon appeared to be falling, but it was a ruse! Before it hit the floor, and with your guard down, it shot a concentrated beam of hot blue flame directly at you. The last thing you see is the look of despair in the princesses face. ",
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
    options: [
      {
        text: "You win. Restart",
        nextText: 1,
      },
    ],
  },
];

startGame();

//
localStorage.clear();

// Get a reference to the audio element
const audioPlayer = document.getElementById("audio-player");

// Set the volume to 10%
audioPlayer.volume = 0.1;

// The audio will automatically start playing at 50% volume due to the autoplay
