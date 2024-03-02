import { useState } from "react";
import TextInput from "../components/shared/TextInput";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";

const CreatePlaylistModal = ({ closeModal }) => {
    const [playlistName, setPlaylistName] = useState("");
    const [playlistThumbnail, setPlayistThumbnail] = useState("");

    const createPlaylist = async () => {
        const response = await makeAuthenticatedPOSTRequest("/playlist/create", {name:playlistName, thumbnail:playlistThumbnail, songs: []}
        );
        if(response._id){
            closeModal();
        }
    };


  return (
    <div
      className="absolute bg-black w-screen h-screen bg-opacity-50 flex justify-center items-center"
      onClick={closeModal}
    >
      <div
        className="bg-app-black sm:w-1/3 rounded-md p-8"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="text-white mb-5 font-semibold text-lg">
          Create Playlist
        </div>
        <div className="space-y-4 flex flex-col justify-center items-center">
          <TextInput
            label="Name"
            labelClassName={"text-white"}
            Placeholder="Playlist Name"
            value={playlistName}
            setValue={setPlaylistName}
          />
          <TextInput
            label="Thumbnail"
            labelClassName={"text-white"}
            Placeholder="Thumbnail"
            value={playlistThumbnail}
            setValue={setPlayistThumbnail}
          />
          <div className="bg-white w-1/3 rounded-lg sm:rounded flex font-semibold justify-center items-center py-2 sm:py-3 cursor-pointer" onClick={createPlaylist}>
            Create
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePlaylistModal;
