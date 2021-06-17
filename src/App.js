import "./App.css";
import { LikedVideos } from "./components/LikedVideos";
import { Nav } from "./components/nav/Nav";
import { WatchLater } from "./components/watchLater/WatchLater";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/home/Home";
import { VideoPlay } from "./components/videoplay/VideoPlay";
import { SavedVideos } from "./components/SavedVideos";
import { History } from "./components/history/History";
import { Library } from "./components/library/Library";
import { Playlist } from "./components/playlist/Playlist";
import { Login } from "./components/auth/login/Login"
import { Signup } from "./components/auth/signup/Signup";
import { PrivateRoute } from "./components/auth/PrivateRoute"

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <PrivateRoute path="/watch-later" element={<WatchLater />} />
        <PrivateRoute path="/liked" element={<LikedVideos />} />
        <PrivateRoute path="/saved" element={<SavedVideos />} />
        <Route path="/videos/:videoId" element={<VideoPlay />} />
        <PrivateRoute path="/history" element={<History />} />
        <PrivateRoute path="/library" element={<Library />} />
        <Route path="/playlists/:name" element = {<Playlist />} />
      </Routes>
    </div>
  );
}

export default App;
