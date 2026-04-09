interface Article {
    id: number
    title: string
    category: string
    source: string
    priority: number
    timestamp: string
    summary: string
}

const titles: string[] = [
    'Bitcoin fell below 70k',
    'Ethereum upgrade goes live',
    'New iPhone 17e announced',
    'New MacBook neo announced',
    'AI beats humans at chess again',
    'Tesla releases new car',
    'This meme broke the internet today',
    'Man spends life savings on Dogecoin',
    'New JavaScript framework dropped',
    'OpenAI releases new model',
    'This cat video has 50 million views',
]

const categories: string[] = ['tech', 'crypto', 'memes']

function getSource(category: string): string {
    const sourcesMap: Record<string, string[]> = {
        crypto: ['CoinDesk', 'X'],
        tech: ['TechCrunch', 'Wired'],
        memes: ['Reddit', '9GAG'],
    }
    const list = sourcesMap[category]
    return list[Math.floor(Math.random() * list.length)]
}

function getRandomPriority(category: string): number {
    if(category === 'crypto') return Math.floor(Math.random() * 4) + 7
    if(category === 'tech') return Math.floor(Math.random() * 4) + 4
    return Math.floor(Math.random() * 3) + 1
}

export async function* newsFeedGenerator(delayMs: number = 2000): AsyncGenerator<Article> {
    let id = 1

    while(true) {
        const category = categories[Math.floor(Math.random() * categories.length)]

        const article: Article = {
            id: id,
            title: titles[Math.floor(Math.random() * titles.length)],
            category: category,
            source: getSource(category),
            priority: getRandomPriority(category),
            timestamp: new Date().toISOString(),
            summary: `This is a summary about ${category} news`,
        }

        yield article
        id++

        await new Promise(resolve => setTimeout(resolve, delayMs))
    }
}

export async function timeoutIterator<T>(
    iterator: AsyncIterator<T>,
    timeoutMs: number,
    onItem?: (item: T) => void
): Promise<T[]> {
    const results: T[] = []
    const startTime = Date.now()

    for await (const item of { [Symbol.asyncIterator]: () => iterator }) {
        if(Date.now() - startTime >= timeoutMs) break

        results.push(item)
        if(onItem) onItem(item)
    }

    return results
}
