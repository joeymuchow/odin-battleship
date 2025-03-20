import shipFactory from "./ship"

const gameboardFactory = () => {
    const board = [
        [[],[],[],[],[],[],[],[],[],[],],
        [[],[],[],[],[],[],[],[],[],[],],
        [[],[],[],[],[],[],[],[],[],[],],
        [[],[],[],[],[],[],[],[],[],[],],
        [[],[],[],[],[],[],[],[],[],[],],
        [[],[],[],[],[],[],[],[],[],[],],
        [[],[],[],[],[],[],[],[],[],[],],
        [[],[],[],[],[],[],[],[],[],[],],
        [[],[],[],[],[],[],[],[],[],[],],
        [[],[],[],[],[],[],[],[],[],[],],
    ]

    const placeShip = (name, size, x, y, vertical = false) => {
        if (vertical && (y + (size - 1)) > 9) throw new Error("Out of bounds exception")
        if (!vertical && (x + (size - 1)) > 9) throw new Error("Out of bounds exception")

        const ship = shipFactory(name, size)
        for (let i = 0; i < size; i++) {
            if (vertical) {
                board[y + i][x] = ship.name()
            } else {
                board[y][x + i] = ship.name()
            }
        }
    }

    return {
        board,
        placeShip
    }
}


export default gameboardFactory