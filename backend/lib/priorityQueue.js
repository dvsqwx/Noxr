'use strict'

// Task 4 - Bi-Directional Priority Queue

export class BiDirectionalPriorityQueue {

    constructor() {
        this.items = []
        this.counter = 0  // tracks insertion order
    }

    enqueue(item, priority = 0) {
        this.items.push({
            item,
            priority,
            order: this.counter,
        })
        this.counter++
    }

    dequeue(mode = 'highest') {
        if (this.items.length === 0) return null

        const index = this._findIndex(mode)
        const entry = this.items[index]

        this.items.splice(index, 1)

        return entry.item
    }

    peek(mode = 'highest') {
        if (this.items.length === 0) return null

        const index = this._findIndex(mode)
        return this.items[index].item
    }

    _findIndex(mode) {
        let bestIndex = 0

        this.items.forEach((entry, i) => {
            const best = this.items[bestIndex]

            if (mode === 'highest' && entry.priority > best.priority) bestIndex = i
            if (mode === 'lowest'  && entry.priority < best.priority) bestIndex = i
            if (mode === 'oldest'  && entry.order < best.order)       bestIndex = i
            if (mode === 'newest'  && entry.order > best.order)       bestIndex = i
        })

        return bestIndex
    }

    // returns number of items in the queue
    size() {
        return this.items.length
    }

    // returns true if queue has no items
    isEmpty() {
        return this.items.length === 0
    }

    // returns all items
    toArray(mode = 'highest') {
        const result = []
        const copy = new BiDirectionalPriorityQueue()

        this.items.forEach(entry => copy.enqueue(entry.item, entry.priority))


        while (!copy.isEmpty()) {
            result.push(copy.dequeue(mode))
        }

        return result
    }

}
