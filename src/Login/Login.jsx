import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import "./Login.css";
import { loginUser } from "../Redux/userSlice";
import { auth, provider } from "../firebase";
import { FcGoogle } from "react-icons/fc";
export const Login = (props) => {
  const [signup, setSignup] = useState(false);
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const signInGoogle = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        setName(user.displayName);
        setPhotoUrl(user.photoURL);
        setEmail(user.email);
        setPassword(user.uid);
        dispatch(
          loginUser({
            name: user.displayName,
            photoUrl: user.photoURL,
            email: user.email,
            password: user.uid,
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const register = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !photoUrl) {
      alert("Please fill all the fields");
      return;
    }
    if (password.length < 6) {
      alert("Password must be atleast 6 characters");
      return;
    }
    if (!email.includes("@")) {
      alert("Please enter a valid email");
      return;
    }
    if (!photoUrl.includes("https://")) {
      alert("Please enter a valid photo url");
      return;
    }
    if (!name.trim()) {
      alert("Please enter a valid name");
      return;
    }
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userAuth) => {
        userAuth.user
          .updateProfile({
            displayName: name,
            photoURL: photoUrl,
          })
          .then(() => {
            dispatch(
              loginUser({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: name,
                photoURL: photoUrl,
              })
            );
          });
      })
      .catch((error) => {
        alert(error.message);
      });
    alert("Registered successfully");
    setName("");
    setPhotoUrl("");
    setEmail("");
    setPassword("");
  };

  const signIn = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill all the fields");
      return;
    }
    if (password.length < 6) {
      alert("Password must be atleast 6 characters");
      return;
    }
    if (!email.includes("@")) {
      alert("Please enter a valid email");
      return;
    }
    auth
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(
          loginUser({
            email: user.email,
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );
      })
      .catch((error) => {
        alert(error.message);
      });
    alert("Logged in successfully");
    setEmail("");
    setPassword("");
  };

  return (
    <>
    <div className="loginScreen">
     
     {
       
       signup ===true ? (
         <form onSubmit={register} className="signupForm">
            <h1>Sign Up </h1>
            <span>Enjoy your Stay😊</span>
<input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Profile Picture URL"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="submitButton">Agree & Join </button>
            <h4>
              Already User?{" "}
              <span onClick={() => setSignup(false)}>Sign in</span>
            </h4>
         </form>
       ):(
         <>
         <form className="loginForm" onSubmit={signIn}>
              <h1>Sign in</h1>
              <p>Stay in World's Best Hotels</p>

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button className="submitButton">Sign in</button>
              <h4>
                New User?{" "}
                <span onClick={(e) => setSignup(true)}>Join Now</span>
              </h4>
            </form>
            <p>OR</p>
            <div className="googleLogin">
              <Google onClick={signInGoogle}>
                <FcGoogle
                  style={{
                    fontSize: "30px",
                    marginRight: "10px",
                  }}
                />{" "}
                Sign in with Google
              </Google>
            </div>
         </>
       )
     }
    </div>
    </>
  )
};


const Google = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  height: 56px;
  width: 100%;
  border-radius: 10px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  vertical-align: middle;
  z-index: 0;
  cursor: pointer;
  margin: auto;
  border: 0;
`;
