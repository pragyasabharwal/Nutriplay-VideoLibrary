import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import "./Login.css";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Login = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [showpw, setShowPw] = useState(false);
  const { setUsername, setPassword, username, password, loginUser} = useAuth()

  return (
    <div className="flex-login">
      <img src="https://images.unsplash.com/photo-1455853828816-0c301a011711?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80" className="login-banner"></img>
      <div className="login-flow">
        <div className="text-lg margin-2">Hey, Login now</div>
        <form>
          <div className="user-input-wrp">
            <br />
            <input
              required
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className="inputText"
            />
            <span className="floating-label">Username</span>
          </div>
          <div className="user-input-wrp">
            <br />
              <input
                minLength = {6}
                onChange={(e) => setPassword(e.target.value)}
                type={showpw ? "text" : "password"}
                className="inputText"
                required
              />
              <span className="floating-label-password">Password</span>
              <FontAwesomeIcon
                icon={showpw ? faEyeSlash : faEye}
                className="eye"
                onClick={() => setShowPw((prev) => !prev)}
              ></FontAwesomeIcon>
          </div>
          <button
            // type="submit"
            className="button-primary margin-1"
            onClick={() => {
              loginUser();
              navigate(state ? state?.from : "/");
            }}
          >
            Login
          </button>
        </form>
        <span  className="footer-text">
          Don't have an account?{" "}
          <Link to="/signup" className="underline">
            Sign Up
          </Link>
        </span>
      </div>
    </div>
  );
};
