import { setupGame, playTurn, placeShipUI, changeTurn } from "./game"

const bindEvents = () => {
    document.querySelector(".play-game").addEventListener("click", setupGame)
    document.querySelector(".play-computer").addEventListener("click", setupGame)
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
    document.querySelector(".start-turn").addEventListener("click", changeTurn)
}

const resetError = (e) => {
    const playerClass = e.target.parentElement.parentElement.parentElement.classList[0]
    document.querySelector(`.${playerClass} .error`).textContent = ""
}

export { bindEvents }