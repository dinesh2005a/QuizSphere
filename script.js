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
    },
    {
        question: "In ancient Indian tradition, which text is considered a foundational work on linguistics and grammar?",
        options: ["Arthashastra", "Yoga Sutras", "Ashtadhyayi", "Taittiriya Upanishad"],
        correct: 2
    },
    {
        question: "The Śulba Sūtras primarily deal with which subject?",
        options: ["Astronomy", "Geometry and measurement", "Ethics and philosophy", "Ritualistic worship"],
        correct: 1
    },
    {
        question: "What is the primary goal of 'Dharmaśāstra' in Indian literature?",
        options: ["To establish moral and legal guidelines", "To describe scientific advancements", "To narrate mythological stories", "To explain the principles of meditation"],
        correct: 0
    }
];

let currentQuestion = 0;
let score = 0;

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
    quizContainer.innerHTML = `<div class='result'>Your Score: ${score}/${quizData.length}</div>`;
}

document.addEventListener("DOMContentLoaded", () => {
    loadQuestion();
});
