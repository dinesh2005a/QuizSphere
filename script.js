const quizData = [
    {
        question: "What is the primary focus of Indian Knowledge Systems (IKS)?",
        options: [
            "Developing modern scientific theories",
            "Integrating Western and Eastern philosophical traditions",
            "Understanding indigenous knowledge rooted in Indian traditions",
            "Promoting only religious teachings in ancient India"
        ],
        correct: 2
    },
    {
        question: "Which of the following is NOT a part of the six Vedāṅgas?",
        options: ["Jyotiṣa", "Vyākaraṇa", "Darśana", "Nirukta"],
        correct: 2
    }
];

let playerName = "";
let currentQuestion = 0;
let score = 0;

function startQuiz() {
    playerName = document.getElementById("player-name").value.trim();
    if (playerName === "") {
        alert("Please enter your name!");
        return;
    }

    document.getElementById("name-container").classList.add("hidden");
    document.getElementById("quiz-container").classList.remove("hidden");

    loadQuestion();
}

function loadQuestion() {
    const quizContainer = document.getElementById("quiz");
    quizContainer.innerHTML = "";

    const questionEl = document.createElement("div");
    questionEl.classList.add("question");
    questionEl.innerText = quizData[currentQuestion].question;
    quizContainer.appendChild(questionEl);

    const optionsContainer = document.createElement("div");
    optionsContainer.classList.add("options");

    quizData[currentQuestion].options.forEach((option, index) => {
        const optionEl = document.createElement("div");
        optionEl.classList.add("option");
        optionEl.innerText = option;
        optionEl.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(optionEl);
    });

    quizContainer.appendChild(optionsContainer);
    document.getElementById("submitBtn").classList.remove("hidden");
}

function selectAnswer(selectedIndex) {
    const options = document.querySelectorAll(".option");
    options.forEach((option, index) => {
        option.classList.remove("selected");
        if (index === selectedIndex) {
            option.classList.add("selected");
        }
    });

    document.getElementById("submitBtn").onclick = () => checkAnswer(selectedIndex);
}

function checkAnswer(selectedIndex) {
    if (selectedIndex === quizData[currentQuestion].correct) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    const quizContainer = document.getElementById("quiz");
    quizContainer.innerHTML = `<div class='result'>${playerName}, Your Score: ${score}/${quizData.length}</div>`;
    
    updateLeaderboard();
    
    document.getElementById("submitBtn").classList.add("hidden");
    document.getElementById("restartBtn").classList.remove("hidden");
}

function updateLeaderboard() {
    let topScorer = localStorage.getItem("topScorer") || "No scores yet.";
    let topScore = parseInt(localStorage.getItem("topScore")) || 0;

    if (score > topScore) {
        topScorer = `${playerName} - ${score}/${quizData.length}`;
        localStorage.setItem("topScorer", topScorer);
        localStorage.setItem("topScore", score);
    }

    document.getElementById("top-scorer").innerText = topScorer;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById("quiz-container").classList.add("hidden");
    document.getElementById("name-container").classList.remove("hidden");
    document.getElementById("restartBtn").classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("top-scorer").innerText = localStorage.getItem("topScorer") || "No scores yet.";
});
