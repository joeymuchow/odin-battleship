import playerFactory from "./factories/player"
import { renderShips, renderShot, renderResultMessage } from "./render"

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
    gameState.turn = "player1"
}

const gameState = {
    player1: null,
    player2: null,
    turn: null,
    winner: null,
}

const playTurn = (e) => {
    if (gameState.winner) return
    if (e.target.classList.contains("label")) return
    // if target has marker already, that space is invalid to guess again
    if (e.target.classList.contains("marker")) return
    if (e.target.children.length !== 0) return

    // div with class .player1 or .player2
    const playerContainer = e.target.parentElement.parentElement.parentElement.parentElement
    
    if (playerContainer.classList.contains(gameState.turn)) {
        const currentPlayer = playerContainer.classList[0]
        const shootingPlayer = currentPlayer === "player1" ? gameState.player1 : gameState.player2
        const targetPlayer = currentPlayer === "player1" ? gameState.player2 : gameState.player1

        const letterMap = {
            A: 0,
            B: 1,
            C: 2,
            D: 3,
            E: 4,
            F: 5,
            G: 6,
            H: 7,
            I: 8,
            J: 9,
        }
        const uiCoordinate = e.target.classList[0]
        const coordinates = uiCoordinate.split("")
        const x = Number(letterMap[coordinates[0]])
        const y = Number(coordinates[1]) - 1
        // TODO: need to know that a ship has sunk
        // result has hit or miss and ship that was hit's name
        const result = targetPlayer.gameboard.receiveAttack(x, y)

        renderResultMessage(shootingPlayer.name, targetPlayer.name, result)

        const isPlayer1 = currentPlayer === "player1"
        // update targetboard with hit/miss info
        renderShot(uiCoordinate, isPlayer1, "targetboard", result.result)

        // update opposing player's gameboard with hit/miss info
        renderShot(uiCoordinate, !isPlayer1, "gameboard", result.result)

        // change turn
        gameState.turn = currentPlayer === "player1" ? "player2" : "player1"
        document.querySelector(".turn").textContent = targetPlayer.name
    }
    
}

export { startGame, playTurn }