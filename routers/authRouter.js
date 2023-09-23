const express = require("express");
const router = express.Router();
//const { initializeApp } = require('firebase-admin/app');
var admin = require("firebase-admin");

var serviceAccount = require("../galauthentication-firebase-adminsdk-99q1n-a1d3c3790f.json");

const adminApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://galauthentication.firebaseio.com"
});

router.route("/loginIn/findUserByPhone").post(async(req, res) =>{
  const {phone} = req.body;
  adminApp.auth()
  .getUserByPhoneNumber(phone)
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log(`Successfully fetched user data:  ${userRecord.toJSON()}`);
    res.json("User founded");
  })
  .catch((error) => {
    res.json("user not exist");
    console.log('Error fetching user data:', error);
    
  });
})

router.route("/signIn").post(async (req, res) => {
  try {
    const { userName, password, phone } = req.body;
    console.log(
      `userName: ${userName}, password: ${password}, phone: ${phone} `
    );
    adminApp.auth()
  .createUser({
    phoneNumber: phone,
    password,
    displayName: userName,
    disabled: false,
  })
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log('Successfully created new user:', userRecord.uid);
    res.json("User created");
    
  })
  .catch((error) => {
    console.log('Error creating new user:', error);
    res.status(400).json(error)
  });
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
