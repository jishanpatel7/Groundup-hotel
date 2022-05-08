import React, { useEffect } from "react";
import "./App.css";
import Home from "./Home";
import Header from "./Header";
import Footer from "./Footer";
import SearchPage from "./SearchPage";
import { Login } from "./Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { selectUser, loginUser, logoutUser } from "./Redux/userSlice";
import { auth } from "./firebase";
import Checkout from "./Checkout/Checkout";
function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        //already logged in
        dispatch(
          loginUser({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoURL: userAuth.photoURL,
          })
        );
      } else {
        //not logged in
        dispatch(logoutUser());
      }
    });
  }, []);
  return (
    <>
    {
      !user ? (
        <Login />
      )
      : (
      <>
      <div className="app">
        <Router>
          <Header />
          <Switch>
            <Route path="/search">
              <SearchPage />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/checkin">
           <Checkout />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </div>
      </>
      )
    }
    </>
  );
}

export default App;
