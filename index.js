const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors')
const axios = require('axios')
const PORT = process.env.PORT || 5556
const BASE_URL = process.env.BASE_URL
app.use(express.json())
app.use(cors())

app.post('/api/adduser',(req,res)=>{
    console.log(req.params);
    // axios.post(BASE_URL+'/user',
    //   )
    
      
      
})
app.post('/api/addcheck',(req,res)=>{
    console.log(req.params);
})

app.listen(PORT,()=>{
    console.log('listening on port 5556');
})