import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import Logo from "../img/logo.jpg";
import {signOut} from "firebase/auth"
import { auth,db } from '../Firebase';
import {Link} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';

const Nav = () => {
     
    const {currentUser} = useContext(AuthContext);
    const handleSignOut = async () => {
       await updateDoc(doc(db,"users",currentUser.uid),{
        IsOnline: false,
       });
       await signOut(auth);
    };

     return(
        <nav className="navbar navbar-expand-lg" id="navhome">
        <div className="container-fluid">
        
          <Link to="/"><img src={Logo} alt=""/></Link>
        
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <div className="dropdown text-end">
                    <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <img src={currentUser.photoURL} alt="" width="35" height="35" className="rounded-circle"/>
                        <img src="" alt="" width="10" height="10" className= {`user_status ${currentUser.isOnline ? "offline" : "online"}`}/>
                    </a>
                    <ul className="dropdown-menu text-small">
                        <li><a className="dropdown-item" href="#" onClick={handleSignOut}> <FontAwesomeIcon icon={faRightFromBracket}/>Cerrar Sesión</a></li>
                    </ul>
                </div>
            </ul>
          </div>
        </div>
      </nav>
     );
};

export default Nav