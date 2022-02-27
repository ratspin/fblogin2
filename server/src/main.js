const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const axios = require('axios')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/login', bodyParser.json(), async (req,res) =>{
    let token = req.body.token
    let result = await axios.get('https://graph.facebook.com/me',{
        params: {
            field: 'id,name,email',
            access_token: token
        }
    })
    console.log(result.data)
    res.send({ok: 1})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})