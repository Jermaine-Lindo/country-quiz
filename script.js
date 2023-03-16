const question = document.getElementById("question");
const button1 = document.getElementById("answer-1");
const button2 = document.getElementById("answer-2");
const button3 = document.getElementById("answer-3");
const button4 = document.getElementById("answer-4");
const buttonArray = [button1, button2, button3,  button4];
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

buttonArray.forEach((button) =>{
    button.addEventListener("mouseover", () => {
        buttonStyle(button, "white", "#F9A826", "transparent");
    });
    button.addEventListener("mouseleave", () => {
        buttonStyle(button, "#6066D0B2", "white", "#6066D0B2");
    });
});

function getRandomInt(N) {
    let int = Math.floor(Math.random() * N);
    // some countries do not have a capital city
    if ((int === 15) || (int === 17) || (int === 91) || (int === 237)) {
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

function displayCapitalQuestion(){
    chosenCountries = [];
    const correctNum = getRandomInt(250);
    const countryName = country[correctNum].name.common;
    const correctCity = country[correctNum].capital[0];
    const wrongCity1 = country[getRandomInt(250)].capital[0];
    const wrongCity2 = country[getRandomInt(250)].capital[0];
    const wrongCity3 = country[getRandomInt(250)].capital[0];
    question.innerHTML = `What is the capital city of ${countryName}?`
    const answer = Math.random();
    if (answer < 0.25) {
        answer1.innerHTML = `${correctCity}`;
        correct = 0;
        answer2.innerHTML = `${wrongCity1}`;
        answer3.innerHTML = `${wrongCity2}`;
        answer4.innerHTML = `${wrongCity3}`;
    }
    else if (answer < 0.50) {
        answer1.innerHTML = `${wrongCity1}`;
        answer2.innerHTML = `${correctCity}`;
        correct = 1;
        answer3.innerHTML = `${wrongCity2}`;
        answer4.innerHTML = `${wrongCity3}`;
    }
    else if (answer < 0.75) {
        answer1.innerHTML = `${wrongCity1}`;
        answer2.innerHTML = `${wrongCity2}`;
        answer3.innerHTML = `${correctCity}`;
        correct = 2;
        answer4.innerHTML = `${wrongCity3}`;
    }
    else {
        answer1.innerHTML = `${wrongCity1}`;
        answer2.innerHTML = `${wrongCity2}`;
        answer3.innerHTML = `${wrongCity3}`;
        answer4.innerHTML = `${correctCity}`;
        correct = 3;
    }
    if (nextButton !== undefined) {
        nextButton.style.display = "none";
    }
}

async function displayQuestion() {
    await fetchCountry();
    chosenCountries = [];
    let chosenQeustion = questionType[getRandomInt(2)];
    if(chosenQeustion === "capital"){
        console.log("capital");
        displayCapitalQuestion();
    }
    else if(chosenQeustion === "flag"){
        console.log("flag");
        displayCapitalQuestion();
    }

}

window.addEventListener("load", () => {
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
            float: right;
            right: 14px;
            bottom: 20px;
            margin-bottom: -20px;
            text-align: center;`;
        nextButton.addEventListener("click", () => {
            displayQuestion();
            enableButtons();
            buttonArray.forEach((button) => {
                buttonStyle(button, "#6066D0B2", "white", "#6066D0B2")
            })
        })
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
        float: right;
        position: relative;
        right: 14px;
        bottom: 20px;
        margin-bottom: -20px;
        text-align: center;`;
    resultButton.addEventListener("click", () => {
        resultButton.style.display = "none"
        showResultsPage();
    })
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

// button1.addEventListener("click", () => {
//     disableButtons();
//     if (correct === 0) {
//         button1.style.backgroundColor = "#60BF88";
//         score++;
//         createNextButton();
//     }
//     else {
//         button1.style.backgroundColor = "#EA8282";
//         buttonStyle(buttonArray[correct], "white", "#60BF88", "transparent");
//         createResultButton();
//     }
// });

// button2.addEventListener("click", () => {
//     disableButtons();
//     if (correct === 1) {
//         button2.style.backgroundColor = "#60BF88";
//         score++;
//         createNextButton();
//     }
//     else {
//         button2.style.backgroundColor = "#EA8282";
//         buttonStyle(buttonArray[correct], "white", "#60BF88", "transparent")
//         createResultButton();
//     }
// });

// button3.addEventListener("click", () => {
//     disableButtons();
//     if (correct === 2) {
//         button3.style.backgroundColor = "#60BF88";
//         score++;
//         createNextButton();
//     }
//     else {
//         button3.style.backgroundColor = "#EA8282";
//         buttonStyle(buttonArray[correct], "white", "#60BF88", "transparent")
//         createResultButton();
//     }
// });

// button4.addEventListener("click", () => {
//     disableButtons();
//     if (correct === 3) {
//         button4.style.backgroundColor = "#60BF88";
//         score++;
//         createNextButton();
//     }
//     else {
//         button4.style.backgroundColor = "#EA8282";
//         buttonStyle(buttonArray[correct], "white", "#60BF88", "transparent")
//         createResultButton();
//     }
// });