//Questions, choices and answers
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
            text: "Who knows?", correct: false
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

//DOM references
var domRefs = {
    timerEl: document.querySelector("#timeLeft"),
    containerEl: document.querySelector(".container"),
    welcomeEl: document.querySelector(".welcome"),
    quizEl: document.querySelector(".quiz"),
    questionEl: document.querySelector(".question"),
    buttonEl: document.querySelectorAll(".button"),
    messageEl: document.querySelector(".message"),
    scoreEl: document.querySelector(".score"),
    highscoreEl: document.querySelector(".highscore-table")
}

document.querySelector(".start-button").addEventListener("click", startGame)

document.querySelector(".answers").addEventListener("click", handleUserAnswer)

var time = 75;
var score = 0;
var active = false;
var timerId;
var correct = [];

var currentQuestionNumber = 0;
var currentQuestion;
var answers;

addListeners();
createScoreRows();

function startGame() {
    // hide welcome screen
    domRefs.welcomeEl.classList.add("hidden")
    // display quiz element
    domRefs.quizEl.classList.remove("hidden")
    active = true
    startRound();
    timerId = setInterval(clockTick, 1000)
}

function clockTick() {
    time--;
    domRefs.timerEl.textContent = time;
    if (time <= 0) {
        domRefs.timerEl.textContent = "";
        endGame();
    }
}

function startRound() {
    currentQuestion = questions[currentQuestionNumber]
    if (!currentQuestion) {
        endGame();
        return
    }
    answers = currentQuestion.choices
    renderCurrentQuestionData()
}

function handleUserAnswer(event) {
    var answerIndex = event.target.getAttribute("data-index")
    //handle correct answer
    if (answers[answerIndex].correct === true) {
        score += 20;
        renderMessage("correct")
    } else {
        //handle incorrect answer
        time -= 10;
        renderMessage("incorrect")
    }
    currentQuestionNumber++;
    startRound()
}

function renderCurrentQuestionData() {
    console.log(domRefs.buttonEl)
    domRefs.questionEl.innerHTML = currentQuestion.title

    for (var i = 0; i < answers.length; i++) {
        domRefs.buttonEl[i].innerHTML = answers[i].text
    }
}

// render a message "correct" or "wrong" based on user input

function renderMessage(message) {
    console.log(domRefs.messageEl)
    domRefs.messageEl.innerHTML = message
    setTimeout(unRenderMessage, 1000)
}

function unRenderMessage() {
    domRefs.messageEl.innerHTML = ""
}

function endGame() {
    // hide quiz element
    domRefs.quizEl.classList.add("hidden")
    // display score element
    domRefs.scoreEl.classList.remove("hidden")
    active = false
    clearInterval(timerId)
    document.querySelector(".finalscore").innerHTML = score
}

function loadHighscores() {
    var highscores = localStorage.getItem("highscores")
    if (!highscores) {
        highscores = []
    }
    else {
        highscores = JSON.parse(highscores)
    }
    return highscores
}

function createScoreRows() {
    var highscores = loadHighscores()
    var scorerows = []
    var tablebody = document.querySelector(".table-body")
    console.log(highscores)
    for (var i = 0; i < highscores.length; i++) {
        console.log(highscores[i])
        var scorerow = createScoreRow(highscores[i])
        tablebody.appendChild(scorerow)
    }
}

//creates the high-score table
function createScoreRow(highscore) {
    var scorerow = document.createElement("tr")
    var initialcell = document.createElement("td")
    initialcell.innerHTML = highscore.initials
    scorerow.appendChild(initialcell)
    var scorecell = document.createElement("td")
    scorecell.innerHTML = highscore.score
    scorerow.appendChild(scorecell)
    return scorerow
}

//stores the scores in local storage
function storeScore(initials) {
    var highscores = loadHighscores()
    var newscore = { initials, score }
    highscores.push(newscore)
    highscores = JSON.stringify(highscores)
    localStorage.setItem("highscores", highscores);
}

//clears the score name and value in the local storage
function clearScore() {
    localStorage.setItem("highscores", JSON.stringify([]));
}

//links view high scores to the stored values
function linkScores() {
    domRefs.welcomeEl.classList.add("hidden")
    domRefs.quizEl.classList.add("hidden")
    domRefs.scoreEl.classList.add("hidden")
    domRefs.highscoreEl.classList.remove("hidden")
    active = false
    createScoreRow()
}


function addListeners() {
    document.querySelector(".scorebutton").addEventListener("click", function (event) {
        var name = document.querySelector(".name").value
        storeScore(name)
    })
    document.querySelector(".clearbutton").addEventListener("click", clearScore)
    document.querySelector(".highscore-table").addEventListener("click", clearScore)
    document.querySelector(".highscore").addEventListener("click", linkScores)
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