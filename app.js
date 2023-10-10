document.addEventListener("DOMContentLoaded", function () {
  const landingPage = document.getElementById("landing");
  const playerNameInput = document.getElementById("playerName");
  const startButton = document.getElementById("startButton");

  startButton.addEventListener("click", () => {
    const playerName = playerNameInput.value.trim();

    if (playerName !== "") {
      // Create the knight image and welcome message
      const knightImage = document.createElement("img");
      knightImage.src = "./images/knight2.png";
      knightImage.alt = "Knight";

      // Apply CSS styles to center and resize the image
      knightImage.style.display = "block"; // Make it a block element
      knightImage.style.margin = "0 auto"; // Center the image
      knightImage.style.maxWidth = "100%"; // Set maximum width
      knightImage.style.height = "auto"; // Maintain aspect ratio

      const welcomeMessage = document.createElement("p");
      welcomeMessage.textContent = `Welcome, ${playerName}! Are you ready to brave the challenges that await you?`;

      // Create a "Yes" button
      const yesButton = document.createElement("button");
      yesButton.textContent = "Yes";
      yesButton.addEventListener("click", () => {
        // Redirect to the 'game.html' page
        window.location.href = "game.html";
      });

      // Append elements to the landing page
      landingPage.innerHTML = "";
      landingPage.appendChild(knightImage);
      landingPage.appendChild(welcomeMessage);
      landingPage.appendChild(yesButton);
    }
  });
});
