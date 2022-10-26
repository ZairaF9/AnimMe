import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleRight} from '@fortawesome/free-solid-svg-icons'
import { faRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import Disponible from "../img/Disponible.png";
import Logo from "../img/logo.jpg";
import {signOut} from "firebase/auth"
import { auth } from '../Firebase';
import { useNavigate,Link} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Nav = () => {
     
    const {currentUser} = useContext(AuthContext);

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
                        <img src={Disponible} alt="" width="10" height="10" className="rounded-circle"/>
                    </a>
                    <ul className="dropdown-menu text-small">
                        <li><a className="dropdown-item" href="#">
                           <FontAwesomeIcon icon={faArrowCircleRight}/>
                            Disponibilidad
                             </a>
                            <ul className="dropdown-menu submenu">
                                <li><a className="dropdown-item" href="#">Disponible</a></li>
                                <li><a className="dropdown-item" href="#">Ausente</a></li>
                                <li><a className="dropdown-item" href="#">Ocupado</a></li>
                            </ul>
                        </li>
                        <li><a className="dropdown-item" href="#" onClick={()=>signOut(auth)}> <FontAwesomeIcon icon={faRightFromBracket}/>Cerrar Sesión</a></li>
                    </ul>
                </div>
            </ul>
          </div>
        </div>
      </nav>
     );
};

export default Nav