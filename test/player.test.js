import playerFactory from "../src/js/player"

describe("Player factory tests", () => {
    test("Create real player", () => {
        const player = playerFactory("test", false)
        expect(player.name).toBe("test")
        expect(player.isComputer).toBe(false)
    })

    test("Create another real player", () => {
        const player = playerFactory("bob", false)
        expect(player.name).toBe("bob")
        expect(player.isComputer).toBe(false)
    })

    test("Create computer", () => {
        const computer = playerFactory("computer", true)
        expect(computer.isComputer).toBe(true)
    })

    describe("Player and computer gameboards are not shared", () => {
        let player
        let computer

        beforeEach(() => {
            player = playerFactory("test", false)
            computer = playerFactory("computer", true)
        })

        test("Player placed ship is only on player board", () => {
            player.gameboard.placeShip("ship1", 1, 0, 0)
            
            const playerSpot = player.gameboard.board[0][0]
            const computerSpot = computer.gameboard.board[0][0]
    
            expect(playerSpot).not.toEqual(computerSpot)
        })

        test("Attacks only go to board that was attacked", () => {
            computer.gameboard.receiveAttack(0,0)

            expect(computer.gameboard.shots.misses.length).toBe(1)
            expect(player.gameboard.shots.misses.length).toBe(0)
        })
    
        test("Only computer ship is sunk", () => {
            player.gameboard.placeShip("ship1", 1, 0, 0)
            computer.gameboard.placeShip("ship1", 1, 0, 0)
            
            computer.gameboard.receiveAttack(0,0)
    
            const playerSunk = player.gameboard.allShipsSunk()
            const computerSunk = computer.gameboard.allShipsSunk()
    
            expect(playerSunk).not.toEqual(computerSunk)
        })
    })
})