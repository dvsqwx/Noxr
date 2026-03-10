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

}
