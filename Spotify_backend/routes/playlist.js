const express = require("express");
const passport = require("passport");
const User = require("../models/User");
const Playlist = require("../models/Playlist");
const Song = require("../models/Song");

const router = express.Router();

// create a playlist
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const currentUser = req.user;
    const { name, thumbnail, songs } = req.body;
    if (!name || !thumbnail || !songs) {
      return res.status(301).json({ err: "Insufficient Data" });
    }
    const playlistData = {
      name,
      thumbnail,
      songs,
      owner: currentUser._id,
      collaborators: [],
    };
    const playlist = await Playlist.create(playlistData);
    return res.status(200).json(playlist);
  }
);

// get a playlist by 10
//we will get the playlist Id as a route parameter and we will return the playlist having that id
// /something/something/something ---> exact match to go on the link and if anything does not same then will not work
// if we are doing /playlist/get/playlist/:playlistId (focus on the :) ===> this means that the playlistid is now a variable to which we can assign any value.
//if you call anything of the format /playlist/get/playlist/afadfa (afadfa can be anything)
//if you called /playlist/get/playlist/afadfa, the playlistId varibale get assgned the value
router.get(
  "/get/playlist/:playlistId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    //this conscept is called req.params
    const playlistId = req.params.playlistId;
    //i need to find a playlist with the id --> playlistId
    const playlist = await Playlist.findOne({ _id: playlistId }).populate({
      path: "songs",
      populate: { path: "artist" },
    });
    if (!playlist) {
      return res.status(301).json({ err: "Invalid ID" });
    }
    return res.status(200).json(playlist);
  }
);

//get all playlists made by me
router.get(
  "/get/me",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const artistId = req.user._id;

    const playlists = await Playlist.find(
      { owner: artistId }).populate("owner");
    return res.status(200).json({ data: playlists });
  }
);

//get all playlists made by an artist
router.get(
  "/get/artist/:artistId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const artistId = req.params.artistId;
    const artist = await User.findOne({ _id: artistId });
    if (!artist) {
      return res.status(301).json({ err: "Invalid Artist Id" });
    }
    const playlists = await Playlist.find({ owner: artistId });
    return res.status(200).json({ data: playlists });
  }
);

//add a song to a playlist
router.post(
  "/add/song",
  passport.authenticate("jwt", {session: false}),
  async (req, res) => {
    const currentUser = req.user;
    const { playlistId, songId } = req.body;
    //step 0: get the playlist if valid
    const playlist = await Playlist.findOne({_id: playlistId});
    if (!playlist) {
      return res.status(304).json({ err: "Playlist does not exist" });
    }

    // console.log(playlist);
    // console.log(currentUser);
    // console.log(playlist.owner);
    // console.log(currentUser._id);
    // console.log(playlist.owner == currentUser._id);    //   it is false because these both are objects and objects are not comparable, if they are strings then they will show true
    // console.log(typeof playlist.owner);                    it is object
    // console.log(playlist.owner.equals(currentUser._id));   it is true

    //step1: check if currentuser owns the playlist or is a collaborator
    if (
      !playlist.owner.equals(currentUser._id) &&
      !playlist.collaborators.includes(currentUser._id)
    ) {
      return res.status(400).json({ err: "Not allowed" });
    }
    //step2: check if the song is a valid song
    const song = await Song.findOne({_id: songId});
    if (!song) {
      return res.status(304).json({ err: "Song does not exist" });
    }
    //step3: we can now simply add the song to the playlist
    playlist.songs.push(songId);
    await playlist.save();
    return res.status(200).json(playlist);
  }
);
module.exports = router;
