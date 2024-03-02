import spotify_logo from "../assests/images/spotify_logo.png";
import { useContext, useLayoutEffect, useState, useRef } from "react";
import { Icon } from "@iconify/react";
import { Howl } from "howler";
import IconText from "../components/shared/IconText";
import { Link } from "react-router-dom";
import TextWithHover from "../components/shared/TextWithHover";
import songContext from "../contexts/songContext";
import CreatePlaylistModal from "../modals/CreatePlaylistModal";
import AddToPlaylistModal from "../modals/AddToPlaylistModal";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";

const LoggedInContainer = ({ children, currentActiveScreen }) => {
  const [createPlaylistModalOpen, setCreatePlaylistModalOpen] = useState(false);
  const [addToPlaylistModalOpen, setAddToPlaylistModalOpen] = useState(false);

  const {
    currentSong,
    setCurrentSong,
    soundPlayed,
    setSoundPlayed,
    isPaused,
    setIsPaused,
  } = useContext(songContext);
  //   console.log(currentSong);

  const firstUpdate = useRef(true);

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    if (!currentSong) {
      return;
    }
    changeSong(currentSong.track);
  }, [currentSong && currentSong.track]);

  const addSongToPlaylist = async (playlistId) => {
    const songId = currentSong._id;

    const payload = { playlistId, songId };
    const response = await makeAuthenticatedPOSTRequest(
      "/playlist/add/song",
      payload
    );
    if (response._id_) {
      setAddToPlaylistModalOpen(false);
    }
  };

  const playSound = () => {
    if (!soundPlayed) {
      return;
    }
    soundPlayed.play();
  };

  const changeSong = (songSrc) => {
    if (soundPlayed) {
      soundPlayed.stop();
    }
    let sound = new Howl({
      src: [songSrc],
      html5: true,
    });
    setSoundPlayed(sound);
    sound.play();
    setIsPaused(false);
  };

  const pauseSound = () => {
    soundPlayed.pause();
  };

  const togglePlayPause = () => {
    if (isPaused) {
      playSound();
      setIsPaused(false);
    } else {
      pauseSound();
      setIsPaused(true);
    }
  };
  const logout = () => {
    // Delete the token from the cookie
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    // Redirect to the login page or perform any other desired action
    window.location.href = '/login';
  }

  return (
    <div className="h-full w-full bg-app-black">
      {createPlaylistModalOpen && (
        <CreatePlaylistModal
          closeModal={() => {
            setCreatePlaylistModalOpen(false);
          }}
        />
      )}
      {addToPlaylistModalOpen && (
        <AddToPlaylistModal
          closeModal={() => {
            setAddToPlaylistModalOpen(false);
          }}
          addSongToPlaylist={addSongToPlaylist}
        />
      )}
      {/* this is the div of side coloumn */}
      <div
        className={`${
          currentSong ? "h-9/10" : "h-full"
        } w-full flex flex-col sm:flex-row`}
      >
        <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10 hidden sm:flex">
          <div>
            <div className="logoDiv p-6">
              <img src={spotify_logo} alt="spotify_logo" width={125} />
            </div>
            <div className="py-5">
              <IconText
                iconName={"material-symbols:home"}
                displayText={"Home"}
                targetLink={"/home"}
                // active={true}
                active={currentActiveScreen === "home"}
              />
              <IconText
                iconName={"material-symbols:search-rounded"}
                displayText={"Search"}
                targetLink={"/search"}
                active={currentActiveScreen === "search"}
              />
              <IconText
                iconName={"icomoon-free:books"}
                displayText={"Library"}
                targetLink={"/library"}
                active={currentActiveScreen === "library"}
              />
              <IconText
                iconName={"material-symbols:library-music-sharp"}
                displayText={"My Music"}
                targetLink={"/mymusic"}
                active={currentActiveScreen === "myMusic"}
              />
            </div>
            <div className="pt-5">
              <IconText
                iconName={"material-symbols:add-box"}
                displayText={"Create Playlist"}
                onClick={() => {
                  setCreatePlaylistModalOpen(true);
                }}
              />
              <IconText
                iconName={"mdi:cards-heart"}
                displayText={"Liked Songs"}
              />
              <div className="pt-10 p-6">
                <button className="bg-white font-semibold text-gray-700 p-2 px-7 rounded-full hover:text-black hover:bg-gray-400" onClick={logout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
          <div className="px-5">
            <div className="border border-gray-400 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center hover:border-white hover:border-double cursor-pointer">
              <Icon icon="carbon:earth-europe-africa" />
              <div className="ml-2 text-sm font-semibold">English</div>
            </div>
          </div>
        </div>
        {/* this is the div of main body coloumn */}
        <div className="h-9/10 sm:h-full w-full sm:w-4/5 bg-app-black overflow-auto">
          <div className="navbar w-full h-1/10 bg-black bg-opacity-30 flex items-center justify-end">
            <div className="w-1/2 flex h-full flex justify-center flex-col hidden sm:flex">
              <div className="flex space-around justify-left px-5 ">
                <Icon
                  icon={"material-symbols:arrow-back-ios-rounded"}
                  fontSize={26}
                  className="cursor-pointer text-gray-400 hover:text-white"
                />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Icon
                  icon={"material-symbols:arrow-forward-ios-rounded"}
                  fontSize={26}
                  className="cursor-pointer text-gray-500 hover:text-white"
                />
              </div>
            </div>
            <div className="w-1/2 flex h-full">
              <div className="w-3/5 flex justify-around items-center hidden lg:flex">
                <TextWithHover displayText={"Premium"} />
                <TextWithHover displayText={"Support"} />
                <TextWithHover displayText={"Download"} />
                <div className="h-1/2 border-r border-white"></div>
              </div>
              <div className="w-2/5 flex justify-around h-full items-center space-x-4 lg:space-x-0">
                <button className="bg-white font-semibold text-black p-1 px-4 rounded-full hover:bg-gray-400 sm:hidden">
                  Logout
                </button>
                <div className="hidden sm:flex">
                  <Link to="/UploadSong">
                    <TextWithHover displayText={"Upload Song"} />
                  </Link>
                </div>
                <div className="h-1/2 border-r border-white lg:hidden"></div>
                <div className="bg-white hover:bg-gray-400 rounded-full px-2 lg:px-0 w-10 h-8 lg:h-10 flex items-center justify-center font-semibold cursor-pointer">
                  <Link to="/Login">AR</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="content p-8 pt-0 overflow-auto">{children}</div>
        </div>
        <div className="h-2/10 w-full bg-black flex flex-row pb-2 sm:hidden items-center justify-center">
          <div className="flex space-between ">
            {/* <div className="logoDiv p-6">
              <img src={spotify_logo} alt="spotify_logo" width={125} />
            </div> */}
            <div className="flex py-5 px-3 space-between space-around space-x-7">
              <IconText
                iconName={"material-symbols:search-rounded"}
                displayText={"Search"}
                targetLink={"/search"}
                active={currentActiveScreen === "search"}
              />
              <IconText
                iconName={"icomoon-free:books"}
                displayText={"Library"}
                targetLink={"/library"}
                active={currentActiveScreen === "library"}
              />
              <IconText
                iconName={"material-symbols:library-music-sharp"}
                displayText={"My Music"}
                targetLink={"/mymusic"}
                active={currentActiveScreen === "myMusic"}
              />
              <IconText
                iconName={"material-symbols:add-box"}
                displayText={"Playlist"}
                onClick={() => {
                  setCreatePlaylistModalOpen(true);
                }}
              />
              {/* <div className="pt-10 p-6">
                <button className="bg-white font-semibold text-gray-700 p-2 px-7 rounded-full hover:text-black hover:bg-gray-400">Logout</button>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {currentSong && (
        <div className="w-full h-1/10 bg-black bg-opacity-30 text-white flex items-center px-4">
          <div className="w-1/3 flex items-center">
            <img
              src={currentSong.thumbnail}
              alt="currentSongThumbnail"
              className="h-10 sm:h-14 w-10 sm:w-14 rounded"
            />
            <div className="pl-4">
              <div className="text-sm hover:underline cursor-pointer">
                {currentSong.name}
              </div>
              <div className="text-xs text-gray-500 hover:underline cursor-pointer hidden sm:contents">
                {currentSong.artist.firstName +
                  " " +
                  currentSong.artist.lastName}
              </div>
            </div>
          </div>
          <div className="w-1/2 flex justify-center h-full flex-col items-center">
            <div className="flex w-4/5 sm:w-1/3 justify-between items-center">
              {/* controls for the playing song go here */}
              <Icon
                icon="ph:shuffle-fill"
                fontSize={30}
                className="cursor-pointer text-gray-500 hover:text-white"
              />
              <Icon
                icon="mdi:skip-previous-outline"
                fontSize={30}
                className="cursor-pointer text-gray-500 hover:text-white"
              />
              <Icon
                icon={
                  isPaused
                    ? "ic:baseline-play-circle"
                    : "ic:baseline-pause-circle"
                }
                fontSize={50}
                className="cursor-pointer text-gray-500 hover:text-white"
                onClick={togglePlayPause}
              />
              <Icon
                icon="mdi:skip-next-outline"
                fontSize={30}
                className="cursor-pointer text-gray-500 hover:text-white"
              />
              <Icon
                icon="ic:twotone-repeat"
                fontSize={30}
                className="cursor-pointer text-gray-500 hover:text-white"
              />
            </div>
            {/* <div>Progress Bar Here</div> */}
          </div>
          <div className="w-1/4 flex justify-end pd-4 space-x-4 items-center hidden sm:flex">
            <Icon
              icon="ic:round-playlist-add"
              fontSize={30}
              className="cursor-pointer text-gray-500 hover:text-white"
              onClick={() => {
                setAddToPlaylistModalOpen(true);
              }}
            />
            <Icon
              icon="ph:heart-bold"
              fontSize={25}
              className="cursor-pointer text-gray-500 hover:text-white"
            />
          </div>
          <div className="w-1/4 flex justify-end items-center sm:hidden">
            <Icon
              icon="ic:round-playlist-add"
              fontSize={26}
              className="cursor-pointer text-gray-500 hover:text-white"
              onClick={() => {
                setCreatePlaylistModalOpen(true);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LoggedInContainer;
