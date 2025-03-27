import { startGame, playTurn, placeShipUI } from "./game"

const bindEvents = () => {
    document.querySelector(".start-game").addEventListener("click", startGame)
    document.querySelector(".play-computer").addEventListener("click", startGame)
    const targetboards = document.querySelectorAll(".targetboard")
    for (const board of targetboards) {
        board.addEventListener("click", playTurn)
    }
    document.querySelector(".player1 .submit-btn").addEventListener("click", placeShipUI)
    document.querySelector(".player2 .submit-btn").addEventListener("click", placeShipUI)
    document.querySelector(".player1 #x-coordinate").addEventListener("change", resetError)
    document.querySelector(".player1 #y-coordinate").addEventListener("change", resetError)
    document.querySelector(".player2 #x-coordinate").addEventListener("change", resetError)
    document.querySelector(".player2 #y-coordinate").addEventListener("change", resetError)
}

const resetError = (e) => {
    const playerClass = e.target.parentElement.parentElement.parentElement.classList[0]
    document.querySelector(`.${playerClass} .error`).textContent = ""
}



export { bindEvents }