import Parser from 'rss-parser';
import {Feed, Item} from "./types";

const rssFeeds =
    [
        'http://expressen.se/rss/nyheter',
        'http://gt.se/rss/nyheter',
        'http://kvp.se/rss/nyheter',
        'http://expressen.se/rss/sport',
        'http://expressen.se/rss/noje',
        'http://expressen.se/rss/debatt',
        'http://expressen.se/rss/ledare',
        'http://expressen.se/rss/kultur',
        'http://expressen.se/rss/ekonomi',
        'http://expressen.se/rss/halsa',
        'http://expressen.se/rss/levabo',
        'http://expressen.se/rss/motor',
        'http://expressen.se/rss/res',
        'http://expressen.se/rss/dokument'
    ]

/**
 * test should be added for this, didn't prioritize
 * for this iteration
 */
export const getAllNewsItems = async (): Promise<Item[]> => {
    const parser: Parser<Feed> = new Parser({
        customFields: {
            feed: ['title', 'items'],
            item: ['title', 'pubDate', 'link']
        }
    });

    /**
    * only logging errors here, a future improvement
    * could be to present errors to the client
    */
    const rssResults = rssFeeds.map(async feed => {
        try {
            const result = await parser.parseURL(feed)
            return result.items.map(item => {
                return {
                    title: item.title,
                    pubDate: item.pubDate,
                    link: item.link
                } as Item
            })
        } catch {
            console.log(`Could not fetch items from ${feed}`)
        }
    })

    const items = await Promise.all(rssResults)
    return items.flatMap(item => item).filter((item) => item) as Item[]
}