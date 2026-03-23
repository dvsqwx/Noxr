'use strict';

//task 4 bi directional queue
export class BiDirectionalPriorityQueue {
    constructor() {
        this.items = []
        this.count = 0
    }

    enqueue(item, priority = 0) {
        const newItem = {
            item,
            priority,
            count: this.count
        }
        this.items.push(newItem)
        this.count++
    }
