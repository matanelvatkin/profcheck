const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const axios = require("axios");
const PORT = process.env.PORT || 5556;
const BASE_URL = process.env.BASE_URL;
app.use(express.json());
app.use(cors());
axios.defaults.headers.common.Authorization = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ5YWNoaW5lIiwiZXhwIjoxNzExNjI3MDA3fQ.VE-1O5seqLCqanhgD2j7uYgQDBMEQno5odHOT-yUZ0xup75eXBolu2N_5zu64v4XKb96PtyFYdhHxCOirHurgQ`;
app.post("/api/adduser", async (req, res) => {
  try {
      const json = {
          firstName: req.body.user_meta.first_name[0],
          lastName: req.body.user_meta.last_name[0],
          username: req.body.user_meta.first_name[0],
          providerName: "Profcheck",
          role: {
              id: 3,
              name: "CUSTOMER",
              parentId: null,
              parentName: null,
              version: 0,
            },
            password:req.body.data.user_pass,
            userProfile: {
                organization: {
                    id: 70,
                    name: "N.S.O",
                    parentId: null,
                    parentName: null,
                    version: 0,
                    logo: "",
                },
                email: req.body.data.user_email,
                phone: req.body.user_meta.billing_phone[0],
                providerName: "Profcheck",
            },
        };
        const users = await axios.get('https://bof.profchecksys.com/user/search/summary')
        if(users.data&&Array.isArray(users.data)&&users.data.find(user=>user.userProfile.email==json.userProfile.email)){
            res.send('ok')
            return
        }
    const results = await axios.post("https://bof.profchecksys.com/user", json);
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
