export interface Feed {
    title: string
    items: Item[]
}

export interface Item {
    title: string
    pubDate: string
    link: string
}