import { startGame, playTurn } from "./game"

const bindEvents = () => {
    document.querySelector(".start-game").addEventListener("click", startGame)
    document.querySelector(".targetboard").addEventListener("click", playTurn)
}



export { bindEvents }