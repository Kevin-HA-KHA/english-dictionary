const userInput = document.querySelector('.user-input');
const wordDisplay = document.querySelector('.word-input');
const meaningDisplay = document.querySelector('.word-meaning');
const instruction = document.querySelector('.instruction');
const audio = document.getElementById('audio');
let word;
let appData = {};


function getData() {
    getInput();
    let api = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(api)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            appData.definition = data[0].meanings[0].definitions[0].definition;
            if (data[0].phonetics[0].audio) {
                appData.audio = data[0].phonetics[0].audio;
            } else if (data[0].phonetics[1].audio) {
                appData.audio = data[0].phonetics[1].audio;
            } else if (data[0].phonetics[2].audio) {
                appData.audio = data[0].phonetics[2].audio;
            };

            displayData();
        })
        .catch((error) => {
            console.log(`Une erreur est survenue : ${error}`);
        });
};


function getInput() {
    word = userInput.value;
    userInput.value = '';
};


function displayData() {
    instruction.style.display = 'none';
    wordDisplay.style.display = 'block';
    meaningDisplay.style.display = 'block';
    audio.style.display = 'block';
    
    wordDisplay.innerHTML = `<p>Searched word :  ${word}<p>`;
    meaningDisplay.innerHTML = `<p>Meaning : ${appData.definition}</p>`;
    audio.src = appData.audio
}


userInput.addEventListener('keypress', (key) => {
    let inputLength = userInput.value.length;
    if (inputLength > 0 && key.which === 13) {
        getData();
    }
});


