const question = document.getElementById("question");
const button1 = document.getElementById("answer-1");
const button2 = document.getElementById("answer-2");
const button3 = document.getElementById("answer-3");
const button4 = document.getElementById("answer-4");
const buttonArray = [button1, button2, button3,  button4];
const flag = document.getElementById("flag");
const answer1 = document.getElementById("answer-1-text");
const answer2 = document.getElementById("answer-2-text");
const answer3 = document.getElementById("answer-3-text");
const answer4 = document.getElementById("answer-4-text");
const answerArray = [answer1, answer2, answer3, answer4]
const container = document.getElementById("card");
const questionType = ["capital", "flag"];
let chosenCountries = [];
let nextButton;
let country;
let correct;
let score = 0;

function buttonStyle(button, color, backgroundColor, borderColor) {
    button.style.cssText = `
        color: ${color};
        background-color: ${backgroundColor};
        border-color: ${borderColor};`;
}

buttonArray.forEach((button, index) =>{
    button.addEventListener("mouseover", () => {
        buttonStyle(button, "white", "#F9A826", "transparent");
    });
    button.addEventListener("mouseleave", () => {
        buttonStyle(button, "#6066D0B2", "white", "#6066D0B2");
    });
    button.addEventListener("click", () =>{
        disableButtons();
        if (correct === index) {
            button.style.backgroundColor = "#60BF88";
            score++;
            createNextButton();
        }
        else {
            button.style.backgroundColor = "#EA8282";
            buttonStyle(buttonArray[correct], "white", "#60BF88", "transparent");
            createResultButton();
        }
    })
});

function getRandomInt(N) {
    let int = Math.floor(Math.random() * N);
    // some countries do not have a capital city
    if ((int === 42) || (int === 84) || (int === 99) || (int === 114)) {
        return (getRandomInt(N));
    }
    // prevent the same country being chosen twice
    else if (chosenCountries.includes(int)){
        return (getRandomInt(N));
    }
    chosenCountries.push(int);
    return int;
}

async function fetchCountry() {
    let response;
    let finalURL = "https://restcountries.com/v3.1/all?fields=name,capital,flags"
    response = await fetch(finalURL);
    country = await response.json();
    console.log(country);
}

function displayAnswers(correctAnswer, wrongAnswer1, wrongAnswer2, wrongAnswer3){
    const answer = Math.random();
    if (answer < 0.25) {
        answer1.innerHTML = `${correctAnswer}`;
        correct = 0;
        answer2.innerHTML = `${wrongAnswer1}`;
        answer3.innerHTML = `${wrongAnswer2}`;
        answer4.innerHTML = `${wrongAnswer3}`;
    }
    else if (answer < 0.50) {
        answer1.innerHTML = `${wrongAnswer1}`;
        answer2.innerHTML = `${correctAnswer}`;
        correct = 1;
        answer3.innerHTML = `${wrongAnswer2}`;
        answer4.innerHTML = `${wrongAnswer3}`;
    }
    else if (answer < 0.75) {
        answer1.innerHTML = `${wrongAnswer1}`;
        answer2.innerHTML = `${wrongAnswer2}`;
        answer3.innerHTML = `${correctAnswer}`;
        correct = 2;
        answer4.innerHTML = `${wrongAnswer3}`;
    }
    else {
        answer1.innerHTML = `${wrongAnswer1}`;
        answer2.innerHTML = `${wrongAnswer2}`;
        answer3.innerHTML = `${wrongAnswer3}`;
        answer4.innerHTML = `${correctAnswer}`;
        correct = 3;
    }
    if (nextButton !== undefined) {
        nextButton.style.display = "none";
    }
}

function displayCapitalQuestion(){
    chosenCountries = [];
    const correctNum = getRandomInt(250);
    const countryName = country[correctNum].name.common;
    const correctCity = country[correctNum].capital[0];
    const wrongCity1 = country[getRandomInt(250)].capital[0];
    const wrongCity2 = country[getRandomInt(250)].capital[0];
    const wrongCity3 = country[getRandomInt(250)].capital[0];
    question.innerHTML = `What is the capital city of ${countryName}?`
    displayAnswers(correctCity, wrongCity1, wrongCity2, wrongCity3);
    flag.style.display = "none";
}

function displayFlagQuestion(){
    chosenCountries = [];
    const correctNum = getRandomInt(250);
    const countryName = country[correctNum].name.common;
    const wrongCountry1 = country[getRandomInt(250)].name.common;
    const wrongCountry2 = country[getRandomInt(250)].name.common;
    const wrongCountry3 = country[getRandomInt(250)].name.common;
    flag.src = country[correctNum].flags.svg;
    flag.style.cssText = `
    width: 84px;
    height: 54px;
    filter: drop-shadow(0px 4px 24px rgba(0, 0, 0, 0.1));
    border-radius: 4px;
    align-self: flex-start;
    position: relative;
    left: 10px`;
    question.innerHTML = "Which country does this flag belong to?"
    displayAnswers(countryName, wrongCountry1, wrongCountry2, wrongCountry3);
}

async function displayQuestion() {
    chosenCountries = [];
    let chosenQeustion = questionType[getRandomInt(2)];
    if(chosenQeustion === "capital"){
        displayCapitalQuestion();
    }
    else if(chosenQeustion === "flag"){
        displayFlagQuestion();
    }

}

window.addEventListener("load", async () => {
    await fetchCountry();
    displayQuestion();
});

function disableButtons() {
    button1.disabled = true;
    button2.disabled = true;
    button3.disabled = true;
    button4.disabled = true;
}

function enableButtons() {
    button1.disabled = false;
    button2.disabled = false;
    button3.disabled = false;
    button4.disabled = false;
}

function createNextButton() {
    if (nextButton === undefined) {
        nextButton = document.createElement("button");
        container.appendChild(nextButton);
        nextButton.innerHTML = "Next";
        nextButton.style.cssText = `
            width: 116px;
            position: relative;
            align-self: end;
            left: 8px;
            bottom: 20px;
            margin-bottom: -20px;
            text-align: center;`;
        nextButton.addEventListener("click", () => {
            displayQuestion();
            enableButtons();
            buttonArray.forEach((button) => {
                buttonStyle(button, "#6066D0B2", "white", "#6066D0B2")
            });
        });
    }
    else{
        nextButton.style.display = "block"
    }
}

function createResultButton() {
    resultButton = document.createElement("button");
    container.appendChild(resultButton);
    resultButton.innerHTML = "Results";
    resultButton.style.cssText = `
        width: 116px;
        position: relative;
        align-self: end;
        left: 8px;
        bottom: 20px;
        margin-bottom: -20px;
        text-align: center;`;
    resultButton.addEventListener("click", () => {
        resultButton.style.display = "none"
        showResultsPage();
    });
}

function showResultsPage() {
    const answers = document.getElementsByClassName("answer");
    question.remove();
    while (answers.length > 0) {
        answers[0].remove();
    }
    if (nextButton !== undefined) {
        nextButton.style.display = "none";
    }
    flag.style.display = "none";
    const image = document.getElementsByTagName("img")[0];
    const results = document.createElement("h2");
    container.appendChild(results)
    const scoreText = document.createElement("p");
    container.appendChild(scoreText);
    const retryButton = document.createElement("button");
    container.appendChild(retryButton);
    image.src = "./images/undraw_winners_ao2o 2.svg";
    results.innerHTML = "Results";
    scoreText.innerHTML = "You got" + " <span>" + score + "</span>" + " correct answers";
    retryButton.innerHTML = "Try again";
    image.style.cssText = `
        display: 0;
        left: 0;
        bottom: 0;
        margin-bottom: 30px;`;
    results.style.cssText = `
        text-align: center;
        color: #1D355D;
        font-family: Poppins;
        font-size: 48px;
        font-weight: 700;`;
    scoreText.style.cssText = `
        text-align: center;
        font-size: 24px;
        font-weight: 400;`;
    retryButton.style.cssText = `
        width: 200px;
        color: #1D355D;
        border-color: #1D355D;
        text-align: center;`;
    retryButton.addEventListener("click", () => {
        location.reload();
    });
}