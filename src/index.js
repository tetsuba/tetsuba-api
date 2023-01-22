import app from './routes/index.js'
import * as dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT || 3001

app.listen(port, () => {
    console.log('Server running on port: ', port)
    console.log('http://localhost:' + port + '/api-docs')
})
