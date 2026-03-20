'use strict'

// Task 5 - Async Array Filtering

// callback
export function asyncFilterCallback(array, predicate, callback) {
    const results = []
    let pending = array.length

    // handle empty array
    if (pending === 0) {
        callback(null, [])
        return
    }

    array.forEach((item, i) => {
        Promise.resolve(predicate(item))
            .then(passes => {
                if (passes) results.push({ item, i })
            })
            .catch(err => {
                callback(err, null)
            })
            .finally(() => {
                pending--
                if (pending === 0) {
                    const sorted = results
                        .sort((a, b) => a.i - b.i)
                        .map(entry => entry.item)
                    callback(null, sorted)
                }
            })
    })
}

// promise
export function asyncFilterPromise(array, predicate) {
    return new Promise((resolve, reject) => {
        const results = []
        let pending = array.length

        // handle empty array
        if (pending === 0) {
            resolve([])
            return
        }

        array.forEach((item, i) => {
            Promise.resolve(predicate(item))
                .then(passes => {
                    if (passes) results.push({ item, i })
                })
                .catch(err => {
                    reject(err)
                })
                .finally(() => {
                    pending--
                    if (pending === 0) {
                        const sorted = results
                            .sort((a, b) => a.i - b.i)
                            .map(entry => entry.item)
                        resolve(sorted)
                    }
                })
        })
    })
}
