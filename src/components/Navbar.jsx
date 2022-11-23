import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import CryptoJS from "crypto-js";

const Navbar = () => {
  const {currentUser} = useContext(AuthContext);

  const descifrar = (texto) => {
    var bytes = CryptoJS.AES.decrypt(texto, '@borjascript');
    var textoDescrifrado = bytes.toString(CryptoJS.enc.Utf8);
    return textoDescrifrado;
}

     return(
       <div className="navbar">
        <div className="user">
          <span className="logo">Chat</span>
          <img id="user-chat" src={currentUser.photoURL} alt="" />
          {/*<span>{currentUser.displayName}</span>*/}
          <span>{descifrar(currentUser.displayName)}</span>
        </div>
       </div>
     );
};

export default Navbar