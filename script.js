let score = 0;
let timeLeft = 120;
let timer;
let currentQuestion;

// Generates a random math question
function generateQuestion() {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const operators = ['+', '-', '*', '/'];
  const operator = operators[Math.floor(Math.random() * operators.length)];

  let question;
  let answer;

  switch (operator) {
    case '+':
      question = `${num1} + ${num2}`;
      answer = num1 + num2;
      break;
    case '-':
      question = `${num1} - ${num2}`;
      answer = num1 - num2;
      break;
    case '*':
      question = `${num1} * ${num2}`;
      answer = num1 * num2;
      break;
    case '/':
      question = `${num1 * num2} / ${num2}`; // Ensure division without remainder
      answer = num1;
      break;
  }

  currentQuestion = { question, answer };
  document.getElementById('question').innerText = `What is ${question}?`;
  document.getElementById('feedback').innerText = ''; // Clear feedback
  document.getElementById('answer').value = ''; // Clear input
  document.getElementById('answer').focus(); // Automatically focus input
}

// Checks the answer and updates the score
function checkAnswer() {
  const userAnswer = document.getElementById('answer').value.trim();
  const feedback = document.getElementById('feedback');

  if (userAnswer === '') {
    feedback.innerText = 'Please enter an answer!';
    return;
  }

  const parsedAnswer = parseInt(userAnswer, 10);

  if (parsedAnswer === currentQuestion.answer) {
    score++;
    feedback.innerText = 'Correct!';
  } else {
    feedback.innerText = `Incorrect! The correct answer was ${currentQuestion.answer}.`;
  }

  document.getElementById('score').innerText = score;
  generateQuestion();
}

// Starts the game
function startGame() {
  score = 0;
  timeLeft = 120;

  document.getElementById('score').innerText = score;
  document.getElementById('timeLeft').innerText = timeLeft;
  document.getElementById('quiz').style.display = 'block';
  document.getElementById('feedback').innerText = '';
  generateQuestion();

  clearInterval(timer); // Reset the timer if it was running
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById('timeLeft').innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      showResult(); // Show result after timer ends
    }
  }, 1000);
}

// Displays the result screen with the congratulatory message
function showResult() {
  document.body.innerHTML = `
    <div class="container">
      <header>
        <h1>Time's Up!</h1>
      </header>
      <main>
        <p>Your Final Score: <strong>${score}</strong></p>
        <p>Congratulations! 🎉</p>
        <p><strong>BM Public School, Harpur Middhi, Ballia, Uttar Pradesh</strong></p>
        <p>
          Dear Student, <br>
          We are proud of your effort and enthusiasm in solving the math quiz! 🌟 <br>
          Learning math is a great way to sharpen your mind, and you’ve done an amazing job today. Keep practicing, and remember, every step you take brings you closer to excellence. <br><br>
          Whether you scored high or simply gave your best, we celebrate your participation! 👏 <br>
          Keep shining and making us proud. Together, let's keep learning and growing!
        </p>
        <p>— With best wishes, <br><strong>BM Public School</strong></p>
        <button onclick="location.reload()">Play Again</button>
      </main>
    </div>
  `;
}

// Event listeners
document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('submitAnswer').addEventListener('click', checkAnswer);
document.getElementById('answer').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') checkAnswer();
});
