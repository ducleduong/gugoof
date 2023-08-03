import api from './config'

export function getSearchResult(query: string, limit: number = 20, related_keywords: boolean = true) {
    return api.get('/', {
        params: {
            query,
            limit,
            related_keywords
        },
    })
}
