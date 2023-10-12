//let myForm = document.getElementById("cYOAForm");

// Get the form element
const myForm = document.getElementById("cYOAForm");

// Add an event listener for the form submit event
myForm.addEventListener("submit", function (event) {
  // First, prevent the default form submission behavior
  event.preventDefault();

  // Collect the form data
  const formData = new FormData(myForm);

  // Send the form data to the server using a POST request
  fetch("builder.html", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => {
      console.log("Form submission successful:", data);
      // Display a success message to the user
      alert("Form submitted successfully!");
      submitHandler();
    })
    .catch((error) => {
      console.error("Form submission failed:", error);
      // Display an error message to the user
      alert("Form submission failed!");
    });
});

function submitHandler() {
  let myId = document.getElementById("id");
  let myStory = document.getElementById("story");
  let myImage = document.getElementById("image");
  let myOption1 = document.getElementById("option1");
  let myOp1 = document.getElementById("op1");
  let myOption2 = document.getElementById("option2");
  let myOp2 = document.getElementById("op2");
  let myOption3 = document.getElementById("option3");
  let myOp3 = document.getElementById("op3");
  let myOption4 = document.getElementById("option4");
  let myOp4 = document.getElementById("op4");
  let myOption5 = document.getElementById("option5");
  let myOp5 = document.getElementById("op5");

  document.getElementById("story").value =
    "{\n" +
    "id: " +
    myId.value +
    ",\n" +
    'text: "' +
    myStory.value +
    '",\n' +
    'img: (src = "' +
    myImage.value +
    '"),\n' +
    "options: [\n" +
    "  {\n" +
    '    text: "' +
    myOption1.value +
    '",\n' +
    "    nextText: " +
    myOp1.value +
    ",\n" +
    "  },\n" +
    "  {\n" +
    '    text: "' +
    myOption2.value +
    '",\n' +
    "    nextText: " +
    myOp2.value +
    ",\n" +
    "  },\n" +
    "  {\n" +
    '    text: "' +
    myOption3.value +
    '",\n' +
    "    nextText: " +
    myOp3.value +
    ",\n" +
    "  },\n" +
    "  {\n" +
    '    text: "' +
    myOption4.value +
    '",\n' +
    "    nextText: " +
    myOp4.value +
    ",\n" +
    "  },\n" +
    "  {\n" +
    '    text: "' +
    myOption5.value +
    '",\n' +
    "    nextText: " +
    myOp5.value +
    ",\n" +
    "  },\n" +
    " ],\n" +
    "},\n" +
    "\n\n\n Cut and paste to file.";
}

// Pattern
//{
// id: 1,
// text: "There is a key in front of you",
// img: (src = "Sword1.png"),
// options: [
//  {
//    text: "Pick up the key",
//    nextText: 2,
//   },
//  {
//    text: "Ignore the key",
//     nextText: 3,
//   },
// ],
//},
