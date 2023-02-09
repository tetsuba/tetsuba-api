import app from './routes/index.js'
import * as dotenv from 'dotenv'
// import express from 'express'
// import path from 'path'
dotenv.config()

const port = process.env.PORT || 3001

// TODO: This is for testing and to be removed when finished
// const __dirname = path.resolve()
//
// // React build files
// app.use(express.static(path.join(__dirname, 'src/client')))
//
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'src/client/', 'index.html'))
// })

app.listen(port, () => {
    console.log('Server running on port: ', port)
    console.log('http://localhost:' + port + '/api-docs')
})
