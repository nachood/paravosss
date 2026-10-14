const questions = [
  {
    text: "¿Quién es mi trabajadora hermosa?",
    answers: ["YO", "yo", "yo<3 Y MÁS TE VALE QUE LA ÚNICA PORQUE SI NO TE MATO"],
    success: "Ufff se me paró al chot... digo digo SIGUIENTE PREGUNTAA"
  },
  {
    text: "¿Te gustaría que hagamos algo después cuando llegues?",
    answers: ["Sí", "Sí", "TODAS LAS ANTERIORES PORQUE YO SÍ QUIERO OK"],
    success: "SISISI quiero jugar, hablar con vos mi vida<3"
  },
  {
    text: "¿Quién tiene las uñas más lindas del mundo?",
    answers: ["Tul jugando lol", "Tul jugando valo", "Todas las anteriores porque VOS, mujer hermosa, tenés las uñas más mononas que vi<3"],
    success: "Te extrañé, mi vida. Qué uñas tan mononas ♡"
  },
  {
    text: "¿Quién me hace sonreír incluso en mis días raros?",
    answers: ["El mate", "Un gatito con moño", "VOS, mi persona favorita, obvio<3"],
    success: "Exactooo, vos tenés mi sonrisa guardada en el bolsillo ♡"
  },
  {
    text: "¿Cuál sería nuestro plan perfecto?",
    answers: ["Dormir todo el día", "Ganar todas las partidas", "Todas las anteriores si es con vos, mi amor"],
    success: "SÍ, con vos cualquier plan se vuelve mi favorito<3"
  }
];

const introScreen = document.querySelector("#intro-screen");
const quizScreen = document.querySelector("#quiz-screen");
const finalScreen = document.querySelector("#final-screen");
const playButton = document.querySelector("#play-button");
const backButton = document.querySelector("#back-button");
const restartButton = document.querySelector("#restart-button");
const questionNumber = document.querySelector("#question-number");
const questionKickerNumber = document.querySelector("#question-kicker-number");
const questionTitle = document.querySelector("#question-title");
const answers = document.querySelector("#answers");
const feedback = document.querySelector("#feedback");
const nextButton = document.querySelector("#next-button");
const progressFill = document.querySelector("#progress-fill");

let currentQuestion = 0;

function showScreen(screenToShow) {
  [introScreen, quizScreen, finalScreen].forEach((screen) => {
    const shouldShow = screen === screenToShow;
    screen.hidden = !shouldShow;
    screen.classList.toggle("is-active", shouldShow);
  });
}

function renderQuestion() {
  const question = questions[currentQuestion];
  questionNumber.textContent = currentQuestion + 1;
  questionKickerNumber.textContent = String(currentQuestion + 1).padStart(2, "0");
  questionTitle.textContent = question.text;
  progressFill.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
  feedback.textContent = "";
  feedback.classList.remove("success");
  nextButton.hidden = true;
  answers.classList.remove("is-locked");
  answers.innerHTML = "";

  question.answers.forEach((answerText, index) => {
    const button = document.createElement("button");
    button.className = "answer";
    button.type = "button";
    button.dataset.index = index;
    button.innerHTML = `<span class="answer-number">${index + 1}</span>${answerText}`;
    button.addEventListener("click", () => selectAnswer(button, index));
    answers.appendChild(button);
  });
}

function selectAnswer(button, answerIndex) {
  if (answers.classList.contains("is-locked")) return;

  if (answerIndex !== 2) {
    button.classList.remove("is-wrong");
    void button.offsetWidth;
    button.classList.add("is-wrong");
    feedback.textContent = "NOOO esa noo es la correeectaa u.u";
    feedback.classList.remove("success");
    return;
  }

  button.classList.add("is-correct");
  answers.classList.add("is-locked");
  feedback.textContent = questions[currentQuestion].success;
  feedback.classList.add("success");
  nextButton.textContent = currentQuestion < questions.length - 1 ? "Siguiente ♡" : "Ver mi carta ♡";
  nextButton.hidden = false;
}

nextButton.addEventListener("click", () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion += 1;
    renderQuestion();
  } else {
    showScreen(finalScreen);
  }
});

playButton.addEventListener("click", () => {
  currentQuestion = 0;
  renderQuestion();
  showScreen(quizScreen);
});

backButton.addEventListener("click", () => {
  showScreen(introScreen);
});

restartButton.addEventListener("click", () => {
  currentQuestion = 0;
  renderQuestion();
  showScreen(quizScreen);
});
