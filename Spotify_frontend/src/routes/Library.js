import LoggedInContainer from "../containers/LoggedInContainer";
import { useState, useEffect } from "react";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import { Link, useNavigate } from "react-router-dom";

const Library = () => {
  const [myPlaylists, setMyPlaylists] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest("/playlist/get/me");
      setMyPlaylists(response.data);
    };
    getData();
  }, []);
  return (
    <LoggedInContainer currentActiveScreen="library">
      <div className="text-white text-xl pt-8 font-semibold">My Playlists</div>
      <div className="w-96 sm:w-full py-5 grid grid-cols-3 sm:grid-cols-5 gap-5">
        {myPlaylists.map((item) => {
          return (
            <Card
              key={JSON.stringify(item)}
              title={item.name}
              description=""
              imgUrl={item.thumbnail}
              playlistId={item._id}
            />
          );
        })}
      </div>
      <div className="sm:hidden"><button className="bg-white font-semibold text-gray-700 p-2 px-7 rounded-full hover:text-black hover:bg-gray-400"><Link to="/UploadSong">Upload Song</Link></button></div>
    </LoggedInContainer>
  );
};

const Card = ({ title, description, imgUrl, playlistId }) => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-black bg-opacity-40 w-full p-4 rounded-lg cursor-pointer px-10 sm:px-4"
      onClick={() => {
        navigate("/playlist/" + playlistId);
      }}
    >
      <div className=" px-96"></div>
      <div className="w-full pb-4">
        <img className="w-full rounded-md" src={imgUrl} alt="label" />
      </div>
      <div className="text-white font-semibold py-3">{title}</div>
      <div className="text-gray-500 text-sm">{description}</div>
    </div>
  );
};

export default Library;
