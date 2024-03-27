const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const axios = require("axios");
const PORT = process.env.PORT || 5556;
const BASE_URL = process.env.BASE_URL;
app.use(express.json());
app.use(cors());
app.post("/api/adduser", async (req, res) => {
  try {
    const token = await axios.post("https://bof.profchecksys.com/account/signin", {username:'yachine',password:"Profcheck123!"});
    
      
      console.log(token.data);
    // const results =await axios.post(
    //   "https://bof.profchecksys.com/account/signup",
    //   {
    //     "firstName": ""+req.body.user_meta.first_name[0],
    //     "lastName": ""+req.body.user_meta.last_name[0],
    //     "username": ""+req.body.user_meta.first_name[0],
    //     "providerName": "",
    //     "role": {
    //       "name": "CUSTOMER",
    //       "parentId": null,
    //       "parentName": null,
    //       "version": 0
    //     },
    //     "password": ""+req.body.data.user_pass,
    //     "userProfile": {
    //       "organization": {
    //         "id": 70,
    //         "name": "N.S.O",
    //         "parentId": null,
    //         "parentName": null,
    //         "version": 0,
    //         "logo": ""
    //       },
    //       "email": ""+req.body.data.user_email,
    //       "phone": ""+req.body.user_meta.billing_phone[0],
    //       "providerName": ""
    //     }
    //   },
    //   {
    //     headers: {
    //       Authorization: token.data.token
    //     }
    //   }
    // );
    // console.log(results);

    res.send("ok");
  } catch (error) {
    console.log(error);
    res.status(500).send('error')
  }
});
app.post("/api/addcheck", (req, res) => {
  console.log("create check", req.params);
});

app.listen(PORT, () => {
  console.log("listening on port 5556");
});
