import "./output.css";
import { useState } from "react";
import LoginComponent from "./routes/Login";
import SignupComponent from "./routes/Signup";
import LoggedInHomeComponent from "./routes/LoggedInHome";
import UploadSong from "./routes/UploadSong";
import MyMusic from "./routes/MyMusic";
import SearchPage from "./routes/SearchPage";
import Library from "./routes/Library";
import HomeComponent from "./routes/Home";
import SinglePlaylistView from "./routes/SinglePlaylistView";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import songContext from "./contexts/songContext";
import { useCookies } from "react-cookie";
import ExploreComponent from "./routes/Explore";
import axios from 'axios';
// npx tailwindcss@2 build src/index.css -c tailwind.config.js -o src/output.css this command is used to update written in taliwind.config.js file to output.css
function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [cookie, setCookie] = useCookies(["token"]);
  // console.log(cookie.token);

  const removeToken = () => {
    // export function from module
    localStorage.clear();
  };

  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('deploy-mern-lwhq.vercel.app/register', {name, email, password})
    .then(result => console.log(result))
    .catch(err => console.log(err))
  }

  return (
    <div className="w-screen h-screen">
      <BrowserRouter>
        {cookie.token ? (
          //logged in routes

          <songContext.Provider
            value={{
              currentSong,
              setCurrentSong,
              soundPlayed,
              setSoundPlayed,
              isPaused,
              setIsPaused,
            }}
          >
            <Routes>
              <Route path="/home" element={<LoggedInHomeComponent />} />
              <Route path="/Explore/:title/:artist/:description/:backgroundColor/:encodedUrl" element={<ExploreComponent />} />
              <Route path="/uploadSong" element={<UploadSong />} />
              <Route path="/MyMusic" element={<MyMusic />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/library" element={<Library />} />
              <Route
                path="/playlist/:playlistId"
                element={<SinglePlaylistView />}
              />
              <Route path="*" element={<Navigate to="/home" />} />
              {/* <Route path="/bye" element={<HelloComponent/>} /> */}
            </Routes>
          </songContext.Provider>
        ) : (
          //logged out routes
          <Routes>
            <Route path="/home" element={<HomeComponent />} />
            <Route path="/Explore/:title/:artist/:description/:backgroundColor/:encodedUrl" element={<ExploreComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/signup" element={<SignupComponent />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

// const HelloComponent = () => {
//   return <div> This is Hello Component </div>
// };

export default App;

//b1i5l0l3o   name of upload present name
