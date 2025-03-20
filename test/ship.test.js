import shipFactory from "../src/js/ship"

test("Create ship with length 1", () => {
    const ship = shipFactory("ship", 1)
    expect(ship.size()).toBe(1)
})

test("Create ship with length 3", () => {
    const ship = shipFactory("ship", 3)
    expect(ship.size()).toBe(3)
})

test("Invalid ship length of 0 given", () => {
    expect(() => shipFactory("ship", 0)).toThrow(Error)
})

test("Invalid ship length of -1 given", () => {
    expect(() => shipFactory("ship", -1)).toThrow(Error)
})

test("No parameters given", () => {
    expect(() => shipFactory()).toThrow(Error)
})

test("No name parameter given", () => {
    expect(() => shipFactory(1)).toThrow(Error)
})

test("No length parameter given", () => {
    expect(() => shipFactory("ship")).toThrow(Error)
})

test("Get hits on a new ship", () => {
    const ship = shipFactory("ship", 3)
    expect(ship.getHits()).toBe(0);
})

test("A ship was hit", () => {
    const ship = shipFactory("ship", 3)
    ship.hit()
    expect(ship.getHits()).toBe(1)
})

test("A ship was hit twice", () => {
    const ship = shipFactory("ship", 3)
    ship.hit()
    ship.hit()
    expect(ship.getHits()).toBe(2)
})

test("A ship is not sunk", () => {
    const ship = shipFactory("ship", 3)
    ship.hit()
    expect(ship.isSunk()).toBe(false)
})

test("A ship is sunk", () => {
    const ship = shipFactory("ship", 1)
    ship.hit()
    expect(ship.isSunk()).toBe(true)
})