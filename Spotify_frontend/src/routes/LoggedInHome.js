import LoggedInContainer from "../containers/LoggedInContainer";
import React from "react";
import { Link } from "react-router-dom";

const focusCardsData = [
  {
    title: "Peaceful Piano",
    description: "Relax and indulge with beautiful piano pieces",
    artist: "hritik",
    backgroundColor: "coral",
    imgUrl: "https://images.unsplash.com/photo-1588031710787-5d6e7feac7d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    title: "Instrumental Study",
    description: "Focus with sofy study music in the backgrounds",
    artist: "jacob jason",
    backgroundColor: "cyan",
    imgUrl: "https://images.unsplash.com/photo-1540829016269-e05670f88adb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
  },
  {
    title: "Deep Focus",
    description: "Keep calm, motivated and focused",
    artist: "amir sidiqui",
    backgroundColor: "grey",
    imgUrl: "https://images.unsplash.com/photo-1562603820-5afce6c86210?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
  },
  {
    title: "Focus Flow",
    description: "Up tempo instrumental hip hop beats",
    artist: "hola hola",
    backgroundColor: "black",
    imgUrl: "https://images.unsplash.com/photo-1495434942214-9b525bba74e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    title: "Beats to think to",
    description: "Focus with deep techno and tech house",
    artist: "tom cruise",
    backgroundColor: "maroon",
    imgUrl: "https://images.unsplash.com/photo-1596300919357-77dbd158c7b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
  },
];

const spotifyPlaylistsCardsData = [
  {
    title: "Talking Heads",
    description: "More Songs About Buildings and Food",
    artist: "hritik",
    backgroundColor: "purple",
    imgUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Skinless",
    description: "Trample The Weak, Hurdle the Dead",
    artist: "jacob jason",
    backgroundColor: "grey",
    imgUrl: "https://images.unsplash.com/photo-1597770277985-2f5ab9f747e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    title: "The Firesign Theatre",
    description: "Don't Crush That Dwarf, Hand Me the Pliers",
    artist: "amir sidiqui",
    backgroundColor: "red",
    imgUrl: "https://images.unsplash.com/photo-1595491542937-3de00ac7e08a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
  },
  {
    title: "Gaza",
    description: "I Don't Care Where I Go When I Die",
    artist: "hola hola",
    backgroundColor: "magenta",
    imgUrl: "https://images.unsplash.com/photo-1598387180437-80388ae0df12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80",
  },
  {
    title: "Devo",
    description: "Q: Are We Not Men? A: We Are Devo!",
    artist: "tom cruise",
    backgroundColor: "orange",
    imgUrl: "https://images.unsplash.com/photo-1597374459522-88a0516f6873?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
];

const soundOfIndiaCardsData = [
  {
    title: "Modest Mouse",
    description: "We Were Dead Before the Ship Even Sank",
    artist: "hritik",
    backgroundColor: "black",
    imgUrl: "https://plus.unsplash.com/premium_photo-1663036539623-560d070d949b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    title: "AC/DC",
    description: "For Those About to Rock (We Salute You)",
    artist: "jacob jason",
    backgroundColor: "orange",
    imgUrl: "https://images.unsplash.com/photo-1598387077659-74a3ea1370b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80",
  },
  {
    title: "Master",
    description: "On the Seventh Day God Created... Master",
    artist: "amir sidiqui",
    backgroundColor: "blue",
    imgUrl: "https://images.unsplash.com/photo-1572377200231-6525599ecaa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2004&q=80",
  },
  {
    title: "Ministry",
    description: "The Mind Is a Terrible Thing to Taste",
    artist: "hola hola",
    backgroundColor: "coral",
    imgUrl: "https://images.unsplash.com/photo-1583604518057-6c31e12d4e30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    title: "NOFX",
    description: "They've Actually Gotten Worse Live!",
    artist: "tom cruise",
    backgroundColor: "teal",
    imgUrl: "https://plus.unsplash.com/premium_photo-1661347896661-af23bfb7c5cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
  },
];

const LoggedInHomeComponent = () => {
  return (
    <LoggedInContainer currentActiveScreen="home">
      <PlaylistView titleText="Focus" cardsData={focusCardsData} />
      <PlaylistView
        titleText="Spotify Playlists"
        cardsData={spotifyPlaylistsCardsData}
      />
      <PlaylistView
        titleText="Sound of India"
        cardsData={soundOfIndiaCardsData}
      />
    </LoggedInContainer>
  );
};

//   const [isPaused, setIsPaused] = useState(true);

//   const playSound = (songSrc) => {
//     if (soundPlayed) {
//       soundPlayed.stop();
//     }
//     let sound = new Howl({
//       src: [songSrc],
//       html5: true,
//     });
//     setSoundPlayed(sound);
//     sound.play();
//   };

//   const pauseSound = () => {
//     soundPlayed.pause();
//   };

//   const togglePlayPause = () => {
//     if(isPaused){
//       playSound("https://res.cloudinary.com/duu2eiwup/video/upload/v1697005942/i7ftaba2agvpe6xys2wj.mp3");
//       setIsPaused(false);
//     } else{
//       pauseSound();
//       setIsPaused(true);
//     }
//   };
//   return (
//     <div className="h-full w-full bg-app-black">
//       {/* this is the div of side coloumn */}
//       <div className="h-9/10 w-full flex">
//         <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
//           <div>
//             <div className="logoDiv p-6">
//               <img src={spotify_logo} alt="spotify_logo" width={125} />
//             </div>
//             <div className="py-5">
//               <IconText
//                 iconName={"material-symbols:home"}
//                 displayText={"Home"}
//               />
//               <IconText
//                 iconName={"material-symbols:search-rounded"}
//                 displayText={"Search"}
//                 active
//               />
//               <IconText
//                 iconName={"icomoon-free:books"}
//                 displayText={"Library"}
//               />
//               <IconText
//                 iconName={"material-symbols:library-music-sharp"}
//                 displayText={"My Music"}
//               />
//             </div>
//             <div className="pt-5">
//               <IconText
//                 iconName={"material-symbols:add-box"}
//                 displayText={"Create Playlist"}
//               />
//               <IconText
//                 iconName={"mdi:cards-heart"}
//                 displayText={"Liked Songs"}
//               />
//             </div>
//           </div>
//           <div className="px-5">
//             <div className="border border-gray-400 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center hover:border-white hover:border-double cursor-pointer">
//               <Icon icon="carbon:earth-europe-africa" />
//               <div className="ml-2 text-sm font-semibold">English</div>
//             </div>
//           </div>
//         </div>
//         {/* this is the div of main body coloumn */}
//         <div className="h-full w-4/5 bg-app-black overflow-auto">
//           <div className="navbar w-full h-1/10 bg-black bg-opacity-30 flex items-center justify-end">
//             <div className="w-1/2 flex h-full flex justify-center flex-col">
//               <div className="flex space-around justify-left px-5 ">
//                 <Icon
//                   icon={"material-symbols:arrow-back-ios-rounded"}
//                   fontSize={26}
//                   className="cursor-pointer text-gray-400 hover:text-white"
//                 />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                 <Icon
//                   icon={"material-symbols:arrow-forward-ios-rounded"}
//                   fontSize={26}
//                   className="cursor-pointer text-gray-500 hover:text-white"
//                 />
//               </div>
//             </div>
//             <div className="w-1/2 flex h-full">
//               <div className="w-2/3 flex justify-around items-center">
//                 <TextWithHover displayText={"Premium"} />
//                 <TextWithHover displayText={"Support"} />
//                 <TextWithHover displayText={"Download"} />
//                 <div className="h-1/2 border-r border-white"></div>
//               </div>
//               <div className="w-1/3 flex justify-around h-full items-center">
//                 <TextWithHover displayText={"Upload Song"} />
//                 <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center font-semibold cursor-pointer">
//                   <Link to="/Login">AR</Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="content p-8 pt-0 overflow-auto">
//             <PlaylistView titleText="Focus" cardsData={focusCardsData} />
//             <PlaylistView
//               titleText="Spotify Playlists"
//               cardsData={spotifyPlaylistsCardsData}
//             />
//             <PlaylistView
//               titleText="Sound of India"
//               cardsData={soundOfIndiaCardsData}
//             />
//           </div>
//         </div>
//       </div>
//       <div className="w-full h-1/10 bg-black bg-opacity-30 text-white flex items-center px-4">
//         <div className="w-1/3 flex items-center">
//           <img
//             src="https://plus.unsplash.com/premium_photo-1682745684712-9a39c84ee54c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
//             alt="currentSongThumbnail"
//             className="h-14 w-14 rounded"
//           />
//           <div className="pl-4">
//             <div className="text-sm hover:underline cursor-pointer">
//               Curtains
//             </div>
//             <div className="text-xs text-gray-500 hover:underline cursor-pointer">
//               Er Sheeran
//             </div>
//           </div>
//         </div>
//         <div className="w-1/2 flex justify-center h-full flex-col items-center">
//           <div className="flex w-1/3 justify-between items-center">
//             {/* controls for the playing song go here */}
//             <Icon
//               icon="ph:shuffle-fill"
//               fontSize={30}
//               className="cursor-pointer text-gray-500 hover:text-white"
//             />
//             <Icon
//               icon="mdi:skip-previous-outline"
//               fontSize={30}
//               className="cursor-pointer text-gray-500 hover:text-white"
//             />
//             <Icon
//               icon={isPaused?"ic:baseline-play-circle":"ic:baseline-pause-circle"}
//               fontSize={50}
//               className="cursor-pointer text-gray-500 hover:text-white"
//               onClick={togglePlayPause}
//             />
//             <Icon
//               icon="mdi:skip-next-outline"
//               fontSize={30}
//               className="cursor-pointer text-gray-500 hover:text-white"
//             />
//             <Icon
//               icon="ic:twotone-repeat"
//               fontSize={30}
//               className="cursor-pointer text-gray-500 hover:text-white"
//             />
//           </div>
//           {/* <div>Progress Bar Here</div> */}
//         </div>
//         <div className="w-1/4 flex justify-end">Hello</div>
//       </div>
//     </div>
//   );
// };

const PlaylistView = ({ titleText, cardsData }) => {
  return (
    <div className="text-white mt-8">
      <div className="text-2xl font-semibold mb-5">{titleText}</div>
      <div className="w-full flex justify-between space-x-4">
        {
          //CardData will be an array
          cardsData.map((item) => {
            return (
              <Card
                title={item.title}
                description={item.description}
                imgUrl={item.imgUrl}
                artist={item.artist}
                backgroundColor={item.backgroundColor}
              />
            );
          })
        }
      </div>
    </div>
  );
};

const Card = ({ title, artist, description, imgUrl, backgroundColor }) => {
  const encodedUrl = encodeURIComponent(imgUrl);

  return (
    <div>
    <Link to={`/Explore/${title}/${artist}/${description}/${backgroundColor}/${encodedUrl}`}>
    <div className="bg-black bg-opacity-40 w-full lg:w-5/5 p-4 rounded-lg">
      <div className="px-24 sm:px-10"></div>
      <div className="pb-4 pb-2">
        <img className="w-full rounded-md" src={imgUrl} alt="label" />
      </div>
      <div className="text-white font-semibold py-3">{title}</div>
      <div className="text-gray-500 text-sm">{description}</div>
    </div>
    </Link>
    </div>
  );
};

export default LoggedInHomeComponent;
