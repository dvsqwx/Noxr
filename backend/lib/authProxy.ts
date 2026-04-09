interface Headers {
    [key: string]: string
}

interface Strategy {
    authenticate(headers: Headers): Headers | Promise<Headers>
}

export class ApiKeyStrategy implements Strategy {
    private apiKey: string
    private headerName: string

    constructor(apiKey: string, headerName?: string) {
        this.apiKey = apiKey
        this.headerName = headerName || 'X-API-Key'
    }

    authenticate(headers: Headers): Headers {
        headers[this.headerName] = this.apiKey
        return headers
    }
}

export class BearerTokenStrategy implements Strategy {
    private token: string

    constructor(token: string) {
        this.token = token
    }

    authenticate(headers: Headers): Headers {
        headers['Authorization'] = `Bearer ${this.token}`
        return headers
    }
}
