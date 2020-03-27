//questions, choices and answers
var questions = [{
    title: "What did the Buddhist say to the hot dog vendor?",
    choices: [
        {
            text: "I can't eat that!", correct: false
        },
        {
            text: "Make me one with everything.", correct: true
        },
        {
            text: "Is that vegetarian?", correct: false
        },
        {
            text: "Why is it called that?", correct: false
        },
    ]
},
{
    title: "Where does the General keep his armies?",
    choices: [
        {
            text: "His back pocket.", correct: false
        }, 
        {   
            text: "Who knows?", correct:false
        },
        {
            text: "On base.", correct: false
        },
        {
            text: "In his sleevies!", correct: true
        },
    ]
},
{
    title: "What does a pepper do when it’s angry?",
    choices: [
        {
            text: "It gets jalapeño face!", correct: true
        },
        {
            text: "Increases capsaicin.", correct: false
        },
        {
            text: "Acts seedy.", correct: false
        },
        {
            text: "Gets hot.", correct: false
        },
    ]
},
{
    title: "Why can’t you hear a pterodactyl go to the bathroom?",
    choices: [
        {
            text: "Because they're extinct.", correct: false
        },
        {
            text: "Because fossils don't move.", correct: false
        },
        {
            text: "Because the “P” is silent!", correct: true
        },
        {
            text: "Because science.", correct: false
        },
    ]
},
{
    title: "How does NASA organize a party?",
    choices: [
        {
            text: "They planet.", correct: true
        },
        {
            text: "Aliens (wee-woo).", correct: false
        },
        {
            text: "Outer space bruh.", correct: false
        },
        {
            text: "An event planner.", correct: false
        }
    ]
    
},
]

//start the countdown timer once user clicks 'start' button

//loop through the questions

//store scores on local storage

//deduct 10 seconds from timer if user chooses incorrect answer

//increase score by 20 points if user chooses correct answer

//clear the score if user selects 'clear score'

var domRefs = { 
     timerEl : document.querySelector(".timer"),
     containerEl : document.querySelector(".container"),
     welcomeEl : document.querySelector(".welcome"),
     quizEl : document.querySelector(".quiz"),
     questionEl : document.querySelector(".question"),
     buttonEl : document.querySelectorAll(".button"),
     messageEl : document.querySelectorAll(".message"),
}

document.querySelector(".start-button").addEventListener("click", startGame)

document.querySelector(".answers").addEventListener("click", handleUserAnswer)

var timer = 75
var score = 0
var active = false

var currentQuestionNumber = 0
var currentQuestion
var answers

function startGame () {
    // hide welcome screen
    domRefs.welcomeEl.classList.add("hidden")
    // display quiz element
    domRefs.quizEl.classList.remove("hidden")
    active = true
    startRound()
}

function startRound () {
    renderMessage("Neato!")
    if (!active) {
        console.log("endGame")
        // end game
        return
    }
    currentQuestion = questions[currentQuestionNumber]
    answers = currentQuestion.choices
    renderCurrentQuestionData()
}

function handleUserAnswer (event){
    var answerIndex = event.target.getAttribute("data-index")
    if (answers [answerIndex].correct === true) {
        //handle correct answer
    } else {
        //handle incorrect answer
    }
    currentQuestionNumber++
    startRound()
}

function renderCurrentQuestionData (){
    console.log(domRefs.buttonEl)
    domRefs.questionEl.innerHTML = currentQuestion.title

    for(var i = 0; i < answers.length; i++){
        domRefs.buttonEl[i].innerHTML = answers[i].text
    }
}

// render a message "correct" or "wrong" based on user input
// needs to unmount after 2 seconds

function renderMessage (message){
    console.log(domRefs.messageEl)
    domRefs.messageEl.innerHTML = message
    // setTimeout(unRenderMessage,2000)
}

function unRenderMessage (){
    domRefs.messageEl.innerHTML = ""
}

/**
 * On-page load
 * Render description
 * Render start button
 * Add event listener to answers container
 *
 * When user clicks start:
 * Start timer function
 * Start game by active = true
 * Hide container element
 * Reveal quiz element
 * Call game function
 *
 * Game loop:
 * If active
 * If current question is valid
 * If (questions [current question number]!== undefined)
 * Display current question
 * questionEl.innerHTML = questions[current question number].title
 * Render answer buttons
 * var current answers = questions[current question number].choices
 * Iterate through current answers
 * (for loop)
 * buttonEl[i].innerHTML = current answers[i]
 * If question invalid, end game
 *
 * When user clicks answer:
 * var answer index = event.target.dataset["index"] - look up how to access via w3schools
 * If current answers[answer index].correct === true
 * Correct- add 20 points
 * Else
 * Incorrect- deduct 10 seconds from timer
 * Increment current question number ++
 * Move to next question
 * Call game function
 *
 * End game:
 * Stop timer
 * Display score
 * Prompt to enter initials to store score in local storage
 *
 * Timer:
 * Reduce timer variable by 1 if true
 * Use boolean to determine if false or true
 */