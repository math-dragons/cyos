const textElement = document.getElementById("text");
const optionButtonsElement = document.getElementById("option-buttons");

function startGame() {
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

function selectOption(option) {
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId <= 0) {
    return startGame();
  }
  showTextNode(nextTextNodeId);
}

const textNodes = [
  {
    id: 1,
    text: "There is a key in front of you",
    img: (src = "./images/key.png"),
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
    img: (src = "./images/key.png"),
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
    text: "Bat maths question",
    options: [
      {
        text: "Answer one (correct)",
        nextText: 8,
      },
      {
        text: "Answer two (incorrect)",
        nextText: 9,
      },
      {
        text: "Answer three (incorrect)",
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
    text: "Troll maths question",
    options: [
      {
        text: "Answer one (incorrect)",
        nextText: 12,
      },
      {
        text: "Answer two (correct)",
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
    text: "Troll maths questions again",
    options: [
      {
        text: "Answer one (incorrect)",
        nextText: 15,
      },
      {
        text: "Answer two (incorrect)",
        nextText: 15,
      },
      {
        text: "Answer three (correct)",
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
    text: "Dragon maths question 1/5",
    options: [
      {
        text: "Answer one (correct)",
        nextText: 28,
      },
      {
        text: "Answer two (incorrect)",
        nextText: 29,
      },
      {
        text: "Answer three (incorrect)",
        nextText: 29,
      },
      {
        text: "Answer four (incorrect)",
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
    text: "Dragon maths question 2/5",
    options: [
      {
        text: "Answer one (incorrect)",
        nextText: 19,
      },
      {
        text: "Answer two (incorrect)",
        nextText: 19,
      },
      {
        text: "Answer three (incorrect)",
        nextText: 19,
      },
      {
        text: "Answer four (correct)",
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
    text: "Dragon maths question 3/5",
    options: [
      {
        text: "Answer one (incorrect)",
        nextText: 16,
      },
      {
        text: "Answer two (incorrect)",
        nextText: 16,
      },
      {
        text: "Answer three (correct)",
        nextText: 22,
      },
      {
        text: "Answer four (incorrect)",
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
    text: "Dragon maths question 4/5",
    options: [
      {
        text: "Answer one (correct)",
        nextText: 24,
      },
      {
        text: "Answer two (incorrect)",
        nextText: 19,
      },
      {
        text: "Answer three (incorrect)",
        nextText: 19,
      },
      {
        text: "Answer four (incorrect)",
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
    text: "Dragon maths question 5/5",
    options: [
      {
        text: "Answer one (incorrect)",
        nextText: 26,
      },
      {
        text: "Answer two (incorrect)",
        nextText: 26,
      },
      {
        text: "Answer three (incorrect)",
        nextText: 26,
      },
      {
        text: "Answer four (correct)",
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
