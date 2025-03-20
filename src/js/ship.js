const shipFactory = (length) => {
    if (!length || length < 1) throw new Error("Invalid ship length provided")

    let hits = 0
    let sunk = false

    return {
        length,
        isSunk: () => sunk,
        getHits: () => hits,
        hit: () => {
            hits++
            if (hits >= length) sunk = true
        }
    }
}

export default shipFactory