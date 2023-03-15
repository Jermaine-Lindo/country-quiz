const question = document.getElementById("question");
const button1 = document.getElementById("answer-1");
const button2 = document.getElementById("answer-2");
const button3 = document.getElementById("answer-3");
const button4 = document.getElementById("answer-4");
const answer1 = document.getElementById("answer-1-text");
const answer2 = document.getElementById("answer-2-text");
const answer3 = document.getElementById("answer-3-text");
const answer4 = document.getElementById("answer-4-text");
const container = document.getElementById("card");
let countryName1 = "";
let correctCity = "";
let wrongCity1 = "";
let wrongCity2 = "";
let wrongCity3 = "";
let country;
let correct;
let score = 0;

function padCode(number){
    number = number.toString();
    while (number.length < 3)
        number = "0" + number;
        return number
}

function getCode() {
    let code = Math.floor(Math.random() * (894 - 4 + 1)) + 4;
    code = code - (code % 2); // Most numeric-3 codes are even
    // Some countries do not have capital cities
    if (code == 334)
        return 340;
    else if (code == 10)
        return 12;
    else if (code == 74)
        return 76;
    else if (code == 446)
        return 450;
    else
        return code;
}

async function fetchCountry(){
    let response;
    do{
    let code;
    code = padCode(getCode());
    console.log(code);
    let finalURL = `https://restcountries.com/v3.1/alpha/${code}`;
    response = await fetch(finalURL);
    } while(!response.ok);
    country = await response.json();
    console.log(country)
}

window.addEventListener("load", async () => {
        await fetchCountry();
        console.log(country);
        countryName = country[0].name.common;
        console.log(countryName);
        correctCity = country[0].capital[0];
        console.log(correctCity);
        await fetchCountry();
        console.log(country);
        wrongCity1 = country[0].capital[0];
        console.log(wrongCity1);
        await fetchCountry();
        console.log(country);
        wrongCity2 = country[0].capital[0];
        console.log(wrongCity2);
        await fetchCountry();
        console.log(country);
        wrongCity3 = country[0].capital[0];
        console.log(wrongCity3);
        question.innerHTML = `What is the capital city of ${countryName}?`
        let answer = Math.random();
        if (answer < 0.25){
            answer1.innerHTML = `${correctCity}`;
            correct = 1;
            answer2.innerHTML = `${wrongCity1}`;
            answer3.innerHTML = `${wrongCity2}`;
            answer4.innerHTML = `${wrongCity3}`;
        }
        else if (answer < 0.50){
            answer1.innerHTML = `${wrongCity1}`;
            answer2.innerHTML = `${correctCity}`;
            correct = 2;
            answer3.innerHTML = `${wrongCity2}`;
            answer4.innerHTML = `${wrongCity3}`;
        }
        else if (answer < 0.75){
            answer1.innerHTML = `${wrongCity1}`;
            answer2.innerHTML = `${wrongCity2}`;
            answer3.innerHTML = `${correctCity}`;
            correct = 3;
            answer4.innerHTML = `${wrongCity3}`;
        }
        else{
            answer1.innerHTML = `${wrongCity1}`;
            answer2.innerHTML = `${wrongCity2}`;
            answer3.innerHTML = `${wrongCity3}`;
            answer4.innerHTML = `${correctCity}`;
            correct = 4;
        }
    });

function disableButtons(){
    button1.disabled = true;
    button2.disabled = true;
    button3.disabled = true;
    button4.disabled = true;
}

function createNextButton(){
    const nextButton = document.createElement("button");
    container.appendChild(nextButton);
    nextButton.style.width = "116px"
    nextButton.style.float = "right";
    nextButton.style.position = "relative";
    nextButton.style.right = "14px";
    nextButton.style.bottom = "20px";
    nextButton.style.marginBottom = "-20px";
    nextButton.innerHTML = "Next";
    nextButton.style.textAlign = "center";
}

function showResultsPage(){
    const answers = document.getElementsByClassName("answer");
    question.remove();
    while (answers.length > 0){
        answers[0].remove();
    }
    const image = document.getElementsByTagName("img")[0];
    image.src = "./images/undraw_winners_ao2o 2.svg";
    image.style.left = "0";
    image.style.bottom = "0";
    image.style.marginBottom = "30px"
    const results = document.createElement("h2");
    results.innerHTML = "Results";
    results.style.textAlign = "center";
    results.style.color = "#1D355D";
    results.style.fontFamily = "Poppins";
    results.style.fontSize = "48px";
    results.style.fontWeight = "700";
    container.appendChild(results)
    const scoreText = document.createElement("p");
    scoreText.innerHTML = "You got" + " <span>" + score +"</span>" + " correct answers";
    scoreText.style.textAlign = "center";
    scoreText.style.fontSize = "24px";
    scoreText.style.fontWeight = "400";
    container.appendChild(scoreText);
    const retryButton = document.createElement("button");
    retryButton.innerHTML = "Try again";
    retryButton.style.width = "200px";
    retryButton.style.color = "#1D355D";
    retryButton.style.borderColor = "#1D355D";
    retryButton.style.textAlign = "center";
    container.appendChild(retryButton);
}

button1.addEventListener("click", () => {
    disableButtons();
    button1.style.color = "white";
    if (correct == 1){
        button1.style.backgroundColor = "#60BF88";
        score++;
        createNextButton();
    }
    else{
        button1.style.backgroundColor = "#EA8282";
        showResultsPage();
    }
});

button2.addEventListener("click", () => {
    disableButtons();
    button2.style.color = "white";
    if (correct == 2){
        button2.style.backgroundColor = "#60BF88";
        score++;
        createNextButton();
    }
    else{
        button2.style.backgroundColor = "#EA8282";
    }
});

button3.addEventListener("click", () => {
    disableButtons();
    button3.style.color = "white";
    if (correct == 3){
        button3.style.backgroundColor = "#60BF88";
        score++;
        createNextButton();
    }
    else{
        button3.style.backgroundColor = "#EA8282";
    }
});

button4.addEventListener("click", () => {
    disableButtons();
    button4.style.color = "white";
    if (correct == 4){
        button4.style.backgroundColor = "#60BF88";
        score++;
        createNextButton();
    }
    else{
        button4.style.backgroundColor = "#EA8282";
    }
});