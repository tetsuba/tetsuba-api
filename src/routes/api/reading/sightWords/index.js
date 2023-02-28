import express from 'express'
const app = express()

import sightWords from './sightWords/route.js'

app.use('/sightWords', sightWords)

export default app
