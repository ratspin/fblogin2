const express = require('express')
const app = express()
const port = 8080
const bodyParser = require('body-parser')
const axios = require('axios')
const cors = require('cors')
const TOKEN_SECRET = '92c71949d9b8579b2f70ef1f8c6b46506be88eeae25707f05c16a3c7983f1e9a3b1823b06ae11b06320bb1d7760938de9944c4318080f61f4d19decfe30dec96'
const jwt = require('jsonwebtoken')
const authenticated = (req ,res ,next) =>{
    const auth_header = req.headers['authorization']
    const token = auth_header && auth_header.split(' ')[1]
    if(!token)
        return res.sendStatus(401)
   jwt.verify(token, TOKEN_SECRET, (err,info)=>{ 
    if(err) return res.sendStatus(403)
    req.username = info.username
    next()
   })
}

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
}) 

app.get('/api/info', authenticated ,(req,res)=>{
    res.send({ok: 1, username: req.username})
})

app.post('/api/login', bodyParser.json(), async (req,res) =>{
    let token = req.body.token
    let result = await axios.get('https://graph.facebook.com/me',{
        params: {
            fields: 'id,name,email',
            access_token: token
        }
    })
    if(!result.data.id){
        res.sendStatus(403)
        return
    }
        let data = {
            username: result.data.email
        }
        let access_token = jwt.sign(data, TOKEN_SECRET, {expiresIn: '1800s'})
        res.send({access_token, username: data.username})
        return
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})