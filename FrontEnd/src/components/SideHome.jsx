import React, {useContext} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone} from '@fortawesome/free-solid-svg-icons'
import { faTrophy} from '@fortawesome/free-solid-svg-icons'
import { faComment} from '@fortawesome/free-solid-svg-icons'
import {faBlackboard} from '@fortawesome/free-solid-svg-icons'
import { useNavigate,Link} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const SideHome = () => {


    const { currentUser } = useContext(AuthContext);
    const LinkToRewards = "/rewards/" +  currentUser.uid;

     return(
        <div className="d-flex flex-nowrap">
        <div className="d-flex flex-column flex-shrink-0 position-fixed"
            style={{width: "4.5rem", height:"100vh"}} id="sidebar-user">
            <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
                <li className="nav-item my-4">
                    
                            <Link to="/chat"> <FontAwesomeIcon icon={faComment} style={{color:"white"}}/></Link>
                    
                </li>
                <li className="my-4">
                    <a href="#" className="nav-link py-3  rounded-0" title="Tareas" data-bs-toggle="tooltip"
                        data-bs-placement="right">
                         <FontAwesomeIcon icon={faBlackboard} style={{color:"white"}}/>
                    </a>
                </li>
                <li className="my-4">
                    <a href="videoChat" className="nav-link py-3 rounded-0" title="Llamadas" data-bs-toggle="tooltip"
                        data-bs-placement="right">
                         <FontAwesomeIcon icon={faPhone} style={{color:"white"}}/>
                    </a>
                </li>
                <li className="my-4">
                    <a href={LinkToRewards} className="nav-link py-3  rounded-0" title="Recompensas" data-bs-toggle="tooltip"
                        data-bs-placement="right">
                         <FontAwesomeIcon icon={faTrophy} style={{color:"white"}}/>
                    </a>
                </li>
            </ul>
        </div>
    </div>
     );
};

export default SideHome