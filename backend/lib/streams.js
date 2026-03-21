'use strict'

// task6

export async function* streamFromArray(arr) {
    for (const item of arr) {
        yield await item
    }
}

export async function* streamFilter(stream, predicate) {
    for await (const item of stream) {
        const result = predicate(item)
        if (result == true) {
            yield await item
        }
    }
}
