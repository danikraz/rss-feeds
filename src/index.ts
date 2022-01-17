import express from 'express'
import {getItems} from "./rss/rss-service";

/**
 * change port if already in use
 */
const app = express()
const port = 5000

/**
 * chose to return news items in JSON with title, link and date
 * this can be easily changed depending on requirements from client,
 * any errors from feeds are only logged and not returned
 */
app.get('/latest', async (_, res) => {
    const items = await getItems()
    res.status(200).send(items)
})

app.listen(port, () => console.log(`Running on port ${port}`))