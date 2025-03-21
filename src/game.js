import playerFactory from "./factories/player"
import { renderShips } from "./render"

const startGame = () => {
    const name1 = prompt("Please enter your name player 1") || "Player1"
    const name2 = prompt("Please enter your name player 2") || "Player2"

    const ships = [
        {
            name: "Carrier",
            size: 5,
        },
        {
            name: "Battleship",
            size: 4,
        },
        {
            name: "Destroyer",
            size: 3,
        },
        {
            name: "Submarine",
            size: 3,
        },
        {
            name: "Patrol Boat",
            size: 2,
        },
    ]

    const player1 = playerFactory(name1, false)
    const player2 = playerFactory(name2, false)

    document.querySelector(".player1 h3").textContent = name1
    document.querySelector(".player2 h3").textContent = name2

    document.querySelector(".player1").classList.toggle("hide")
    document.querySelector(".player2").classList.toggle("hide")

    for (let i = 0; i < ships.length; i++) {
        player1.gameboard.placeShip(ships[i].name, ships[i].size, 0, i)
        player2.gameboard.placeShip(ships[i].name, ships[i].size, 0, i)
    }

    renderShips(player1, true)
    renderShips(player2, false)

}

export { startGame }