import {Item} from "./types";
import {getAllNewsItems} from "./rss-client";

export const getItems = async (): Promise<Item[]> => {
    const allItems = await getAllNewsItems()
    const uniqueItems = getUniqueItems(allItems)
    return getSortedItems(uniqueItems).slice(0, 10)
}

const getSortedItems = (items: Item[]): Item[] => {
    return items.sort(function(a, b) {
        return new Date(b.pubDate).valueOf() - new Date(a.pubDate).valueOf();
    })
}

const getUniqueItems = (items: Item[]): Item[] => {
    const key = 'title'
    return [...new Map(items.map(item =>
        [item[key], item])).values()]
}