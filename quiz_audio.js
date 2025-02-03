let words = [];
let questions = [];
let currentQuestion = 0;
let score = 0;

async function loadCSV() {
    const response = await fetch("words.csv");
    const data = await response.text();
    const rows = data.split("\n").slice(1);
    words = rows.map(row => {
        const [kannada, english, category, kannadaEnglish] = row.split(",");
        return { kannada, english, category, kannadaEnglish };
    });
    startQuiz();
}

function startQuiz() {
    questions = words.sort(() => 0.5 - Math.random()).slice(0, 10);  // Select 10 questions
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestion >= questions.length) {
        document.getElementById("quiz-container").innerHTML = `<h2>Quiz Completed! Your Score: ${score}/10</h2>`;
        return;
    }

    const quizContainer = document.getElementById("quiz-container");
    const word = questions[currentQuestion];
    const options = words.sort(() => 0.5 - Math.random()).slice(0, 3);
    options.push(word);  // Add the correct answer
    options.sort(() => 0.5 - Math.random()); // Shuffle options

    quizContainer.innerHTML = `
    
        <h3>Select the correct image for the word</h3>

        <div class="audio-container">
        <audio controls>
            <source src="https://upcdn.io/kW15bgo/raw/learnkannada/audio/${word.english}.wav" type="audio/wav">
        </audio>
        </div>
        
        <div class="options-container">
            ${options.map(option => {
                return `
                <ul>
                    <button onclick="checkAnswer('${option.kannadaEnglish}', '${word.kannadaEnglish}', this)">
                        <img src="https://upcdn.io/kW15bgo/raw/learnkannada/images/${option.english}.png" alt="${option.english}">
                    </button>
                </ul>
                `;
            }).join(" ")}
        </div>
    `;
}

function checkAnswer(selected, correct, button) {
    if (selected === correct) {
        score++;
        button.style.backgroundColor = "green";
    } else {
        button.style.backgroundColor = "red";
    }
    setTimeout(nextQuestion, 1000);  // Move to the next question after 1 second
}

function nextQuestion() {
    currentQuestion++;
    loadQuestion();
}

window.onload = loadCSV;
