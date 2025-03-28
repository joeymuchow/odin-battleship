import playerFactory from "./factories/player"
import { renderShips, renderShot, renderResultMessage, clearGrids } from "./render"

const setupGame = (e) => {
    clearGrids()
    document.querySelector(".message").textContent = ""
    gameState.winner = null
    document.querySelector(".player1 .targetboard").classList.add("hide")
    document.querySelector(".player1 .target-label").classList.add("hide")
    document.querySelector(".player2 .targetboard").classList.add("hide")
    document.querySelector(".player2 .target-label").classList.add("hide")
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

    document.querySelector(".play-game").classList.add("hide")
    document.querySelector(".play-computer").classList.add("hide")

    document.querySelector(".turn").textContent = player1.name

    document.querySelector(".player1").classList.remove("hide")
    document.querySelector(".player1 .place-ship-form").classList.remove("hide")

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

    player1.shipsToAdd = [...ships]
    player2.shipsToAdd = [...ships]

    gameState.player1 = player1
    gameState.player2 = player2
    gameState.turn = "player1"

    document.querySelector(".message").textContent = `${gameState.player1.name}, please place your ships`
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
            document.querySelector(".play-game").classList.remove("hide")
            document.querySelector(".play-computer").classList.remove("hide")
            gameState.winner = shootingPlayer.name
        } else {
            // change turn
            gameState.turn = currentPlayer === "player1" ? "player2" : "player1"
            document.querySelector(".turn").textContent = targetPlayer.name
            if (targetPlayer.isComputer) {
                setTimeout(() => {
                    computerTurn()
                }, 3000)
            } else {
                setTimeout(() => {
                    document.querySelector(".change-turn-modal .turn-message").textContent = `It is ${gameState[gameState.turn].name}'s turn. When you are ready ${gameState[gameState.turn].name}, click 'Start turn'`
                    document.querySelector(".change-turn-modal").showModal()
                }, 1000)
            }
        }

        renderResultMessage(shootingPlayer.name, targetPlayer.name, result, gameState.winner)
    }
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
        document.querySelector(".play-game").classList.remove("hide")
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
    const shot = { x: null, y: null }

    while(shot.x === null) {
        const randomX = Math.floor(Math.random() * 10)
        const randomY = Math.floor(Math.random() * 10)
        const duplicateShotHit = shots.hits.findIndex((element) => element.x === randomX && element.y === randomY)
        const duplicateShotMiss = shots.misses.findIndex((element) => element.x === randomX && element.y === randomY)

        if (duplicateShotHit < 0 && duplicateShotMiss < 0) {
            shot.x = randomX
            shot.y = randomY
        }
    }

    return shot      
}

const placeShipUI = (e) => {
    e.preventDefault()
    document.querySelector(".turn-container").classList.add("hide")

    const playerClass = e.target.parentElement.parentElement.parentElement.classList[0]
    const player = gameState[playerClass]

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
    const x = Number(letterMap[e.target.form[0].selectedOptions[0].value])
    const y = Number(e.target.form[1].selectedOptions[0].value) - 1
    const vertical = e.target.form[2].checked

    const ship = player.shipsToAdd.pop()
    const result = player.gameboard.placeShip(ship.name, ship.size, x, y, vertical)

    if (result.success) {
        const isPlayer1 = playerClass === "player1"
        renderShips(player, isPlayer1)
        if (player.shipsToAdd.length === 0) {
            document.querySelector(`.${playerClass} .place-ship-form`).classList.add("hide")
            if (isPlayer1) {
                if (gameState.player2.isComputer) {
                    // place computer ships randomly
                    placeShipsCPU()
                    startGame()
                } else {
                    document.querySelector(".message").textContent = `${gameState.player2.name}, please place your ships`
                    document.querySelector(".player1").classList.add("hide")
                    // show player 2 gameboard and place ships form
                    document.querySelector(".player2").classList.remove("hide")
                    document.querySelector(".player2 .place-ship-form").classList.remove("hide")
                }
            } else {
                startGame()
            }
        }
    } else {
        player.shipsToAdd.push(ship)
        document.querySelector(`.${playerClass} .error`).textContent = result.error
    }

}

const placeShipsCPU = () => {

    while(gameState.player2.shipsToAdd.length > 0) {
        const ship = gameState.player2.shipsToAdd.pop()
        const vertical = Math.floor(Math.random() * 2) === 0
        const randomX = Math.floor(Math.random() * 10)
        const randomY = Math.floor(Math.random() * 10)

        const result = gameState.player2.gameboard.placeShip(ship.name, ship.size, randomX, randomY, vertical)

        if (result.error) {
            gameState.player2.shipsToAdd.push(ship)
        }
    }

}

const startGame = () => {
    document.querySelector(".message").textContent = ""
    document.querySelector(".turn-container").classList.remove("hide")
    if (gameState.player2.isComputer) {
        // no need to show player 2 board or the change turn modal
        document.querySelector(".player1").classList.remove("hide")
        document.querySelector(".player1 .targetboard").classList.remove("hide")
        document.querySelector(".player1 .target-label").classList.remove("hide")
        document.querySelector(".player2").classList.add("hide")
    } else {
        document.querySelector(".change-turn-modal .turn-message").textContent = `It is ${gameState[gameState.turn].name}'s turn. When you are ready ${gameState[gameState.turn].name}, click 'Start turn'`
        document.querySelector(".change-turn-modal").showModal()
    }
}

const changeTurn = (e) => {
    const playerClass = gameState.turn
    const otherPlayerClass = playerClass === "player1" ? "player2" : "player1"

    document.querySelector(`.${playerClass}`).classList.remove("hide")
    document.querySelector(`.${playerClass} .targetboard`).classList.remove("hide")
    document.querySelector(`.${playerClass} .target-label`).classList.remove("hide")
    document.querySelector(`.${otherPlayerClass}`).classList.add("hide")

    document.querySelector(".change-turn-modal").close()
}

export { setupGame, playTurn, placeShipUI, changeTurn }