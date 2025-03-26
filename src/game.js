import playerFactory from "./factories/player"
import { renderShips, renderShot, renderResultMessage, clearGrids } from "./render"

const startGame = (e) => {
    clearGrids()
    document.querySelector(".message").textContent = ""
    gameState.winner = null
    const vsComputer = e.target.classList.contains("play-computer")
    const name1 = prompt("Please enter your name player 1") || "Player1"
    let name2 = "Computer";
    if (!vsComputer) {
        name2 = prompt("Please enter your name player 2") || "Player2"
    }

    const player1 = playerFactory(name1, false)
    const player2 = playerFactory(name2, vsComputer)

    document.querySelector(".player1 h3").textContent = name1
    document.querySelector(".player2 h3").textContent = name2

    document.querySelector(".player1").classList.remove("hide")
    document.querySelector(".player2").classList.remove("hide")
    document.querySelector(".start-game").classList.add("hide")
    document.querySelector(".play-computer").classList.add("hide")

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
        const x = Number(letterMap[uiCoordinate.slice(0,1)])
        const y = Number(uiCoordinate.slice(1)) - 1
        // result has hit or miss and ship that was hit's name
        const result = targetPlayer.gameboard.receiveAttack(x, y)

        const isPlayer1 = currentPlayer === "player1"
        // update targetboard with hit/miss info
        renderShot(uiCoordinate, isPlayer1, "targetboard", result.result)

        // update opposing player's gameboard with hit/miss info
        renderShot(uiCoordinate, !isPlayer1, "gameboard", result.result)

        if (targetPlayer.gameboard.allShipsSunk()) {
            document.querySelector(".start-game").classList.remove("hide")
            document.querySelector(".play-computer").classList.remove("hide")
            gameState.winner = shootingPlayer.name
        } else {
            // change turn
            gameState.turn = currentPlayer === "player1" ? "player2" : "player1"
            document.querySelector(".turn").textContent = targetPlayer.name
            if (targetPlayer.isComputer) {
                setTimeout(() => {
                    computerTurn()
                }, 2000)
            }
        }

        renderResultMessage(shootingPlayer.name, targetPlayer.name, result, gameState.winner)
    }

    const computerTurn = () => {
        const player = gameState.player1
        const computer = gameState.player2

        const letterArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]

        // generate shot coordinates
        const { x, y } = createShotCoordinates(player.gameboard.shots)
        const uiCoordinate = letterArray[x] + (y + 1)

        const result = player.gameboard.receiveAttack(x, y)

        // update targetboard with hit/miss info
        renderShot(uiCoordinate, false, "targetboard", result.result)

        // update opposing player's gameboard with hit/miss info
        renderShot(uiCoordinate, true, "gameboard", result.result)

        if (player.gameboard.allShipsSunk()) {
            document.querySelector(".start-game").classList.remove("hide")
            document.querySelector(".play-computer").classList.remove("hide")
            gameState.winner = computer.name
        } else {
            // change turn back to player
            gameState.turn = "player1"
            document.querySelector(".turn").textContent = player.name
        }

        renderResultMessage(computer.name, player.name, result, gameState.winner)
    }

    const createShotCoordinates = (shots) => {
        const shot = {x: null, y: null}
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const duplicateShotHit = shots.hits.findIndex((element) => element.x === j && element.y === i)
                const duplicateShotMiss = shots.misses.findIndex((element) => element.x === j && element.y === i)

                if (duplicateShotHit < 0 && duplicateShotMiss < 0) {
                    shot.x = j
                    shot.y = i
                    return shot
                }
            }
        }
    }
    
}

export { startGame, playTurn }