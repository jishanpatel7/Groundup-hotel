import React from 'react'
import './Header.css'
import SearchIcon from "@material-ui/icons/Search";
import LanguageIcon from "@material-ui/icons/Language";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "./Redux/userSlice";
import firebase from "firebase/compat/app";
function Header({img,price,location,title,description,star,total}) {
    const user = useSelector(selectUser);

    console.log(price)
    return (
        <div className='header'>
            <Link to='/'>
                <img
                    className="header__icon"
                    src="https://i.pinimg.com/originals/3c/bf/be/3cbfbe148597341fa56f2f87ade90956.png"
                    alt=""
                />
            </Link>
           
            <div className='header__center'>
                <input type="text" />
                <SearchIcon />
            </div>

            <div className='header__right'>
                <p>Click Profile to Logout</p>
                <LanguageIcon />
                <ExpandMoreIcon />
                <Avatar style = {{
                    backgroundColor: "#fff",
                    cursor: "pointer",
                }} src ={user.photoURL ? user.photoURL : "https://img.icons8.com/color/344/deadpool.png"} onClick={() => {
                    firebase.auth().signOut();
                }}/>
            </div>
        </div>
    )
}

export default Header
