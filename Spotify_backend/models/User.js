const mongoose = require("mongoose");
//how to create a model
//step1: require mongoose
//step2: create a mongoose schema(structure of a User file)
//step3: create a model

const User = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        private: true,
    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    likedSongs: {
        type: String,
        default: "",
    },
    likedPlaylists: {
        type: String,
        default: "",
    },
    subscribedArtists: {
        type: String,
        default: "",
    },
});


const UserModel = mongoose.model("User", User);                //it consists of 1st parameter as the name that you want to set of this model(or collection) and 2nd is schema

module.exports = UserModel;