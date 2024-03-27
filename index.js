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
    
      // const json = {
      //     "enabled": true,
      //     "firstName": req.body.user_meta.first_name[0],
      //     "lastName": req.body.user_meta.last_name[0],
      //     "name": req.body.user_meta.first_name[0],
      //     "password":req.body.data.user_pass,
      //     "role": {
      //       id: 3,
      //       name: "CUSTOMER",
      //       parentId: null,
      //       parentName: null,
      //       version: 0,
      //     },
      //     userProfile: {
      //       organization: {
      //           id: 70,
      //           name: "N.S.O",
      //           parentId: null,
      //           parentName: null,
      //           version: 0,
      //           logo: "",
      //       },
      //       email: req.body.data.user_email,
      //       phone: req.body.user_meta.billing_phone[0],
      //       providerName: "Profcheck",
      //   }}
        // const users = await axios.get('https://bof.profchecksys.com/user/search/summary')
        // if(users.data&&Array.isArray(users.data)&&users.data.find(user=>user.userProfile.email==json.userProfile.email)){
        //     res.send('ok')
        //     return
        // }
    const results =await axios.post(
      "https://bof.profchecksys.com/account/signup",
      {
        "firstName": "UserTest2",
        "lastName": "UserTest2",
        "username": "UserTest22",
        "providerName": "",
        "role": {
          "id": 3,
          "name": "CUSTOMER",
          "parentId": null,
          "parentName": null,
          "version": 0
        },
        "password": "thigusNkcsu123",
        "userProfile": {
          "organization": {
            "id": 70,
            "name": "N.S.O",
            "parentId": null,
            "parentName": null,
            "version": 0,
            "logo": ""
          },
          "email": "guybiton7@gmail.com",
          "phone": "",
          "providerName": ""
        }
      },
      {
        headers: {
          Authorization: token.headers.authorization
        }
      }
    );
    console.log(results);

    res.send("ok");
  } catch (error) {
    console.log(error);
  }
});
app.post("/api/addcheck", (req, res) => {
  console.log("create check", req.params);
});

app.listen(PORT, () => {
  console.log("listening on port 5556");
});
