const mongoose = require("mongoose");
//how to create a model
//step1: require mongoose
//step2: create a mongoose schema(structure of a User file)
//step3: create a model

const Playlist = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Types.ObjectId,   //mongoose gives us a functionality that we can take id of one model to other model.
        ref: "User",    //with this we are storing the user data.
    },
    songs: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Song",
        },
    ],
    collaborators: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
    ],
});


const PlaylistModel = mongoose.model("Playlist", Playlist);                //it consists of 1st parameter as the name that you want to set of this model(or collection) and 2nd is schema

module.exports = PlaylistModel;