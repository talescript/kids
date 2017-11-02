// global variables, current question index, etc (ain't kosher)
let form, index, q, correct, wrong, total, remaining;
let formContainer;
let correctAnswers, wrongAnswers;
let userAnswers = [];
let hintLetter;

let questions = [
    'Which is the heavier metal of these two? Gold or Silver?',
    'Which is the most common non-contagious disease in the world?',
    'Which is the coldest location in the earth?',
    'Which is the hottest place in the earth?',
    'Which is the animal referred as the ship of the desert?',
    'Which is the nearest star to planet earth?'
]

let answers = [
    'gold',
    'Tooth Decay',
    'East Antarctica',
    'Ethiopia',
    'Camel',
    'Sun'
]

window.onload = init; // where is this called?

function init() {
    // show how many questions remain
    remaining = document.querySelector(".remaining");
    remaining.innerHTML = (index + 1) + "/" + questions.length;
    alert("code is not being run");

    q = document.querySelector(".question");
    
    // not needed nor used in the function
    // userInput = document.querySelector(".answer").value;

    // answer table
    correct = document.querySelector("td.correct");
    wrong = document.querySelector("td.wrong");
    total = document.querySelector("td.total");

    // Declare the form submit listener:
    // queryInput will be called on submission
    form = document.querySelector("#myForm");
    formContainer = document.querySelector(".form");

    index = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    hintLetter = 0;

    // display questions whose index is index
    displayQuestion(index);
    form.addEventListener("submit", queryInput);
}

function displayQuestion(index) {
    q.textContent = questions[index];
    
    q.animate([
        {opacity: '0'},
        {opacity: '1'}
    ], 
    {
        duration: 1500
    });

    remaining.innerHTML = (index + 1) + "/" + questions.length;
}

function isAnswerCorrect(answer){
    // Compare both in lowercases, not only the correct answer
    return (answer.toLowerCase() === answers[index].toLowerCase());
}

function queryInput(evt) {
    // Get user's input
    let userInput = document.querySelector(".answer").value;
    let hint = document.querySelector(".hint");

    // do not reload the page on submit, prevent browser's default behaviour
    evt.preventDefault();

    console.log("Input: " + userInput);

    // Check if the answer is correct
    if (isAnswerCorrect(userInput)){
        console.log("correct answer")
        userAnswers.push(userInput);
        correctAnswers++;
        hintLetter = 0;
        hint.textContent = "";

        // if there is a next question, let's display it
        if (index < questions.length - 1){
            index++ //next question
            displayQuestion(index);
        } else {
            console.log("Last question, do something. maybe restart");
            removeQuestions();

            createElement('h3', "Your answers:")
            
            // show answers entered
            document.querySelector(".form").appendChild(addElement("ol"));
            
            createElement('BUTTON', "Play again")

            let btn = document.querySelector("button")
            btn.addEventListener("click", function(){
                location.reload();
            });

            formContainer.animate([
                {opacity: '0'},
                {opacity: '1'}
            ], 
            {
                duration: 2000
            });

        }
    } else {
        console.log("Wrong answer, try again");
        hint.textContent += answers[index][hintLetter];
        hint.animate([
            {opacity: '0'},
            {opacity: '1'}
        ], 
        {
            duration: 1500
        });
        hintLetter++;
        // empty the form input
        wrongAnswers++;
        userAnswers.push(userInput);
    };

    // update display of correct answers, wrong answers and total
    correct.textContent = correctAnswers;
    wrong.textContent = wrongAnswers;
    total.textContent = (((correctAnswers - wrongAnswers) / 
                           questions.length) * 100).toFixed(2) + "%" ;
    console.log(userAnswers);

    // empty the form input fields;
    form.reset();
}

function removeQuestions() {
    
    //formContainer = document.querySelector(".form");
    nested = document.querySelector(".nest");
    formContainer.removeChild(nested);
}

function addElement(typeOfElement) {
    let createList = document.createElement(typeOfElement);

    for (let i = 0; i < userAnswers.length; i++) {
        let listItem = document.createElement('li');
        listItem.appendChild(document.createTextNode(userAnswers[i]));
        createList.appendChild(listItem);
    }
    return createList;
}

// Create heading
function createElement(element, text) {
    let el = document.createElement(element);
    let content = document.createTextNode(text);
    el.appendChild(content);
    return formContainer.appendChild(el);
}