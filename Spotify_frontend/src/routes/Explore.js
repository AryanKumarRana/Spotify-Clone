import LoggedInContainer from "../containers/LoggedInContainer";
import { Icon } from '@iconify/react';
import { useState, useEffect } from "react";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import ExploreSongCard from "../components/shared/ExploreSongCard";
import { useParams } from "react-router-dom";

const ExploreComponent = () => {
  const [songData, setSongData] = useState([]);
  const {title, artist, description, backgroundColor, encodedUrl} = useParams();

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
    <LoggedInContainer currentActiveScreen="home">
      <div style={{backgroundColor}} className="-ml-7 -mr-7">
        <div className="pt-12 p-10 flex flex-col sm:flex-row">
          <img
            className="rounded-sm w-60 h-60"
            src={`${encodedUrl}`}
            alt="Spotify Website"
          />
          <div className="flex flex-col justify-left p-5 pt-20 sm:pt-28">
            <div className="text-white font-semibold text-md">
              Podcast/Playlist
            </div>
            <div className="text-white font-bold text-4xl pt-3">
              {`${title}`}
            </div>
            <div className="text-gray-700 font-semibold text-md pt-3">
              {`${artist}`}
            </div>
            <div className="text-white text-sm pt-3">
              {`${description}`}
            </div>
          </div>
        </div>
      </div>
      <div className="-ml-7 -mr-7 p-8 bg-gradient-to-b from-black to-gray-900 ...">
        <div className="flex text-gray-400">
        <div className="w-0 hidden sm:w-1/12 sm:flex">#</div>
        <div className="w-3/6 sm:w-5/12">Title</div>
        <div className="w-2/6 sm:w-3/12">Artist</div>
        <div className="w-0 hidden sm:w-2/12 sm:flex">Date added</div>
        <div className="w-1/6 sm:w-1/12">
            <Icon icon="material-symbols:nest-clock-farsight-analog-outline-rounded" fontSize={22}/>
        </div>
        </div>
        <hr className="w-full text-gray-400"/>
        <div className="flex flex-col text-lg pt-5">
        {songData.map((item) => {
          return <ExploreSongCard info={item} playSound={() => {}} />;
        })}
        {/* <div className="w-0 hidden sm:w-1/12 sm:flex">01</div>
        <div className="w-3/6 sm:5/12">lkajfoal aoidf ol ahofla </div>
        <div className="w-2/6 sm:3/12">lkajdl oakfd </div>
        <div className="w-0 hidden sm:w-2/12 sm:flex mr-12">34-34-3433</div>
        <div className="w-1/6 sm:w-1/12">34:34</div> */}
        </div>
      </div>
    </LoggedInContainer>
  );
};

export default ExploreComponent;
