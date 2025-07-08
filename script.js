let headerID = document.querySelector(`#header-section`)
let userForm = document.querySelector(`#user-form`)
let gameNameInput = document.querySelector(`#gamename`)
let displayWelcMsg = document.querySelector(`#ai-cont`)
let questionsPopUp = document.querySelector(`#modal-overlay`)
let closedModalOverlay = document.querySelector(`#closeQns`)


userForm.addEventListener(`submit`, userMsgWelcome)
function userMsgWelcome(e){
    e.preventDefault()
    let userGameName = gameNameInput.value.trim()

    if(!gameNameInput.value.trim()){
        alert(`Please enter your name to start the game.`)
        gameNameInput.focus()
        return
    }else{
        headerID.innerHTML = `<h3>Welcome, ${userGameName}!</h3>`
        displayWelcMsg.innerHTML = `<p id="ai-greet">We have carefully picked these questions for you. We hope you enjoy the game. <span>Good luck, ${userGameName}!</span></p>
        <button id="start-game-btn">Start Quiz</button>`
        // Add the variable of the start btn here instead of adding from above >>>
        let startGameBtn = document.querySelector(`#start-game-btn`)

        startGameBtn.addEventListener(`click`, modalOverlayVisible)
        function modalOverlayVisible(){
            questionsPopUp.classList.remove(`modal-overlay`)
            questionsPopUp.classList.add(`modal-overlay-visible`)
            questionsPopUp.style.display = `flex`
        }
    }

    gameNameInput.value = ``
    gameNameInput.blur()
    userForm.reset()
}

gameNameInput.addEventListener(`focus`, clearData)
function clearData(){
    headerID.innerHTML = ``
    displayWelcMsg.innerHTML = ``
}
clearData()

closedModalOverlay.addEventListener(`click`, closeModal)
function closeModal(){
    if(questionsPopUp.classList.contains(`modal-overlay-visible`)){
        questionsPopUp.classList.remove(`modal-overlay-visible`)
        questionsPopUp.classList.add(`modal-overlay`)
        clearData()
    }
}
closeModal()