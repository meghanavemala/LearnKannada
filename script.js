async function loadCSV() {
    const response = await fetch("words.csv");
    const data = await response.text();
    const rows = data.split("\n").slice(1);

    return rows.map(row => {
        const [kannada, english, category, kannadaEnglish] = row.split(",");
        return { kannada, english, category, kannadaEnglish };
    });
}

let words = [];

async function loadWords() {
    words = await loadCSV();
    displayWords(words);
}

// Function to display words based on search/filter
function displayWords(filteredWords) {
    const container = document.getElementById("word-container");
    container.innerHTML = "";

    filteredWords.forEach(word => {
        const card = document.createElement("div");
        card.className = "word-card";

        card.innerHTML = `
            <img src="https://upcdn.io/kW15bgo/raw/learnkannada/images/${word.english}.png" alt="${word.english}">
            <h3>${word.kannada} (<strong>${word.kannadaEnglish}</strong>)</h3>
            <p><strong>English:</strong> ${word.english}</p>
            <p><strong>Category:</strong> ${word.category}</p>
            <audio controls>
                <source src="https://upcdn.io/kW15bgo/raw/learnkannada/audio/${word.english}.wav" type="audio/wav">
                Your browser does not support the audio element.
            </audio>
        `;
        container.appendChild(card);
    });
}

// Function to filter words based on search query
function searchWords() {
    const query = document.getElementById("search-input").value.toLowerCase();
    const filteredWords = words.filter(word => 
        word.kannada.toLowerCase().includes(query) || 
        word.english.toLowerCase().includes(query) || 
        word.kannadaEnglish.toLowerCase().includes(query)
    );
    displayWords(filteredWords);
}

// Append search bar to the document
document.addEventListener("DOMContentLoaded", () => {
    const searchContainer = document.createElement("div");
    searchContainer.innerHTML = `
    <div class="search-container">
        <input type="text" id="search-input" placeholder="Search words..." onkeyup="searchWords()">
    </div>
    `;
    document.body.insertBefore(searchContainer, document.getElementById("word-container"));
});

window.onload = loadWords;
