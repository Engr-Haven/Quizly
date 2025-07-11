let headerID = document.querySelector(`#header-section`)
let userForm = document.querySelector(`#user-form`)
let gameNameInput = document.querySelector(`#gamename`)
let displayWelcMsg = document.querySelector(`#ai-cont`)
let questionsPopUp = document.querySelector(`#modal-overlay`)
let closedModalOverlay = document.querySelector(`#closeQns`)
let containerQnsAns = document.querySelector(`#ques-ans-div`)
let questionsDiv = document.querySelector(`#question-container`)
let answersDiv = document.querySelector(`#answers-container`)
let nextBtn = document.querySelector(`#next-btn`)
let resultDiv = document.querySelector(`#result-cont`)
let finalScoreDiv = document.querySelector(`#final-score`)
let msgScoreDiv = document.querySelector(`#msg-score`)


userForm.addEventListener(`submit`, userMsgWelcome)
function userMsgWelcome(e) {
  e.preventDefault()
  let userGameName = gameNameInput.value.trim()

  if (!gameNameInput.value.trim()) {
    alert(`Please enter your name to start the game.`)
    gameNameInput.focus()
    return
  } else {
    headerID.innerHTML = `<h3>Welcome, ${userGameName}!</h3>`
    displayWelcMsg.innerHTML = `<p id="ai-greet">We have carefully picked these questions for you. We hope you enjoy the game. <span>Good luck, ${userGameName}!</span></p>
        <button id="start-game-btn">Start Quiz</button>`
    // Add the variable of the start btn here instead of adding from above >>>
    let startGameBtn = document.querySelector(`#start-game-btn`)

    startGameBtn.addEventListener(`click`, modalOverlayVisible)
    function modalOverlayVisible() {
      questionsPopUp.classList.remove(`modal-overlay`)
      questionsPopUp.classList.add(`modal-overlay-visible`)
      questionsPopUp.style.display = `flex`

      // Reset quiz state and shuffle questions
      currentQuestionIndex = 0
      myScore = 0
      selectedRandomQns()
      questionsDiv.innerHTML = ``
      answersDiv.innerHTML = ``
      resultDiv.innerHTML = ``
      finalScoreDiv.innerHTML = ``
      msgScoreDiv.innerHTML = ``
      loadQuestion()
    }
  }

  gameNameInput.value = ``
  gameNameInput.blur()
  userForm.reset()
}

gameNameInput.addEventListener(`focus`, clearData)
function clearData() {
  headerID.innerHTML = ``
  displayWelcMsg.innerHTML = ``
}
clearData()

closedModalOverlay.addEventListener(`click`, closeModal)
function closeModal() {
  if (questionsPopUp.classList.contains(`modal-overlay-visible`)) {
    questionsPopUp.classList.remove(`modal-overlay-visible`)
    questionsPopUp.classList.add(`modal-overlay`)
    clearData()
  }
}
closeModal()

// Questions goes here >>>

const quizQuestionsData = [
  {
    question: `Which was the only African nation to successfully resist European colonization during the "Scramble for Africa"?`,
    options: [`Ghana`, `Sudan`, `Ethiopia`, `Kenya`],
    correctAnswer: 2
  },
  {
    question: `In which city are the headquarters of the African Union located?`,
    options: [`Johannesburg`, `Addis Ababa`, `Nairobi`, `Lagos`],
    correctAnswer: 1
  },
  {
    question: `Which African country is known as the "Rainbow Nation" due to its diverse cultures and languages?`,
    options: [`Nigeria`, `South Africa`, `Kenya`, `Ghana`],
    correctAnswer: 1
  },
  {
    question: `What ancient civilization created the 365-day calendar and the 24-hour day?`,
    options: [
      `Ancient Egypt`,
      `Ancient Ethiopia`,
      `Ancient Greece`,
      `Ancient Persia`
    ],
    correctAnswer: 0
  },
  {
    question: `What is the name of the language family that includes Swahili, Zulu, and Yoruba?`,
    options: [`Afro-Asiatic`, `Brazilian-Africana`, `Khoisan`, `Niger-Congo`],
    correctAnswer: 3
  },
  {
    question: `Solve the Equation: 5 x (10 + 2)`,
    options: [`52`, `62`, `60`, `70`],
    correctAnswer: 2
  },
  {
    question: `4x - 4 = 2(x + 4). Find the value of x`,
    options: [`x = 4`, `x = 2`, `x = 6`, `x = 8`],
    correctAnswer: 2
  },
  {
    question: `I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?`,
    options: [`A Shadow`, `A Whisper`, `An Echo`, `A Breeze`],
    correctAnswer: 2
  },
  {
    question: `What is seen in the middle of March and April that cannot be seen at the beginning or end of either month?`,
    options: [
      `The letter 'R'`,
      `The letter 'A'`,
      `The letter 'C'`,
      `The letter 'M'`
    ],
    correctAnswer: 0
  },
  {
    question: `The more you take, the more you leave behind. What am I?`,
    options: [`Memories`, `Footsteps`, `Time`, `Breath`],
    correctAnswer: 1
  },
  {
    question: `What can travel all around the world while staying in a corner?`,
    options: [`A Coin`, `A Map`, `A Phone`, `A Stamp`],
    correctAnswer: 3
  },
  {
    question: `What has an eye, but cannot see?`,
    options: [`A Cyclops`, `A GPS`, `A Needle`, `A Nail`],
    correctAnswer: 2
  }
]

let currentQuestionIndex = 0
let myScore = 0
let totalQuestions = quizQuestionsData.length

// function to pick Questions at random >>>
function selectedRandomQns() {
  for (let i = quizQuestionsData.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [quizQuestionsData[i], quizQuestionsData[j]] = [
      quizQuestionsData[j],
      quizQuestionsData[i]
    ]
  }
}

function loadQuestion() {
  // Clear previous question and answers
  questionsDiv.innerHTML = ``
  answersDiv.innerHTML = ``

  let currentQuestion = quizQuestionsData[currentQuestionIndex]
  let questionElement = document.createElement(`h1`)
  questionElement.textContent = currentQuestion.question
  questionsDiv.appendChild(questionElement)

  currentQuestion.options.forEach((option, index) => {
    let answerElement = document.createElement(`button`)
    answerElement.textContent = option
    answerElement.classList.add(`answer-btn`)
    answerElement.setAttribute(`data-index`, index)
    answersDiv.appendChild(answerElement)

    answerElement.addEventListener(`click`, checkAnswer)
  })
  nextBtn.style.display = `none`
}

function checkAnswer(event) {
  let selectedAnswerIndex = parseInt(event.target.getAttribute(`data-index`))
  let currentQuestion = quizQuestionsData[currentQuestionIndex]

  if (selectedAnswerIndex === currentQuestion.correctAnswer) {
    myScore++
    event.target.style.backgroundColor = `#3a984e`
    event.target.style.color = `white`
    event.target.style.border = `none`
  } else {
    event.target.style.backgroundColor = `#983a3a`
    event.target.style.color = `white`
    event.target.style.border = `none`
  }

  // Disable all buttons after selection
  let answerButtons = document.querySelectorAll(`.answer-btn`)
  answerButtons.forEach((button) => {
    button.disabled = true
    button.classList.add(`disabled-btn`)
    button.style.cursor = `not-allowed`
    button.style.pointerEvents = `none`
    button.style.opacity = `0.6`
    button.style.transition = `instant`
    button.style.border = `none`
  })

  nextBtn.style.display = `block`
}

nextBtn.addEventListener(`click`, nextQuestion)
function nextQuestion() {
  currentQuestionIndex++
  if (currentQuestionIndex < totalQuestions) {
    questionsDiv.innerHTML = ``
    answersDiv.innerHTML = ``
    loadQuestion()
  } else {
    showResults()
  }
}

function showResults() {
  questionsDiv.innerHTML = ``
  answersDiv.innerHTML = ``
  resultDiv.innerHTML = `<h2>Quiz Game Completed!</h2>`
  let finalScoreHeading = document.createElement(`h1`)
  finalScoreHeading.textContent = `Your score is ${myScore} out of ${totalQuestions}`

  //Append here >>>
  finalScoreDiv.append(finalScoreHeading)
  resultDiv.append(finalScoreDiv)

  if (myScore === totalQuestions) {
    msgScoreDiv.innerHTML = `<p>Congratulations! You sabi book wella!</p>`
    resultDiv.append(msgScoreDiv)
  } else if (myScore >= totalQuestions / 2) {
    msgScoreDiv.innerHTML = `<p>You try! Next time you fit do better.</p>`
    resultDiv.append(msgScoreDiv)
  } else {
    msgScoreDiv.innerHTML = `<p>Haba! Why nah?</p>`
    resultDiv.append(msgScoreDiv)
  }

  // Hide the next button after showing results
  nextBtn.style.display = `none`

  //This btn helps to take quiz again after showing results >>>
  let reloadBtn = document.createElement(`button`)
  reloadBtn.setAttribute(`id`, `reload-btn`)
  reloadBtn.setAttribute(`class`, `reload-btn`)
  reloadBtn.textContent = `Take Quiz Again`

  reloadBtn.addEventListener(`click`, () => {
    location.reload() //This helps to reload the whole quiz app and reset the game
  })

  //Append here >>>
  resultDiv.append(reloadBtn)
}
