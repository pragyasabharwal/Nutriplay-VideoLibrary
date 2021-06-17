import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Signup.css"
import axios from "axios";

export const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPW, setConfirmPW] = useState("");
  const [email, setMail] = useState("");
  const [error, setError] = useState("");
  const [showpw, setShowPw] = useState(false);
  const [showpw2, setShowPw2] = useState(false);

  const signupUser = async () => {
    try {
      const res = await axios.post(`https://backend-nutriplay.pragyasabharwal.repl.co/signup`, {
        user: {
          email,
          username,
          password,
        },
      });
      if (res.status === 200) {
        setError(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };


  const passCheck = () => {
    if (password.length > 0 && confirmPW.length > 0) {
      password !== confirmPW && setError("Passwords do not match");
    }
  };

  return (
    <div>
    <div className="flex-login-1">
    <img src="https://images.unsplash.com/photo-1455853828816-0c301a011711?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80" className="login-banner-1"></img>
    <div className="login-flow-1">
      <div className="text-lg">Welcome, Sign up</div>
      <form>
        <div className="user-input-wrp-1">
          <br />
          <input
            onChange={(e) => setMail(e.target.value)}
            type="text"
            className="inputText-1"
            required
          />
          <span className="floating-label-1">Email</span>
        </div>
        <div className="user-input-wrp-1">
          <br />
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className="inputText-1"
            required
          />
          <span className="floating-label-1">Username</span>
        </div>
        <div className="user-input-wrp-1">
          <br />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type={showpw ? "text" : "password"}
              className="inputText-1"
              required
            />
            <span className="floating-label-password-1">Password</span>
            <FontAwesomeIcon
              icon={showpw ? faEyeSlash : faEye}
              className="eye-1"
              onClick={() => setShowPw((prev) => !prev)}
            ></FontAwesomeIcon>
          </div>
        <div className="user-input-wrp-1">
          <br />
            <input
              onChange={(e) => setConfirmPW(e.target.value)}
              type={showpw2 ? "text" : "password"}
              className="inputText-1"
              required
            />
            <span className="floating-label-password-1">Confirm Password</span>
            <FontAwesomeIcon
              icon={showpw2 ? faEyeSlash : faEye}
              className="eye-1"
              onClick={() => setShowPw2((prev) => !prev)}
            ></FontAwesomeIcon>
          </div>
        <span className="text-red text-sm">{error}</span>
        <button
          className="button-primary margin-1" 
          disabled={
            password === confirmPW && password.length > 0 ? false : true
          }
          onClick={() => {
            signupUser();
            passCheck();
            navigate("/login");
            // error.length === 0 && navigate("/login");
          }}
        >
          Sign Up
        </button>
        </form>
        <div className="footer-text">
          {" "}
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Log in
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
