const shipFactory = (name, length) => {
    if (!name || typeof name !== "string") throw new Error("Invalid ship name provided")
    if (!length || length < 1) throw new Error("Invalid ship length provided")

    let hits = 0
    let sunk = false

    return {
        name: () => name,
        size: () => length,
        isSunk: () => sunk,
        getHits: () => hits,
        hit: () => {
            hits++
            if (hits >= length) sunk = true
        }
    }
}

export default shipFactory