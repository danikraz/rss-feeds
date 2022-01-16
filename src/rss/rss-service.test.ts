import {getItems} from "./rss-service";
import {getAllNewsItems} from "./rss-client";
import {mocked} from "ts-jest/utils";

jest.mock('./rss-client')
const getAllNewsItemsMock = mocked(getAllNewsItems)

describe('rss-service', () => {
    const latestItem = {
        title: "latest item",
        pubDate: "Sun, 16 Jan 2022 13:37:12 +0100",
        link: "link"
    }
    const middleItem = {
        title: "middle item",
        pubDate: "Sun, 9 Jan 2022 13:21:50 +0100",
        link: "link"
    }
    const oldestItem = {
        title: "oldest item",
        pubDate: "Sun, 1 Jan 2022 14:20:43 +0100",
        link: "link"
    }

    test('should get items sorted by date', async () => {
        getAllNewsItemsMock.mockImplementationOnce(() => Promise.resolve([middleItem, oldestItem, latestItem]))
        const items = await getItems()

        expect(items[0]).toBe(latestItem)
        expect(items[1]).toBe(middleItem)
        expect(items[2]).toBe(oldestItem)
    })

    test('should filter duplicate events', async () => {
        getAllNewsItemsMock.mockImplementationOnce(() => Promise.resolve([latestItem, latestItem, middleItem, middleItem]))
        const items = await getItems()

        expect(items).toHaveLength(2)
        expect(items[0]).toBe(latestItem)
        expect(items[1]).toBe(middleItem)
    })
})