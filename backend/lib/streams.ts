export async function* streamFromArray<T>(arr: T[]): AsyncGenerator<T> {
    for(const item of arr) {
        yield item
    }
}

export async function* streamFilter<T>(
    stream: AsyncIterable<T>,
    predicate: (item: T) => boolean | Promise<boolean>
): AsyncGenerator<T> {
    for await (const item of stream) {
        const result = await predicate(item)
        if(result) {
            yield item
        }
    }
}

export async function* streamMap<T, R>(
    stream: AsyncIterable<T>,
    transform: (item: T) => R | Promise<R>
): AsyncGenerator<R> {
    for await (const item of stream) {
        let mapped = await transform(item)
        yield mapped
    }
}

export async function* streamTake<T>(stream: AsyncIterable<T>, n: number): AsyncGenerator<T> {
    let count = 0
    for await (const item of stream) {
        if(count >= n) break
        yield item
        count++
    }
}

export async function collectStream<T>(stream: AsyncIterable<T>): Promise<T[]> {
    const results: T[] = []
    for await (const item of stream) {
        results.push(item)
    }
    return results
}

export async function* streamJsonlFile(filepath: string): AsyncGenerator<unknown> {
    const fs = await import('fs')
    const readline = await import('readline')

    const fileStream = fs.createReadStream(filepath)
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    })

    for await (const line of rl) {
        if(line.trim() === '') continue
        try {
            yield JSON.parse(line)
        } catch(e) {
            console.error('bad line:', line)
        }
    }
}
