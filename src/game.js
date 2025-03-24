import playerFactory from "./factories/player"
import { renderShips } from "./render"

const startGame = () => {
    const name1 = prompt("Please enter your name player 1") || "player1"
    const name2 = prompt("Please enter your name player 2") || "player2"

    const player1 = playerFactory(name1, false)
    const player2 = playerFactory(name2, false)

    document.querySelector(".player1 h3").textContent = name1
    document.querySelector(".player2 h3").textContent = name2

    document.querySelector(".player1").classList.toggle("hide")
    document.querySelector(".player2").classList.toggle("hide")

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

    for (let i = 0; i < ships.length; i++) {
        player1.gameboard.placeShip(ships[i].name, ships[i].size, 0, i)
        player2.gameboard.placeShip(ships[i].name, ships[i].size, 0, i)
    }

    renderShips(player1, true)
    renderShips(player2, false)

    document.querySelector(".turn").textContent = player1.name

    gameState.player1 = player1
    gameState.player2 = player2
    gameState.turn = player1.name
}

const gameState = {
    player1: null,
    player2: null,
    turn: null,
    winner: null,
}

const playTurn = (e) => {
    if (e.target.classList.contains("label")) return

    // div with class .player1 or .player2
    const playerContainer = e.target.parentElement.parentElement.parentElement.parentElement
    
    if (playerContainer.classList.contains(gameState.turn)) {
        const currentPlayer = playerContainer.classList[0]
        const targetPlayer = currentPlayer === "player1" ? gameState.player2 : gameState.player1
        console.log(playerContainer.classList)
        console.log(gameState[currentPlayer])
        console.log(e.target)

        const letterMap = {
            A: 1,
            B: 2,
            C: 3,
            D: 4,
            E: 5,
            F: 6,
            G: 7,
            H: 8,
            I: 9,
            J: 10,
        }
        const coordinates = e.target.classList[0].split("")
        const x = Number(letterMap[coordinates[0]])
        const y = Number(coordinates[1])
        const result = targetPlayer.gameboard.receiveAttack(x, y)

        // show result message? for either hit or miss
        // also show what type of ship was hit
        console.log(result)

        // update targetboard with hit/miss info
        // red = hit, white = miss, maybe should change bg color of game

        // update opposing player's gameboard with hit/miss info
        // red = hit, white = miss
    }
    
}

export { startGame, playTurn }