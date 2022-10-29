import React from 'react';
import Nav from '../components/Nav'
import SideHome from '../components/SideHome'
import GroupsHome from '../components/Groups_Home';
import {Link} from 'react-router-dom';

const Home = () => {
     return(
      <div className='home-container'>
        <div className='navhome'>
          <Nav/>
          <SideHome/>
          <div className='content-home'>
            <br/>
            <button className='btn-AddGroup'><Link to="/CreateGroup">Crear Grupo</Link></button><br/><br/>
            <span>Mis Grupos</span>
            <GroupsHome/>
          </div>
        </div>
      </div>
     );
};

export default Home