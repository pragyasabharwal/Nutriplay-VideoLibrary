import { Link } from "react-router-dom";
import { useDataContext } from "../context/DataContext";
import { useAuth } from "../context/AuthProvider";
import "./Nav.css";

export function Nav() {
  const { state, dispatch } = useDataContext();
  const { login, setInitials , setupAuthHeaderForServiceCalls, setLogin, setToken} = useAuth();

  return (
    <nav>
      <i
        class="fas fa-bars"
        onClick={() => dispatch({ type: "TOGGLE_NAV" })}
      ></i>
      <Link to ="/" className="title">Nutriplay</Link>
      <input autoFocus className="search" placeholder={"Search"} />
      <Link to="/login" className="login"
      onClick={() => {
        localStorage.removeItem("login");
        setInitials("");
        setupAuthHeaderForServiceCalls(null);
        setLogin(false);
        setToken(null);
      }}>
        {login ? "Logout" : "Login"}
      </Link>
      <div className="nav-toggle-display">
        <div className={state.displayNav ? "nav-disable" : "nav"}>
          <i
            class="fas fa-times above"
            onClick={() => dispatch({ type: "TOGGLE_NAV" })}
          ></i>
          <Link to="/">
            <li className="home">
              <i class="fas fa-home"></i>Home
            </li>
          </Link>
          <Link to="/library">
            <li>
              <i class="fab fa-youtube"></i>
              <span>Library</span>
            </li>
          </Link>
          <Link to="/history">
            <li>
              <i class="fas fa-history"></i>
              <span>History</span>
            </li>
          </Link>
          <Link to="/watch-later">
            <li>
              <i class="fas fa-clock"></i>
              <span>Watch later</span>
            </li>
          </Link>
          <Link to="/liked">
            <li>
              <i class="far fa-thumbs-up"></i>
              <span>Liked videos</span>
            </li>
          </Link>
          <li>
            <Link to="/saved">
              <i class="far fa-bookmark"></i>
              <span>Saved videos</span>
            </Link>
          </li>
          <li style={{ cursor: "pointer" }}>
            <span onClick={() => dispatch({ type: "SHOW_MORE" })}>
              <i
                class={state.show ? "fas fa-chevron-up" : "fas fa-chevron-down"}
              ></i>
              {state.show ? "Show less" : "Show more"}
            </span>
          </li>
          {state.show &&
            state.playObj.map((item) => {
              return (
                <>
                  <Link to={`/playlists/${item.name}`}>
                    <li>
                      <svg
                        viewBox="0 0 24 24"
                        style={{ width: "1.5em", height: "1.5em" }}
                      >
                        <g class="style-scope yt-icon">
                          <path d="M3.67 8.67h14V11h-14V8.67zm0-4.67h14v2.33h-14V4zm0 9.33H13v2.34H3.67v-2.34zm11.66 0v7l5.84-3.5-5.84-3.5z"></path>
                        </g>
                      </svg>
                      <span>{item.name}</span>
                    </li>
                  </Link>
                </>
              );
            })}
        </div>
      </div>
    </nav>
  );
}
