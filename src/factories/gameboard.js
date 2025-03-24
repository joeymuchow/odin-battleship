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

    const shipsLog = []
    const shots = {
        hits: [],
        misses: []
    }

    const placeShip = (name, size, x, y, vertical = false) => {
        if (vertical && (y + (size - 1)) > 9) throw new Error("Out of bounds exception")
        if (!vertical && (x + (size - 1)) > 9) throw new Error("Out of bounds exception")

        // TODO: check if any of the spots already have a ship there
        const ship = shipFactory(name, size)
        shipsLog.push(ship)
        for (let i = 0; i < size; i++) {
            if (vertical) {
                board[y + i][x] = ship.name()
            } else {
                board[y][x + i] = ship.name()
            }
        }
    }

    const receiveAttack = (x, y) => {
        if (x > board.length - 1 || y > board.length - 1) throw new Error("Out of bounds exception")

        const result = {
            result: null,
            ship: null,
        }
        if (board[y][x].length) {
            const name = board[y][x]
            const hitShip = shipsLog.filter((ship) => {
                return ship.name() === name
            })

            hitShip[0].hit()
            shots.hits.push({x, y})
            result.result = "hit"
            result.ship = name
        } else {
            shots.misses.push({x, y})
            result.result = "miss"
        }

        return result
    }

    const allShipsSunk = () => {
        let shipsSunk = 0
        for (const ship of shipsLog) {
            if (ship.isSunk()) shipsSunk += 1
        }

        return shipsSunk === shipsLog.length
    }

    return {
        board,
        shots,
        placeShip,
        receiveAttack,
        allShipsSunk
    }
}


export default gameboardFactory