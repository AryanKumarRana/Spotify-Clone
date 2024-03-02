import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../components/shared/TextInput";
import CloudinaryUpload from "../components/shared/CloudinaryUpload";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";
import LoggedInContainer from "../containers/LoggedInContainer";

const UploadSong = () => {
  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [uploadedSongFileName, setUploadedSongFileName] = useState();
  const navigate = useNavigate();

  const submitSong = async () => {
    const data = { name, thumbnail, track: playlistUrl };
    const response = await makeAuthenticatedPOSTRequest("/song/create", data);
    if(response.err){
      alert("Could not create song");
      return;
    }
    alert("Success");
    navigate("/home");

  };

  return (
    <LoggedInContainer currentActiveScreen="UploadSong">
<div className="content p-8 pt-0 overflow-auto">
          <div className="text-2xl font-semibold mb-5 text-white mt-8">
            Upload Your Music
          </div>
          <div className="sm:w-2/3 flex flex-col sm:flex-row sm:space-x-3">
            <div className="sm:w-1/2">
              <TextInput
                label="Name"
                labelClassName={"text-white"}
                placeholder="Name"
                value={name}
                setValue={setName}
              />
            </div>
            <div className="sm:w-1/2">
              <TextInput
                label="Thumbnail"
                labelClassName={"text-white"}
                placeholder="Thumbnail"
                value={thumbnail}
                setValue={setThumbnail}
              />
            </div>
          </div>
          <div className="py-5">
            {uploadedSongFileName ? (
              <div className="bg-white rounded-full p-3 w-1/3">
                {uploadedSongFileName.substring(0, 20)}...
              </div>
            ) : (
              <CloudinaryUpload
                setUrl={setPlaylistUrl}
                setName={setUploadedSongFileName}
              />
            )}
          </div>
          <div
            className="bg-white w-32 sm:w-40 flex items-center justify-center p-3 sm:p-4 rounded-full cursor-pointer font-semibold"
            onClick={submitSong}
          >
            Submit Song
          </div>
        </div>
</LoggedInContainer>

  )
  // console.log(window);
  // console.log(window.cloudinary);
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
//               active
//             />
//             <IconText iconName={"icomoon-free:books"} displayText={"Library"} />
//             <IconText
//               iconName={"material-symbols:library-music-sharp"}
//               displayText={"My Music"}
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
//         <div className="content p-8 pt-0 overflow-auto">
//           <div className="text-2xl font-semibold mb-5 text-white mt-8">
//             Upload Your Music
//           </div>
//           <div className="w-2/3 flex space-x-3">
//             <div className="w-1/2">
//               <TextInput
//                 label="Name"
//                 labelClassName={"text-white"}
//                 placeholder="Name"
//                 value={name}
//                 setValue={setName}
//               />
//             </div>
//             <div className="w-1/2">
//               <TextInput
//                 label="Thumbnail"
//                 labelClassName={"text-white"}
//                 placeholder="Thumbnail"
//                 value={thumbnail}
//                 setValue={setThumbnail}
//               />
//             </div>
//           </div>
//           <div className="py-5">
//             {uploadedSongFileName ? (
//               <div className="bg-white rounded-full p-3 w-1/3">
//                 {uploadedSongFileName.substring(0, 20)}...
//               </div>
//             ) : (
//               <CloudinaryUpload
//                 setUrl={setPlaylistUrl}
//                 setName={setUploadedSongFileName}
//               />
//             )}
//           </div>
//           <div
//             className="bg-white w-40 flex items-center justify-center p-4 rounded-full cursor-pointer font-semibold"
//             onClick={submitSong}
//           >
//             Submit Song
//           </div>
//         </div>
//       </div>
//     </div>
//   );
};

export default UploadSong;
