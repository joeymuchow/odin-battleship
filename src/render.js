const renderPage = () => {
    const body = document.querySelector("body")

    const title = document.createElement("h1")
    title.textContent = "Weather App"

    const buttonContainer = document.createElement("div")
    const startGame = document.createElement("button")
    startGame.textContent = "Start Game"
    buttonContainer.append(startGame)

    const player1Container = renderPlayerContainer("player1")
    player1Container.classList.add("hide")
    const player2Container = renderPlayerContainer("player2")
    player2Container.classList.add("hide")

    body.append(title, player1Container, player2Container)
}

const renderPlayerContainer = (containerClass) => {
    const playerContainer = document.createElement("div")
    playerContainer.classList.add(containerClass)

    const name = document.createElement("h4")

    const gameboardContainer = document.createElement("div")

    const targetboard = document.createElement("div")
    targetboard.classList.add("targetboard")

    const gameboard = document.createElement("div")
    gameboard.classList.add("gameboard")

    renderGrid(targetboard)
    renderGrid(gameboard)

    gameboardContainer.append(targetboard, gameboard)
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

export { renderPage }