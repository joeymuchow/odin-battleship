import { startGame, playTurn } from "./game"

const bindEvents = () => {
    document.querySelector(".start-game").addEventListener("click", startGame)
    document.querySelector(".play-computer").addEventListener("click", startGame)
    const targetboards = document.querySelectorAll(".targetboard")
    for (const board of targetboards) {
        board.addEventListener("click", playTurn)
    }
}



export { bindEvents }