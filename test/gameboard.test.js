import gameboardFactory from "../src/js/gameboard"

test("Gameboard exists", () => {
    const gameboard = gameboardFactory()
    expect(gameboard).toBeDefined()
})

test("Gameboard has board", () => {
    const gameboard = gameboardFactory()
    expect(gameboard.board.length).toBe(10)
})

test("Place ship on gameboard", () => {
    const gameboard = gameboardFactory()
    // create ship and place it at 0,0
    // or should the x,y coordinates here be 1,1 and then inside place ship will translate it to 0,0
    // eventually with a ui we will have coordinates like B2
    gameboard.placeShip("ship", 1, 0, 0)

    expect(gameboard.board[0][0]).toBe("ship")
})

test("Place a size 2 ship on gameboard", () => {
    const gameboard = gameboardFactory()

    gameboard.placeShip("ship", 2, 0, 0)

    expect(gameboard.board[0][0]).toBe("ship")
    expect(gameboard.board[0][1]).toBe("ship")
})

test("Place a size 3 ship on gameboard going out of bounds", () => {
    const gameboard = gameboardFactory()
    expect(() => gameboard.placeShip("ship", 3, 9, 9)).toThrow(Error)
})

test("Place a size 1 ship on gameboard bottom right", () => {
    const gameboard = gameboardFactory()
    gameboard.placeShip("ship", 1, 9, 9)
    expect(gameboard.board[9][9]).toBe("ship")
})

test("Place a size 3 ship vertically on gameboard going out of bounds", () => {
    const gameboard = gameboardFactory()
    expect(() => gameboard.placeShip("ship", 3, 9, 9, true)).toThrow(Error)
})

test("Place a size 2 ship on gameboard vertically", () => {
    const gameboard = gameboardFactory()

    gameboard.placeShip("ship", 2, 0, 0, true)

    expect(gameboard.board[0][0]).toBe("ship")
    expect(gameboard.board[1][0]).toBe("ship")
})