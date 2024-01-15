const express =  require('express')
const app = express()

let port = 3000

// routes
app.get('/', (req, res) => {
    res.send('Hello Node API')
})

app.listen(port, ()=> {
    console.log('Node API app is listening on port ' + port)
})
 