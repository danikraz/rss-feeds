import express from 'express'
import {getItems} from "./rss/rss-service";

const app = express()
const port = 5000

app.get('/latest', async (_, res) => {
    const items = await getItems()
    res.status(200).send(items)
})

app.listen(port, () => console.log(`Running on port ${port}`))