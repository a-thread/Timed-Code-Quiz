// Variables for quiz

// Start Screen variables
const startBtn = document.getElementById("start-btn");
const startScreenEl = document.getElementById("start-screen");

// Quiz screen variables
const questionCard = document.getElementById("question-card");
const questionTitleEl = document.getElementById("question-title");
let choicesEl = document.getElementById("choices");
const rightWrongEl = document.getElementById("right-wrong");
const buttonsEL = document.getElementById("buttons");

// End Screen Variables
const endScreen = document.getElementById("end-screen");
const finalScore = document.getElementById("final-score");
var initialsEl = document.getElementById("user-initials");
var scoreSubmit = document.getElementById("score-submit");

// Timer variable
let timerDisplay = document.getElementById("timer");

// Questions: sourced in part from Geeks for Geeks (https://www.geeksforgeeks.org/javascript-quiz-set-2/?ref=rp)
const questions = [
  {
    question: "Commonly used data types DO NOT include:",
    choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    correctAns: "2. booleans",
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    choices: [
      "1. alertBox('Hello World');",
      "2. msg('Hello World');",
      "3. alert('Hello World');",
      "4. msgBox('Hello World');",
    ],
    correctAns: "3. alert('Hello World');",
  },
  {
    question:
      "The condition in an if / else statement is enclosed within ____.",
    choices: [
      "1. quotes",
      "2. curly brackets",
      "3. parentheses",
      "4. square brackets",
    ],
    correctAns: "3. parentheses",
  },
  {
    question: "Arrays in JavaScript can be used to store ____.",
    choices: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    correctAns: "4. all of the above",
  },
  {
    question:
      "String values must be enclosed within _____ when being assigned to variables.",
    choices: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    correctAns: "3. quotes",
  },
  {
    question:
      "What is the HTML tag under which one can write the JavaScript code?",
    choices: ["1. <javascript>", "2. <scripted>", "3. <script>", "4. <js>"],
    correctAns: "3. <script>",
  },
  {
    question:
      "What is the correct syntax for regerrring to an external script called “script.js”?",
    choices: [
      "1. <script src=”script.js”>",
      "2. <script href=”script.js”>",
      "3. <script href=”script.js”>",
      "4. <script href=”script.js”>",
    ],
    correctAns: "1. <script src=”script.js”>",
  },
  {
    question: "Which of the following is not a reserved word in JavaScript?",
    choices: ["1. interface", "2. throws", "3. program", "4. short"],
    correctAns: "3. program",
  },
  {
    question: "How is a function called in JavaScript?",
    choices: [
      "1. call myFunction()",
      "2. call function myFunction()",
      "3. myFunction()",
      "4. function myFunction()",
    ],
    correctAns: "3. myFunction()",
  },
  {
    question:
      "Which of the following is true about variable naming conventions in JavaScript?",
    choices: [
      "1. JavaScript variable names must begin with a letter or the underscore character.",
      "2. JavaScript variable names are case sensitive.",
      "3. Both of the above.",
      "4. none of the above.",
    ],
    correctAns: "3. Both of the above.",
  },
];

// Quiz variables
var Q = 0;
var correct = [];
var secondsLeft = 60;
var timerInterval;

// starting quiz functions
function startQuiz() {
  startScreenEl.setAttribute("style", "display: none;"); // hiding the start screen
  buildQuestionCard(); // building the question card
  questionCard.setAttribute("style", "visibility: visible;"); // showing the question card
  startTimer(); // starting the timer when the button is pressed
}

// When start button is clicked, the quiz will begin!
startBtn.addEventListener("click", startQuiz);
scoreSubmit.addEventListener("click", saveHighScore);

// Building the question card
function buildQuestionCard() {
  let currentQuestion = questions[Q];

  questionTitleEl.textContent = currentQuestion.question; // Putting each question in the title

  choicesEl.innerHTML = ""; // Creating space inside the 'choices' element

  currentQuestion.choices.forEach(function (choice, i) {
    const choices = document.createElement("button"); // creating buttons for each choice
    choices.setAttribute("class", "choice"); // setting class to choice to connect to css styling
    choices.setAttribute("value", choice); // setting inside value for each
    choices.textContent = choice; // displaying the text of each value
    choicesEl.appendChild(choices); // attaching each choice to one another
    choices.onclick = decisionClick; // registering "click" for user decicision
  });
}

// Determining function for user answer picks
function decisionClick() {
  // If user chooses the right answer...
  if (this.value === questions[Q].correctAns) {
    console.log("correct");
    rightWrongEl.setAttribute("class", "right");
    rightWrongEl.setAttribute("style", "visibility: visible;");
    rightWrongEl.textContent = "Right!"; // "Right!" is displayed on the screen
    secondsLeft += 10; // 10 seconds is added to the timer

    // If user chooses the wrong answer...
  } else {
    console.log("wrong");
    rightWrongEl.setAttribute("class", "wrong");
    rightWrongEl.setAttribute("style", "visibility: visible;");
    rightWrongEl.textContent = "Wrong"; // "Wrong" is displayed on the screen
    secondsLeft -= 10; // 10 seconds is subtracted from the timer
  }
  Q++;
  if (Q === questions.length) {
    gameOver();
  } else {
    buildQuestionCard();
  }
}

// Timer function
function startTimer() {
  timerInterval = setInterval(function () {
    secondsLeft--; // decrements time left
    timerDisplay.textContent = secondsLeft; // displays remaining time on screen

    if (secondsLeft <= 0) {
      // if the timer is less than or equal to zero...
      clearInterval(timerInterval); // timer is clearned and...
      return gameOver(); // ..."Game Over" function is fired.
    }
  }, 1000);
}

function gameOver() {
  questionCard.setAttribute("style", "display: none;"); // hiding the question card
  endScreen.setAttribute("style", "visibility: visible;"); // showing End Screen Card
  clearInterval(timerInterval); // clearing the timer
  timerDisplay.textContent = 0; // setting timer display to zero
  finalScore.textContent = score; // displays time left on the clock as User Score

  if (secondsLeft < 0) {
    secondsLeft = 0;
  }
}

function saveHighScore() {
  var initials = initialsEl.value.trim();
  console.log(initials);
  console.log(secondsLeft);
  var score = {
    initials: initials,
    myscore: secondsLeft,
  };
  window.localStorage.setItem("score", score);
  console.log(localStorage);
}

// make high score page!
