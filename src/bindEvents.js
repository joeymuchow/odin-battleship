import { startGame } from "./game"

const bindEvents = () => {
    document.querySelector(".start-game").addEventListener("click", startGame)
}



export { bindEvents }