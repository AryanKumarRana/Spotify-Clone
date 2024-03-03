//express js is a package which is developed to ease tasks of nodejs
//mongoose is a package which is designed in such a way that it's task is to help to connect node js to mongodb.


//node index command to run the files in terminal
//node init command to develop the package.json file inside the folder.
//npm i express  command to install express package in this folder.
//npm i mongoose  command to install mongoose package in this folder.


const express = require("express");  //const express(it can be anything with any name) is a variable that requrire all data of package express 
const mongoose = require("mongoose");
require("dotenv").config();       //this will
const JwtStrategy = require("passport-jwt").Strategy,
    ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport"); //passport is a package under which all types of aunthentication and securtiy comes. It is a vey famous when comes to auntehnication using java
const User = require("./models/User");
const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/song");
const playlistRoutes = require("./routes/playlist");
const cors = require("cors");
const app = express();
//with the help of these two lines we have imported all code of express in our local files.
const port = 8000;  //we can send request on any port like 8080, 3000 or any ...

app.use(cors(
    {
        origin: ["https://spotify-clone-front-one.vercel.app"],
        methods: ["POST", "GET"],
        credentials: true
    }
));
app.use(express.json());       //if any data is coming in my req.body then it will convert into json format

//connect mongodb to our node app.
//mongoose.connect() takkes 2 argumnets: 1. which db to connect to (db url) ,,  2. Connections options
mongoose.connect(
    "mongodb+srv://aryanrana150303:PYpi1If155cqgoL3@cluster0.6bozywn.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0", 
    {
        useNewUrlParser: true,  //these two are lines are just setting in path of connecting to mongo so just memorize them.
        useUnifiedTopology: true,
    })
    .then((x) => {
        console.log("Connected to Mongo!");
    })
    .catch((err) => {
        console.log(err.message);
    });


//setup passport jwt from its docs
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "thisKeyIsSupposedToBeSecret";
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({_id: jwt_payload.identifier}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));



//API: GET Type : / : return text "HELLO WORLD"  //its a simple api to see how express works.
app.get("/", (req,res) => {
    //req contains all data for request
    //res contains all data for respond

    res.send("Hello Worldssss");
});

app.use("/auth", authRoutes);   //eg i write in browser like mysite.com\auth then it will start to use authRoutes and if like mysite.com\auth\register then it will start to use (just see in auth.js file)
app.use("/song", songRoutes);
app.use("/playlist", playlistRoutes);

//Now we want to tell express that our server will run on localhost:8000
app.listen (port, () => {
    console.log("app is running on port "+port);
})

//So now just run node index.js on terminal and then go to browser and search localhost:8000 and see what express can do (in short and simple)
