const express = require('express')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3000

// Middlewares

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json({ message: 'Login API is active'})
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
