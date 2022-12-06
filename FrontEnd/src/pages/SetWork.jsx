import React, {useState, useEffect} from 'react';
import Nav from '../components/Nav';
import SideHome from '../components/SideHome';
import SetWorkInfos from "../components/SetWorkInfos"

const SetWork = () =>
{

    return(
        <div className='home-container'>
          <div className='navhome'>
            <Nav/>
            <SideHome/>
            <div className='content-work'>
            <br/>
                <SetWorkInfos/>
            </div>
          </div>
        </div>
       );
}

export default SetWork