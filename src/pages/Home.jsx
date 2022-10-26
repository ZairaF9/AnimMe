import React from 'react';
import Nav from '../components/Nav'
import SideHome from '../components/SideHome'

const Home = () => {
     return(
      <div className='home-container'>
        <div className='navhome'>
          <Nav/>
          <SideHome/>
          <div className='content-home'>
            <span>Mis Grupos</span>
          </div>
        </div>
      </div>
     );
};

export default Home