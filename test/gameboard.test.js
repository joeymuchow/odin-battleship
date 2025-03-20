import gameboardFactory from "../src/js/gameboard"

describe("General gameboard tests", () => {
    test("Gameboard exists", () => {
        const gameboard = gameboardFactory()
        expect(gameboard).toBeDefined()
    })
    
    test("Gameboard has board", () => {
        const gameboard = gameboardFactory()
        expect(gameboard.board.length).toBe(10)
    })
})

describe("Place ship tests", () => {
    let gameboard;

    beforeEach(() => {
        gameboard = gameboardFactory()
    })

    test("Place ship on gameboard", () => {
        // create ship and place it at 0,0
        // or should the x,y coordinates here be 1,1 and then inside place ship will translate it to 0,0
        // eventually with a ui we will have coordinates like B2
        gameboard.placeShip("ship", 1, 0, 0)
    
        expect(gameboard.board[0][0]).toBe("ship")
    })
    
    test("Place a size 2 ship on gameboard", () => {
        gameboard.placeShip("ship", 2, 0, 0)
    
        expect(gameboard.board[0][0]).toBe("ship")
        expect(gameboard.board[0][1]).toBe("ship")
    })
    
    test("Place a size 3 ship on gameboard going out of bounds", () => {
        expect(() => gameboard.placeShip("ship", 3, 9, 9)).toThrow(Error)
    })
    
    test("Place a size 1 ship on gameboard bottom right", () => {
        gameboard.placeShip("ship", 1, 9, 9)
        expect(gameboard.board[9][9]).toBe("ship")
    })
    
    test("Place a size 3 ship on gameboard right edge", () => {
        gameboard.placeShip("ship", 3, 7, 0)
        expect(gameboard.board[0][7]).toBe("ship")
        expect(gameboard.board[0][8]).toBe("ship")
        expect(gameboard.board[0][9]).toBe("ship")
    })
    
    test("Place a size 3 ship vertically on gameboard going out of bounds", () => {
        expect(() => gameboard.placeShip("ship", 3, 9, 9, true)).toThrow(Error)
    })
    
    test("Place a size 2 ship on gameboard vertically", () => {
        gameboard.placeShip("ship", 2, 0, 0, true)
    
        expect(gameboard.board[0][0]).toBe("ship")
        expect(gameboard.board[1][0]).toBe("ship")
    })
})

describe("Shots at ships tests", () => {
    let gameboard;

    beforeEach(() => {
        gameboard = gameboardFactory()
    })

    test("Fire at 0,0 and hit", () => {
        gameboard.placeShip("ship", 1, 0, 0)
        gameboard.receiveAttack(0, 0)
    
        expect(gameboard.shipsLog[0].getHits()).toBe(1)
    })

    test("Fire at 1,0 and hit", () => {
        gameboard.placeShip("ship", 2, 0, 0)
        gameboard.receiveAttack(1, 0)
    
        expect(gameboard.shipsLog[0].getHits()).toBe(1)
    })
    
    test("Fire at 0,0 and miss", () => { 
        gameboard.placeShip("ship", 1, 1, 0)
        gameboard.receiveAttack(0, 0)
    
        expect(gameboard.shipsLog[0].getHits()).toBe(0)
        expect(gameboard.shots.misses).toContainEqual({x: 0, y: 0})
    })

    test("Fire at 10,0 and receive error", () => {
        gameboard.placeShip("ship", 1, 0, 0)
        expect(() => gameboard.receiveAttack(10, 0)).toThrow(Error)
    })

    test("Fire at 0,10 and receive error", () => {
        gameboard.placeShip("ship", 1, 0, 0)
        expect(() => gameboard.receiveAttack(0, 10)).toThrow(Error)
    })
})