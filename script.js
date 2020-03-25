//questions, choices and answers
var questions = [{
    title: "What color is an egplant?",
    choices: [
        {
            text: "yellow", correct: false
        },
        {
            text: "purple", correct: true
        },
        {
            text: "blue", correct: false
        },
        {
            text: "red", correct: false
        },
    ]
},
{
    title: "What is the smallest type of tomato?",
    choices: ["heirloom( )", "grape( )", "roma( )", "cherry( )"],
    answer: "cherry( )"
},
{
    title: "Which of these fruits has seeds on the outside?",
    choices: ["strawberry( )", "banana( )", "kiwi( )", "melon"],
    answer: "strawberry( )"
},
{
    title: "Which of these is a berry?",
    choices: ["nectarine( )", "papaya( )", "huckle( )", "mango( )"],
    answer: "splice( )"
},
{
    title: "What time of the year should you plant a garden?",
    choices: ["spring( )", "fall( )", " winter( )", "summer( )"],
    answer: "spring( )"
}
]

//start the countdown timer once user clicks 'start' button

//loop through the questions

//store scores on local storage

//deduct 10 seconds from timer if user chooses incorrect answer

//increase score by 20 points if user chooses correct answer

//clear the score if user selects 'clear score'

var timerEl = document.querySelector(".timer")
var containerEl = document.querySelector(".container")
var quizEl = document.querySelector(".quiz")
var questionEl = document.querySelector(".question")
var buttonEl = document.querySelectorAll(".button")
console.log(buttonEl)

var timer = 75
var score = 0
var active = false

var currentQuestionNumber = 0
var currentQuestion
var answers

function game () {
    if (!active) {
        // end game
        return
    }
    currentQuestion = questions[currentQuestion]
    answers = currentQuestion.choices

    questionEl.innerHTML = currentQuestion.title

    for(var i = 0; i < answers.length; i++){
        buttonEl[i].innerHTML = answers[i].text
    }
}

function handleClick (event){
    var answerIndex = event.target.getAttribute("data-index")
    if (answers [answerIndex].correct === true) {
        //handle correct answer
    } else {
        //handle incorrect answer
    }
    currentQuestionNumber++
    game()
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
 * var answer index = event.target.data-set["index"] - look up how to access via w3schools
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