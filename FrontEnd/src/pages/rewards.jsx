import React, {useState, useEffect, useRef, useContext} from 'react';
import Nav from '../components/Nav';
import SideHome from '../components/SideHome';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import { useParams } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import ObtenerRecompensas from '../components/rewardsGets';

const Rewards = () =>
{

    const params = useParams();
    const [Entrega, setEntrega] = useState([]);
    const { currentUser } = useContext(AuthContext);

    return(
        <div className='home-container'>
          <div className='navhome'>
            <Nav/>
            <SideHome/>
            <ObtenerRecompensas/>
          </div>
        </div>
       );
}

export default Rewards