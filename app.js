const jsonUrl = 'https://cdn.jsdelivr.net/gh/ShamelJij/itquiz_json@efbaa14/qanda.json';
let quizData = []; // Store the fetched quiz data

// Function to fetch JSON and initialize the display
async function fetchQuizData() {
    try {
        let response = await fetch(jsonUrl);
        if (!response.ok) throw new Error('Failed to fetch quiz data');
        quizData = await response.json(); // Store the data globally

        displayRandomQuestion(quizData); // Display initial random question

        // Event listener for the "Next Question" button
        document.getElementById('next-btn').addEventListener('click', () => {
            displayRandomQuestion(quizData);
        });

        // Event listener for the search bar
        document.getElementById('search-input').addEventListener('input', (event) => {
            const searchTerm = event.target.value.trim().toLowerCase();
            if (searchTerm === '') {
                // If search is empty, show random question again
                document.getElementById('search-result').innerHTML = '';
                document.getElementById('quiz-container').style.display = 'block';
            } else {
                // Perform search
                performSearch(searchTerm);
            }
        });

    } catch (error) {
        console.error('Error fetching quiz data:', error);
    }
}

// Function to display a random question and answer
function displayRandomQuestion(questions) {
    const randomIndex = Math.floor(Math.random() * questions.length); // Get random index
    const randomQuestion = questions[randomIndex]; // Get random question object

    // Display the question and answer in respective elements
    document.getElementById('question').innerHTML = randomQuestion.question;
    document.getElementById('answer').innerHTML = randomQuestion.answer;

    // Set title based on the random question's title property
    setTitle(randomQuestion.title);

    // Hide search results and show the main quiz container
    document.getElementById('search-result').innerHTML = '';
    document.getElementById('quiz-container').style.display = 'block';
}

// Function to set the title based on the question's title property
function setTitle(ranTitle) {
    const titleElement = document.getElementById('title');
    if (ranTitle === 1) {
        titleElement.innerHTML =
            "<small>Beurteilen marktgängiger IT-Systeme und Lösungen</small>";
    } else if (ranTitle === 2) {
        titleElement.innerHTML =
            "<small>Entwickeln, Erstellen und Betreuen von IT-Lösungen</small>";
    } else if (ranTitle === 3) {
        titleElement.innerHTML =
            "<small>Planen, Vorbereiten und Durchführen von Arbeitsaufgaben</small>";
    } else if (ranTitle === 4) {
        titleElement.innerHTML =
            "<small>Auftragsabschluss und Leistungserbringung</small>";
    } else if (ranTitle === 5) {
        titleElement.innerHTML = "<small>Qualitätssichernde Maßnahmen</small>";
    } else if (ranTitle === 6) {
        titleElement.innerHTML =
            "<small>Informieren und Beraten von Kunden und Kundinnen</small>";
    } else if (ranTitle === 7) {
        titleElement.innerHTML =
            "<small>IT-Sicherheit und Datenschutz, Ergonomie</small>";
    }
}

// Function to perform the search
function performSearch(searchTerm) {
    // Filter the quizData based on the search term
    const filteredQuestions = quizData.filter(item => {
        return (
            item.question.toLowerCase().includes(searchTerm) ||
            item.answer.toLowerCase().includes(searchTerm)
        );
    });

    // Display search results
    const searchResultDiv = document.getElementById('search-result');
    searchResultDiv.innerHTML = ''; // Clear previous results

    if (filteredQuestions.length === 0) {
        searchResultDiv.innerHTML = '<p>No matching questions found.</p>';
    } else {
        // Display number of matches found
        searchResultDiv.innerHTML = `<p>${filteredQuestions.length} Fragen gefunden:</p>`;

        // Create cards for each filtered question
        filteredQuestions.forEach(question => {
            const card = document.createElement('div');
            card.className = 'card mb-3';
            card.innerHTML = `
                <div class="card-body">
                    <p class="card-title text-primary">${question.question}</p>
                    <div class="card-text text-success">${question.answer}</div>
                </div>
            `;
            searchResultDiv.appendChild(card);
        });
    }

    // Hide main quiz container when displaying search results
    document.getElementById('quiz-container').style.display = 'none';
}

// Fetch and initialize the quiz on page load
fetchQuizData();
