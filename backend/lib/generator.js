"use strict";

//Lab 1 generator

const titles = [
    'Bitcoin hits new all time high',
    'Ethereum upgrade goes live',
    'New iPhone announced',
    'AI beats humans at chess again',
    'Tesla releases new car',
    'This meme broke the internet today',
    'Man spends life savings on Dogecoin',
    'New JavaScript framework dropped',
    'OpenAI releases new model',
    'This cat video has 50 million views',
]

const categories = ['tech', 'crypto', 'memes']
const sources = ['CoinDesk', 'TechCrunch', 'Reddit', 'X', 'Wired', '9GAG']

export async function* newsFeedGenerator(delayMs = 2000) {
    let id = 1

    while (true) {
        const category = categories[Math.floor(Math.random() * categories.length)]

        const article = {
            id: id,
            title: titles[Math.floor(Math.random() * titles.length)],
            category: category,
            source: sources[Math.floor(Math.random() * sources.length)],
            priority: Math.floor(Math.random() * 10) + 1,
            timestamp: new Date().toISOString(),
            summary: `This is a summary about ${category} news`,
        }

        yield article
        id++

        await new Promise(resolve => setTimeout(resolve, delayMs))
    }
}

export async function timeoutIterator(iterator, timeoutMs, onItem) {
    const results = []
    const startTime = Date.now()

    for await (const item of iterator) {
        if (Date.now() - startTime >= timeoutMs) break

        results.push(item)
        onItem?.(item)
    }

    return results
