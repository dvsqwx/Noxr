'use strict'

//task 5 async

export function asyncFilterCallback(array, predicate, callback) {
    let res = []
    let n = array.length
    if(!array || array.length == 0) {
        callback(null, [])
        return
    }

    array.forEach(function(item, i) {
        Promise.resolve(predicate(item)).then(function(ok) {
            if(ok) {
                res.push({item, i})
            }
        }).catch(function(e) {
            callback(e)
        }).finally(function() {
            n--
            if(n == 0) {
                res.sort(function(a,b) { return a.i - b.i })
                callback(null, res.map(function(x) { return x.item }))
            }
        })
    })
}
