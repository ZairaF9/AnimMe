import React from 'react';
import Nav from '../components/Nav';
import SideHome from '../components/SideHome';
import GroupsHome from '../components/GroupsHome';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'

const Home = () => {
     return(
      <div className='home-container'>
        <div className='navhome'>
          <Nav/>
          <SideHome/>
          <div className='content-home'>
          <br/>
            <button className='btn-AddGroup rounded-2'><Link to="/CreateGroup">
            <FontAwesomeIcon icon={faPlus} style={{color:"white"}}/> 
             Crear Grupo
              </Link></button><br/>
            <span id="misgrupos-id">Mis Grupos</span> <br/><br/>
            <div class="row">
            <GroupsHome/>
            </div>
          </div>
        </div>
      </div>
     );
};

export default Home