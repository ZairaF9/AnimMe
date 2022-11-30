import React, {useState, useEffect, useRef, useContext} from 'react';
import Nav from '../components/Nav';
import SideHome from '../components/SideHome';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import { useParams } from "react-router-dom";
import TareasLists from "../components/TareasLists";
import {doc, onSnapshot,  collection, query, where,} from "firebase/firestore";
import {db} from "../Firebase";
import { AuthContext } from '../context/AuthContext';
import WorkEntregadas from "../components/WorkEntregadas"

const Tareas = () =>
{

    const params = useParams();
    const LinkToCreate = "/createWork/" +  params.uid;
    const [Entrega, setEntrega] = useState([]);
    const { currentUser } = useContext(AuthContext);

    return(
        <div className='home-container'>
          <div className='navhome'>
            <Nav/>
            <SideHome/>
            <div className='content-work'>
            <br/>
                <button className='btn-AddGroup rounded-2'><Link to={LinkToCreate}>
                <FontAwesomeIcon icon={faPlus} style={{color:"white"}}/> 
                Crear Tarea
                </Link></button><br/>

                <TareasLists/><br/>
                <WorkEntregadas/>
            </div>
          </div>
        </div>
       );
}

export default Tareas