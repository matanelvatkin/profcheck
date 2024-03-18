const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const axios = require("axios");
const PORT = process.env.PORT || 5556;
const BASE_URL = process.env.BASE_URL;
app.use(express.json());
app.use(cors());
axios.defaults.headers.common.Authorization = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ5YWNoaW5lIiwiZXhwIjoxNzExMDQwNTQzfQ.JhlQcHbeIG2tA2DWclCJf8nxJuphcNdo-uWtzMliU_n5znGwAG1c6ASIg31r4lycjCwEBwKEGC51bfUZmQ0Fgg`;
app.post("/api/adduser", async (req, res) => {
  try {
    const json = {
      firstName: req.body.user_meta.first_name[0],
      lastName: req.body.user_meta.last_name[0],
      username: req.body.data.user_nickname,
      providerName: "",
      role: {
        id: 3,
        name: "CASTOUMER",
        parentId: null,
        parentName: null,
        version: 0,
      },
      password: "thigusNkcsu123",
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
        providerName: "",
      },
    };
    const res = await axios.post("https://bof.profchecksys.com/user", json);
    console.log(res);

    res.send("ok");
  } catch (error) {}
});
app.post("/api/addcheck", (req, res) => {
  console.log("create check", req.params);
});

app.listen(PORT, () => {
  console.log("listening on port 5556");
});
