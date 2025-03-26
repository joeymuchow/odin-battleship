const renderPage = () => {
    const body = document.querySelector("body")

    const title = document.createElement("h1")
    title.textContent = "Battleship"

    const buttonContainer = document.createElement("div")
    const startGame = document.createElement("button")
    startGame.classList.add("start-game")
    startGame.textContent = "Start 2 Player Game"
    const playComputer = document.createElement("button")
    playComputer.classList.add("play-computer")
    playComputer.textContent = "Start Game vs CPU"
    buttonContainer.append(startGame, playComputer)

    const turnContainer = document.createElement("div")
    turnContainer.classList.add("turn-container")
    const turnLabel = document.createElement("p")
    turnLabel.textContent = "Turn: "
    const turn = document.createElement("p")
    turn.classList.add("turn")
    turnContainer.append(turnLabel, turn)

    const message = document.createElement("p")
    message.classList.add("message")

    const player1Container = renderPlayerContainer("player1")
    player1Container.classList.add("hide")
    const player2Container = renderPlayerContainer("player2")
    player2Container.classList.add("hide")

    body.append(title, buttonContainer, turnContainer, message, player1Container, player2Container)
}

const renderPlayerContainer = (containerClass) => {
    const playerContainer = document.createElement("div")
    playerContainer.classList.add(containerClass)

    const name = document.createElement("h3")

    const gameboardContainer = document.createElement("div")

    const targetLabel = document.createElement("p")
    targetLabel.textContent = "Opponent's ships"
    const targetboard = document.createElement("div")
    targetboard.classList.add("targetboard")

    const gameboardLabel = document.createElement("p")
    gameboardLabel.textContent = "Your ships"
    const gameboard = document.createElement("div")
    gameboard.classList.add("gameboard")

    renderGrid(targetboard)
    renderGrid(gameboard)

    gameboardContainer.append(targetLabel, targetboard, gameboardLabel, gameboard)
    playerContainer.append(name, gameboardContainer)

    return playerContainer
}

const renderGrid = (board) => {
    const letterArray = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]

    for (let i = 0; i < 11; i++) {
        const div = document.createElement("div")

        for (let j = 0; j < 11; j++) {
            const innerDiv = document.createElement("div")
            if (i === 0) {
                innerDiv.textContent = letterArray[j]
                innerDiv.classList.add("label")
            } else {
                if (j === 0) {
                    innerDiv.textContent = i
                    innerDiv.classList.add("label")
                } else {
                    innerDiv.classList.add(letterArray[j] + i)
                }
            }
            div.append(innerDiv)
        }
        board.append(div)
    }

    return board
}

const clearGrids = () => {
    const targetCells = document.querySelectorAll(".targetboard div div")
    const gameCells = document.querySelectorAll(".gameboard div div")
    for (const cell of targetCells) {
        if (!cell.classList.contains("label")) {
            cell.replaceChildren()
        }
    }
    for (const cell of gameCells) {
        if (!cell.classList.contains("label")) {
            cell.replaceChildren()
        }
    }
}

const renderShips = (player, isPlayer1) => {
    const playerNum = isPlayer1 ? 1 : 2
    const gameboard = document.querySelector(`.player${playerNum} .gameboard`)
    const board = player.gameboard.board

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j].length) {
                // The gameboard from gameboardFactory doesn't have the label row and column
                // So we are adding one to i and j
                gameboard.children[i+1].children[j+1].classList.add("ship")
            }
        }
    }
}

const renderShot = (coordinate, isPlayer1, board, result) => {
    const playerNum = isPlayer1 ? 1 : 2
    const cell = document.querySelector(`.player${playerNum} .${board} .${coordinate}`)

    const marker = document.createElement("div")
    marker.classList.add("marker", result)

    cell.append(marker)
}

const renderResultMessage = (currentPlayer, targetPlayer, result, winner) => {
    const message = document.querySelector(".message")
    if (winner) {
        message.textContent = `${currentPlayer} wins!`
    } else if (result.sunk) {
        message.textContent = `${currentPlayer} sunk ${targetPlayer}'s ${result.ship}!`
    } else if (result.result === "hit") {
        message.textContent = `${currentPlayer} hits ${targetPlayer}'s ${result.ship}!`
    } else {
        message.textContent = `${currentPlayer} misses!`
    }
}

export { renderPage, renderShips, renderShot, renderResultMessage, clearGrids }