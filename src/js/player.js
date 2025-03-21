import gameboardFactory from "./gameboard"

const playerFactory = (name, isComputer) => {
    const gameboard = gameboardFactory()

    return {
        name,
        isComputer,
        gameboard,
    }
}

export default playerFactory