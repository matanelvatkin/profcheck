const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const axios = require("axios");
const PORT = process.env.PORT || 5556;
const BASE_URL = process.env.BASE_URL;
const multer = require("multer");
const upload = multer({dist:'./upload'});
const fs=require("fs");


app.use(express.json());
app.use(cors());

const tokens = {}
app.post("/api/adduser", async (req, res) => {
  try {
    const token = await axios.post(
      "https://bof.profchecksys.com/account/signin",
      { username: "yachine", password: "Profcheck123!" }
    );
    const result =await axios.post(
      "https://bof.profchecksys.com/account/signup",
      {
        firstName: "" + req.body.user_meta.first_name[0],
        lastName: "" + req.body.user_meta.last_name[0],
        username: "" + req.body.data.user_login,
        providerName: "Profcheck",
        role: {
          id: 1,
          name: "CUSTOMER",
        },
        password: req.body.user_meta.billing_passapp[0],
        userProfile: {
          organization: {
            id: 71,
          },
          email: "" + req.body.data.user_email,
          phone: "" + req.body.user_meta.billing_phone[0],
          providerName: "Profcheck",
        },
      },
      {
        headers: {
          Authorization: token.data.token,
        },
      }
    );
    res.send("ok");
    const tokenUser = await axios.post(
      "https://bof.profchecksys.com/account/signin",
      { username: req.body.data.user_login, password: req.body.user_meta.billing_passapp[0]}
    );
      tokens[req.body.data.user_email] = tokenUser.data.token
  } catch (error) {
    console.log({error});
    res.status(555).send("error");
  }
});
app.post("/api/addcheck",upload.fields(),(req, res) => {
  try {
    // Access regular form fields
    const postId = req.body.post_id;
    const formId = req.body.form_id;
    const refererTitle = req.body.referer_title;
    const queriedId = req.body.queried_id;
    const parentName = req.body["form_fields[parentName]"];
    const parentPhone = req.body["form_fields[parentPhone]"];
    const parentEmail = req.body["form_fields[parentEmail]"];
    const firstName = req.body["form_fields[firstName]"];
    const middleName = req.body["form_fields[middleName]"];
    const lastName = req.body["form_fields[lastName]"];
    const email = req.body["form_fields[email]"];
    const phone = req.body["form_fields[phone]"];
    const note = req.body["form_fields[note]"];
    const typeName = req.body["form_fields[typename]"];
    const typeId = req.body["form_fields[typeid]"];
    const userName = req.body["form_fields[userName]"];
    const userPass = req.body["form_fields[userPass]"];
    const action = req.body.action;
    const referrer = req.body.referrer;

    // Access uploaded files
   

    // Process the form fields and uploaded files
    console.log("Post ID:", postId);
    console.log("Form ID:", formId);
    console.log("Referer Title:", refererTitle);
    console.log("Queried ID:", queriedId);
    console.log("Parent Name:", parentName);
    console.log("Parent Phone:", parentPhone);
    console.log("Parent Email:", parentEmail);
    console.log("First Name:", firstName);
    console.log("Middle Name:", middleName);
    console.log("Last Name:", lastName);
    console.log("Email:", email);
    console.log("Phone:", phone);
    console.log("Note:", note);
    console.log("Type Name:", typeName);
    console.log("Type ID:", typeId);
    console.log("User Name:", userName);
    console.log("User Pass:", userPass);
    console.log("Action:", action);
    console.log("Referrer:", referrer);
   
  }catch(err){
    console.log({err});
    res.status(555).send("error");
  }
});

app.listen(PORT, () => {
  if(!fs.existsSync('./upload')) fs.mkdirSync('./upload')
  console.log("listening on port "+PORT);
});