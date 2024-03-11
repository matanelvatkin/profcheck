const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors')
const axios = require('axios')
const PORT = process.env.PORT || 5556
const BASE_URL = process.env.BASE_URL
app.use(express.json())
app.use(cors())

app.post('/api/adduser',async (req,res)=>{
try {
    
    const {data,user_meta} =req.body
    const users = await axios.get(BASE_URL+'/user/search/summary')
    if(users.find((user=>user.userProfile.email==data.user_email))){
        res.send('user already exists')
        return 
    }
    const request = {
            "firstName": user_meta.first_name[0],
            "lastName": user_meta.last_name[0],
            "username": data.user_login,
            "providerName": data.display_name,
            "role": {
              "id": 1,
              "name": "CUSTOMER"
            },
            "password": data.user_pass,
            "userProfile": {
              "organization": {
                "id": 70,
                "name": "N.S.O"
              },
              "email": data.user_email,
              "phone": "0",
              "providerName": data.display_name,
            }     
    }
    const results = await axios.post(BASE_URL+'/user',request)
    console.log(results);
      res.send('ok')
} catch (error) {
    
}
      
})
app.post('/api/addcheck',(req,res)=>{
    console.log('create check',req.params);
})

app.listen(PORT,()=>{
    console.log('listening on port 5556');
})