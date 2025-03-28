const renderPage = () => {
    const body = document.querySelector("body")

    const title = document.createElement("h1")
    title.textContent = "Battleship"

    const buttonContainer = document.createElement("div")
    const setupGame = document.createElement("button")
    setupGame.classList.add("play-game")
    setupGame.textContent = "Start 2 Player Game"
    const playComputer = document.createElement("button")
    playComputer.classList.add("play-computer")
    playComputer.textContent = "Start Game vs CPU"
    buttonContainer.append(setupGame, playComputer)

    const turnContainer = document.createElement("div")
    turnContainer.classList.add("turn-container", "hide")
    const turnLabel = document.createElement("p")
    turnLabel.textContent = "Turn: "
    const turn = document.createElement("p")
    turn.classList.add("turn")
    turnContainer.append(turnLabel, turn)

    const message = document.createElement("p")
    message.classList.add("message")

    const modal = changeTurnModal()

    const player1Container = renderPlayerContainer("player1")
    player1Container.classList.add("hide")
    const player2Container = renderPlayerContainer("player2")
    player2Container.classList.add("hide")

    body.append(title, buttonContainer, turnContainer, message, modal, player1Container, player2Container)
}

const renderPlayerContainer = (containerClass) => {
    const playerContainer = document.createElement("div")
    playerContainer.classList.add(containerClass)

    const name = document.createElement("h3")

    const gameboardContainer = document.createElement("div")

    const targetLabel = document.createElement("p")
    targetLabel.textContent = "Opponent's ships"
    targetLabel.classList.add("target-label", "hide")
    const targetboard = document.createElement("div")
    targetboard.classList.add("targetboard", "hide")

    const placeShipForm = createPlaceShipForm()

    const gameboardLabel = document.createElement("p")
    gameboardLabel.textContent = "Your ships"
    const gameboard = document.createElement("div")
    gameboard.classList.add("gameboard")

    renderGrid(targetboard)
    renderGrid(gameboard)

    gameboardContainer.append(targetLabel, targetboard, placeShipForm, gameboardLabel, gameboard)
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
            cell.classList.remove("ship")
        }
    }
    for (const cell of gameCells) {
        if (!cell.classList.contains("label")) {
            cell.replaceChildren()
            cell.classList.remove("ship")
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

const createPlaceShipForm = () => {
    const form = document.createElement("form")
    form.classList.add("place-ship-form")

    const xLabel = document.createElement("label")
    xLabel.setAttribute("for", "x-coordinate")
    xLabel.textContent = "X coordinate"

    const xSelect = document.createElement("select")
    xSelect.id = "x-coordinate"
    const letterArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
    for (const letter of letterArray) {
        const option = document.createElement("option")
        option.textContent = letter
        option.value = letter
        xSelect.append(option)
    }

    const yLabel = document.createElement("label")
    yLabel.setAttribute("for", "y-coordinate")
    yLabel.textContent = "Y coordinate"

    const ySelect = document.createElement("select")
    ySelect.id = "y-coordinate"
    for (let i = 1; i <= 10; i++) {
        const option = document.createElement("option")
        option.textContent = i
        option.value = i
        ySelect.append(option)
    }

    const verticalLabel = document.createElement("label")
    verticalLabel.textContent = "Vertical?"
    verticalLabel.setAttribute("for", "vertical-checkbox")
    const verticalCheckbox = document.createElement("input")
    verticalCheckbox.id = "vertical-checkbox"
    verticalCheckbox.type = "checkbox"

    const error = document.createElement("p")
    error.classList.add("error")

    const button = document.createElement("button")
    button.classList.add("submit-btn")
    button.textContent = "Place ship"

    form.append(xLabel, xSelect, yLabel, ySelect, verticalLabel, verticalCheckbox, error, button)
    form.classList.add("hide")

    return form
}

const changeTurnModal = () => {
    const modal = document.createElement("dialog")
    modal.classList.add("change-turn-modal")

    const message = document.createElement("p")
    message.classList.add("turn-message")
    message.textContent = ""

    const button = document.createElement("button")
    button.textContent = "Start turn"
    button.classList.add("start-turn")

    modal.append(message, button)

    return modal
}

export { renderPage, renderShips, renderShot, renderResultMessage, clearGrids }