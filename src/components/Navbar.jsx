import React, { useContext } from 'react';
import Add from "../img/userregister.png";
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const {currentUser} = useContext(AuthContext);
     return(
       <div className="navbar">
        <div className="user">
          <span className="logo">Chat</span>
          <img id="user-chat" src={currentUser.photoURL} alt="" />
          <span>{currentUser.displayName}</span>
        </div>
       </div>
     );
};

export default Navbar