const { json, response } = require("express");
const express = require("express");
const client = require("mailchimp-marketing");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extend: true }));
app.use(express.static("public"));

client.setConfig({
  apiKey: process.env.API_KEY,
  server: process.env.SERVER
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", async (req, res) => {
  const firstName = req.body.firstNameInput;
  const secondName = req.body.secondNameInput;
  const email = req.body.emailInput;

  // console.log(firstName + secondName + email);
  try {
    const response = await client.lists.addListMember("bec24df926", {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: secondName,
      },
    });
    console.log(email+firstName+secondName);
    console.log(response);
    res.sendFile(__dirname + "/success.html");
  } catch (err) {
    console.log(email+firstName+secondName);
    console.log(err);
    res.sendFile(__dirname + "/failure.html");
  }
});

app.post("/failure", (req, res) => {
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

//2a2bd8c4dbef364a6b490481eb63580d-us17
//bec24df926
