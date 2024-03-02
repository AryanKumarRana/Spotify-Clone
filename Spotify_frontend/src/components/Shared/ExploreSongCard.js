import { useContext } from "react";
import songContext from "../../contexts/songContext";

const ExploreSongCard = ({ info, playSound }) => {

  const { currentSong, setCurrentSong} = useContext(songContext);
  // console.log(info);
  // console.log(val);


  return (
    <div
      className="flex hover:bg-gray-400 hover:bg-opacity-20 p-2 rounded-sm"
      onClick={() => {
        setCurrentSong(info);
        // playSound(info.track);
      }}
    >
        <div className="w-full flex flex-row text-white text-lg pt-5 cursor-pointer">
            <div className="w-0 hidden sm:w-1/12 sm:h-12 bg-cover bg-left sm:flex" style={{ backgroundImage: `url("${info.thumbnail}")` }}></div>
            <div className="w-3/6 sm:w-5/12">{info.name}</div>
            <div className="w-2/6 sm:w-3/12">{info.artist.firstName + " " + info.artist.lastName}</div>
            <div className="w-0 hidden sm:w-2/12 sm:flex">23:23:2344</div>
            <div className="w-1/6 sm:w-1/12">3:44</div>
        </div>
    </div>
  );
};

export default ExploreSongCard;
