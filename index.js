require("dotenv").config()
const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express()


// forma de ler JSON
app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(express.json())

// ROTAS API
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

app.get('/', (req, res) => {

    res.json({message: 'API online!'})

})


mongoose.connect(`mongodb://mongo:27017/DBAPI`)
.then(() => {
    console.log('MongoDB conectado!')
    app.listen(3000, () => console.log("APP rodando"))
})
.catch((err) => console.log(err))

