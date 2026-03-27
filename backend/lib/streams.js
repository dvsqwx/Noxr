'use strict'

// task6

export async function* streamFromArray(arr) {
    for (const item of arr) {
        yield await item
    }
}

