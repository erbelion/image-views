type badgeGeneratorResult = {
    html: string
    md: string
    img: string
    page: string
}

export default function(id: string, actions: string[]): badgeGeneratorResult{
    const result: badgeGeneratorResult = {
        html: '',
        md: '',
        img: '',
        page: ''
    }

    id = id.replace(/^https:\/\//, '').replace(/^http:\/\//, '').replace(/\/+$/, '')

    const alt = (action: string): string => {
        switch (action) {
            case 'viewed':
                return 'views'
            case 'liked':
                return 'likes'
            case 'commented':
                return 'comments'
            default:
                return 'views'
        }
    }
    
    const img = (action: string): string => {
        const urlArgs = new URLSearchParams()
        urlArgs.set('id', id)

        return `${import.meta.env.VITE_FULL_APP_URL}/api/${alt(action)}.svg?${urlArgs}`
    }

    const url = (action: string): string => {
        const urlArgs = new URLSearchParams()
        urlArgs.set('id', id)

        if(action === 'liked')
            return `${import.meta.env.VITE_FULL_APP_URL}/api/like?${urlArgs}`

        return `${import.meta.env.VITE_FULL_APP_URL}/page/?${urlArgs}`
    }

    const page = (): string => {
        const urlArgs = new URLSearchParams()
        urlArgs.set('id', id)

        return `${import.meta.env.VITE_FULL_APP_URL}/page/?${urlArgs}`
    }

    for (const action of actions) {
        result.html += `<a href="${url(action)}" rel="external"><img src="${img(action)}" alt="${alt(action)}"></a> `
        result.md += `[![${alt(action)}](${img(action)})](${url(action)}) `
        result.img += `${img(action)} `
    }

    result.page = page()

    return result
}