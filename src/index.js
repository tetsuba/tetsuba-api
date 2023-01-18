import app from './routes/index.js'
import * as dotenv from 'dotenv'
dotenv.config()

app.listen(3001, () => {
    console.log('Server running on port 3001')
    console.log('http://localhost:3001/api-docs')
})
