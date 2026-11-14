/* =====================================================================
   AFTER THE MISSION — quiz.js
   ---------------------------------------------------------------------
   A 12-question quiz about the six explorers.
   - One question at a time
   - Immediate feedback: right/wrong + the correct answer + explanation
   - Score shown at the end, with a "Try again" button
   ===================================================================== */

const QUIZ_QUESTIONS = [
  {
    explorer: "eagle",
    question: "When the Apollo 11 astronauts left the Moon, which part of Eagle stayed behind?",
    options: ["The ascent stage (crew cabin)", "The descent stage", "The whole lunar module", "Nothing — all of it came back"],
    answer: 1,
    explain: "The descent stage, with its legs and landing engine, acted as a launch pad and was left at Tranquility Base. The ascent stage carried the crew back to orbit."
  },
  {
    explorer: "eagle",
    question: "Which experiment left beside Eagle is still used by scientists today?",
    options: ["A weather balloon", "A laser-ranging retroreflector", "A solar-powered radio", "A soil drill"],
    answer: 1,
    explain: "Observatories on Earth still bounce lasers off the Apollo 11 retroreflector to measure the distance to the Moon."
  },
  {
    explorer: "surveyor3",
    question: "Why did Surveyor 3 bounce twice when it landed?",
    options: ["It landed on a slope of ice", "A strong lunar wind pushed it", "Reflective rocks confused its radar and its engines kept firing", "It was designed to bounce like Pathfinder"],
    answer: 2,
    explain: "Highly reflective rocks confused the landing radar, so the engines didn't shut off at the right moment. The Moon has no wind."
  },
  {
    explorer: "surveyor3",
    question: "What did Apollo 12 astronauts bring back from Surveyor 3?",
    options: ["Its television camera and scoop", "Its entire body", "A sample of its fuel", "Nothing — they only took photos"],
    answer: 0,
    explain: "Pete Conrad and Alan Bean removed the camera, the scoop and other parts so scientists could study how they had changed on the Moon."
  },
  {
    explorer: "sojourner",
    question: "Sojourner was planned to work for 7 sols. How long did it actually operate?",
    options: ["3 sols", "30 sols", "83 sols", "14 years"],
    answer: 2,
    explain: "Sojourner kept working for 83 sols, until its lander stopped communicating with Earth in September 1997."
  },
  {
    explorer: "sojourner",
    question: "How did Mars Pathfinder, carrying Sojourner, cushion its landing?",
    options: ["With a sky crane", "With giant airbags", "With a parachute only", "With landing legs and a rocket hover"],
    answer: 1,
    explain: "Pathfinder used parachutes and rockets to slow down, then bounced across the surface wrapped in airbags."
  },
  {
    explorer: "opportunity",
    question: "Opportunity's famous 'blueberries' turned out to be…",
    options: ["Tiny meteorites", "Frozen water droplets", "Hematite-rich concretions formed with groundwater", "Volcanic glass beads from an eruption"],
    answer: 2,
    explain: "The blueberries are concretions rich in hematite. They formed when minerals carried by groundwater built up inside rock, evidence of Mars' watery past."
  },
  {
    explorer: "opportunity",
    question: "What ended Opportunity's mission in 2018?",
    options: ["It fell into a crater", "A planet-wide dust storm cut off its solar power", "Its wheels broke off", "NASA switched it off to save money"],
    answer: 1,
    explain: "A huge dust storm darkened the sky, so its solar panels couldn't recharge its batteries. Its last message arrived on 10 June 2018."
  },
  {
    explorer: "ingenuity",
    question: "What historic object did Ingenuity carry to Mars?",
    options: ["A piece of Moon rock", "A swatch of fabric from the Wright brothers' Flyer", "Neil Armstrong's watch", "A copy of the Pioneer plaque"],
    answer: 1,
    explain: "A small piece of fabric from the 1903 Wright Flyer, the first powered aircraft on Earth, was attached to Ingenuity."
  },
  {
    explorer: "ingenuity",
    question: "Ingenuity was planned for up to five flights. How many did it complete?",
    options: ["5", "19", "47", "72"],
    answer: 3,
    explain: "Ingenuity flew 72 times over almost three years before rotor damage on its last flight in January 2024."
  },
  {
    explorer: "pioneer10",
    question: "Pioneer 10 was the first spacecraft to…",
    options: ["Land on Jupiter", "Cross the asteroid belt and fly past Jupiter", "Orbit Saturn", "Leave the Milky Way"],
    answer: 1,
    explain: "Pioneer 10 crossed the asteroid belt in 1972–73 and made the first close flyby of Jupiter in December 1973."
  },
  {
    explorer: "pioneer10",
    question: "What is Pioneer 10 doing today?",
    options: ["Orbiting Jupiter", "Sending pictures every day", "Coasting silently out of the Solar System", "Parked on an asteroid"],
    answer: 2,
    explain: "Its last signal arrived in 2003, but it keeps travelling outward toward the star Aldebaran, a journey of more than 2 million years."
  }
];

document.addEventListener("DOMContentLoaded", function () {
  const quiz = document.getElementById("quiz");
  if (!quiz) return;

  let current = 0;      // which question we are on
  let score = 0;        // how many correct answers
  let answered = false; // has the current question been answered?

  const progressText = document.getElementById("quiz-progress-text");
  const progressFill = document.getElementById("quiz-progress-fill");
  const scoreText = document.getElementById("quiz-score");
  const card = document.getElementById("quiz-card");
  const results = document.getElementById("quiz-results");

  function showQuestion() {
    answered = false;
    const q = QUIZ_QUESTIONS[current];
    const explorer = findExplorer(q.explorer);

    progressText.textContent = "Question " + (current + 1) + " of " + QUIZ_QUESTIONS.length;
    progressFill.style.width = (current / QUIZ_QUESTIONS.length) * 100 + "%";
    scoreText.textContent = "Score: " + score;

    let options = "";
    q.options.forEach(function (option, index) {
      options += '<li><button type="button" class="quiz-option" data-index="' + index + '">' +
        '<span class="option-letter">' + "ABCD"[index] + "</span>" + option + "</button></li>";
    });

    card.innerHTML =
      '<p class="quiz-topic dest-' + explorer.destination + '"><span class="dest-dot"></span>' + explorer.shortName + "</p>" +
      '<h2 class="quiz-question">' + q.question + "</h2>" +
      '<ol class="quiz-options">' + options + "</ol>" +
      '<div class="quiz-feedback" id="quiz-feedback" aria-live="polite"></div>' +
      '<div class="quiz-actions"><button type="button" class="button" id="quiz-next" hidden>' +
      (current === QUIZ_QUESTIONS.length - 1 ? "See my score" : "Next question") + "</button></div>";

    card.classList.remove("quiz-in");
    void card.offsetWidth;
    card.classList.add("quiz-in");

    card.querySelectorAll(".quiz-option").forEach(function (button) {
      button.addEventListener("click", function () { checkAnswer(Number(button.dataset.index)); });
    });
    document.getElementById("quiz-next").addEventListener("click", nextQuestion);
    card.querySelector(".quiz-option").focus({ preventScroll: true });
  }

  function checkAnswer(chosen) {
    if (answered) return;
    answered = true;
    const q = QUIZ_QUESTIONS[current];
    const correct = chosen === q.answer;
    if (correct) score++;

    card.querySelectorAll(".quiz-option").forEach(function (button, index) {
      button.disabled = true;
      if (index === q.answer) button.classList.add("correct");
      if (index === chosen && !correct) button.classList.add("wrong");
    });

    const feedback = document.getElementById("quiz-feedback");
    feedback.className = "quiz-feedback show " + (correct ? "is-correct" : "is-wrong");
    feedback.innerHTML =
      "<strong>" + (correct ? "Correct!" : "Not quite. The answer is " + "ABCD"[q.answer] + ": " + q.options[q.answer] + ".") + "</strong>" +
      "<p>" + q.explain + "</p>" +
      '<a href="story.html?id=' + q.explorer + '">Read the full story</a>';

    scoreText.textContent = "Score: " + score;
    const next = document.getElementById("quiz-next");
    next.hidden = false;
    next.focus({ preventScroll: true });
  }

  function nextQuestion() {
    current++;
    if (current < QUIZ_QUESTIONS.length) showQuestion();
    else showResults();
  }

  function showResults() {
    progressFill.style.width = "100%";
    progressText.textContent = "Quiz complete";
    card.hidden = true;
    results.hidden = false;

    const total = QUIZ_QUESTIONS.length;
    const percent = Math.round((score / total) * 100);
    let message;
    if (percent === 100) message = "A perfect mission. You know these explorers inside out.";
    else if (percent >= 75) message = "Excellent work. You'd make a fine mission historian.";
    else if (percent >= 50) message = "Good effort. Revisit a story or two and try again.";
    else message = "Every explorer starts somewhere. Read a few stories and have another go.";

    results.innerHTML =
      '<p class="result-score"><span>' + score + "</span> / " + total + "</p>" +
      "<h2>" + message + "</h2>" +
      '<div class="result-actions"><button type="button" class="button" id="quiz-retry">Try again</button>' +
      '<a class="button button-ghost" href="explore.html">Explore the stories</a></div>';
    document.getElementById("quiz-retry").addEventListener("click", restart);
    document.getElementById("quiz-retry").focus({ preventScroll: true });
  }

  function restart() {
    current = 0;
    score = 0;
    results.hidden = true;
    card.hidden = false;
    showQuestion();
  }

  showQuestion();
});
