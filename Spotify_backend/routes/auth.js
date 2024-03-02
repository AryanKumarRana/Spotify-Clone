const express = require("express");
const router = express.Router();  //we can give simple express() but then it will import all packgaes inside it so we just want to import router inside express package
const User = require("../models/User");
const bcrypt = require("bcrypt");
const {getToken} = require("../utils/helpers")


//this post route will help to register a user.
router.post("/register", async (req, res) => {
    //this code is run when the /register api is called as a POST request.
    //my req.body will be of the format (email, password, firstname, lastname, username
    const {email, password, firstName, lastName, username} = req.body;

    //Step 2: does a user with this email already exist? it yes, we throw an error,
    const user = await User.findOne({email: email});  //so in this findOne will find a user with email same as email of my req.body one then we get to know that user is already exist
    //this await is writen b/c with functions like User.something we use await instead it will not give data that is asyncronos.
    if(user) {
        return res.status(403).json({error: "A user with this email already exist"}); //with res.json we can send data to json and by default the status code will come 200  
    }
    //this is a valid request and user with this email is not exist
    //step 3: create a new user in the db
    //step 3.1: we do not store passwords in plain text (so we will convert plain text password to a hash.)
    const hashedPassword = await bcrypt.hash(password, 10); //bcrypt is a library of hash  npm i bcrypt
    const newUserData = {email, password: hashedPassword, firstName, lastName, username};
    const newUser = await User.create(newUserData);

    //step 4: we want to create a token to return to the user.
    const token = await getToken(email, newUser);

    //step 5: return the rsult to the user
    const userToReturn = {...newUser.toJSON(), token};
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
});

router.post("/login", async (req, res) => {
    //Step 1: get email and password sent by user from req.body
    const {email, password} = req.body;
    //step 2: check if a user with the given email exists, if not, the credentials are invalid.
    const user = await User.findOne({email: email});
    if (!user){
        return res.status(403).json({err: "Invalid credentials"});
    }
    //step 3: if the user exists, check if the password is correct, if not, then credentials are invalid. This is a tricky step as we have converted password in hashed form but we can't convert it back into plain form to check the password that user is entering while doing login.
    //so we will not check plain password equal to plain password but as we know the password entered during signup by user is already converted into hash so now to check when user enter plain password during login then we also convert it into hash form and then we check that are those both hash passwords are same or not.
    //bcrypy enables us to compare passwords in hash form.
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(403).json({err: "Invalid credentials"});
    }

    //step 4: if the credentials are correct, return a token to the user.
    const token = await getToken(user.email, user);
    const userToReturn = {...user.toJSON(), token};
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
});

module.exports = router;
