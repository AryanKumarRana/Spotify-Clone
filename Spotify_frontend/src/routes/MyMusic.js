import { useState, useEffect } from "react";
import SingleSongCard from "../components/shared/SingleSongCard";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import LoggedInContainer from "../containers/LoggedInContainer";

// const songData = [
//   {
//     thumbnail:
//       "https://plus.unsplash.com/premium_photo-1682745684712-9a39c84ee54c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
//     name: "Curtain",
//     artist: "Ed Sheeran",
//   },
// ];

const MyMusic = () => {
  const [songData, setSongData] = useState([]);

  useEffect(() => {
    //we have used await in this but await can be used inside a async function but in useEffect we can't use async directly with it so to done this inside of the useEffect we have to define a helper function which we can async and inside that we can use await response.
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest("/song/get/mysongs");
      // console.log(response.data);
      setSongData(response.data);
    };
    getData();
  }, []);

  return (
    <LoggedInContainer currentActiveScreen="myMusic">
      <div className="text-white text-xl font-semibold pb-4 pl-2 pt-8">My Songs</div>
      <div className="space-y-3">
        {songData.map((item) => {
          return <SingleSongCard info={item} playSound={() => {}} />;
        })}
      </div>
    </LoggedInContainer>
  );
};

// const MyMusic = () => {
//   const [songData, setSongData] = useState([]);
//   const [soundPlayed, setSoundPlayed] = useState(null);

//   const playSound = (songSrc) => {
//     if(soundPlayed){
//       soundPlayed.stop();
//     }
//     let sound = new Howl({
//       src: [songSrc],
//       html5: true,
//     });
//     setSoundPlayed(sound);
//     sound.play();
//   };

//   useEffect(() => {
//     //we have used await in this but await can be used inside a async function but in useEffect we can't use async directly with it so to done this inside of the useEffect we have to define a helper function which we can async and inside that we can use await response.
//     const getData = async () => {
//       const response = await makeAuthenticatedGETRequest("/song/get/mysongs");
//       // console.log(response.data);
//       setSongData(response.data);
//     };
//     getData();
//   }, []);

//   return (
//     <div className="h-full w-full flex">
//       {/* this is the div of side coloumn */}
//       <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
//         <div>
//           <div className="logoDiv p-6">
//             <img src={spotify_logo} alt="spotify_logo" width={125} />
//           </div>
//           <div className="py-5">
//             <IconText iconName={"material-symbols:home"} displayText={"Home"} />
//             <IconText
//               iconName={"material-symbols:search-rounded"}
//               displayText={"Search"}
//             />
//             <IconText iconName={"icomoon-free:books"} displayText={"Library"} />
//             <IconText
//               iconName={"material-symbols:library-music-sharp"}
//               displayText={"My Music"}
//               active
//             />
//           </div>
//           <div className="pt-5">
//             <IconText
//               iconName={"material-symbols:add-box"}
//               displayText={"Create Playlist"}
//             />
//             <IconText
//               iconName={"mdi:cards-heart"}
//               displayText={"Liked Songs"}
//             />
//           </div>
//         </div>
//         <div className="px-5">
//           <div className="border border-gray-400 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center hover:border-white hover:border-double cursor-pointer">
//             <Icon icon="carbon:earth-europe-africa" />
//             <div className="ml-2 text-sm font-semibold">English</div>
//           </div>
//         </div>
//       </div>
//       {/* this is the div of main body coloumn */}
//       <div className="h-full w-4/5 bg-app-black overflow-auto">
//         <div className="navbar w-full h-1/10 bg-black bg-opacity-30 flex items-center justify-end">
//           <div className="w-1/2 flex h-full">
//             <div className="flex space-around justify-arond items-left">
//               <IconText iconName={"material-symbols:arrow-back-ios-rounded"} />
//               <IconText
//                 iconName={"material-symbols:arrow-forward-ios-rounded"}
//               />
//             </div>
//           </div>
//           <div className="w-1/2 flex h-full">
//             <div className="w-2/3 flex justify-around items-center">
//               <TextWithHover displayText={"Premium"} />
//               <TextWithHover displayText={"Support"} />
//               <TextWithHover displayText={"Download"} />
//               <div className="h-1/2 border-r border-white"></div>
//             </div>
//             <div className="w-1/3 flex justify-around h-full items-center">
//               <TextWithHover displayText={"Upload Song"} />
//               <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center font-semibold cursor-pointer">
//                 <Link to="/Login">AR</Link>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="content p-8 overflow-auto">
//           <div className="text-white text-xl font-semibold pb-4 pl-2">
//             My Songs
//           </div>
//           <div className="space-y-3">
//             {songData.map((item) => {
//               return <SingleSongCard info={item} playSound={playSound} />;
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

export default MyMusic;
