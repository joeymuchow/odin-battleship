import shipFactory from "../src/js/ship"

test("Create ship with length 1", () => {
    const ship = shipFactory(1)
    expect(ship.length).toBe(1)
})

test("Create ship with length 3", () => {
    const ship = shipFactory(3)
    expect(ship.length).toBe(3)
})

test("Invalid ship length of 0 given", () => {
    expect(() => shipFactory(0)).toThrow(Error)
})

test("Invalid ship length of -1 given", () => {
    expect(() => shipFactory(-1)).toThrow(Error)
})

test("No parameter given", () => {
    expect(() => shipFactory()).toThrow(Error)
})

test("Get hits on a new ship", () => {
    const ship = shipFactory(3)
    expect(ship.getHits()).toBe(0);
})

test("A ship was hit", () => {
    const ship = shipFactory(3)
    ship.hit()
    expect(ship.getHits()).toBe(1)
})

test("A ship was hit twice", () => {
    const ship = shipFactory(3)
    ship.hit()
    ship.hit()
    expect(ship.getHits()).toBe(2)
})

test("A ship is not sunk", () => {
    const ship = shipFactory(3)
    ship.hit()
    expect(ship.isSunk()).toBe(false)
})

test("A ship is sunk", () => {
    const ship = shipFactory(1)
    ship.hit()
    expect(ship.isSunk()).toBe(true)
})