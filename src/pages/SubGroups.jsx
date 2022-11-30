import React, { useState, useContext, useRef } from 'react';
import Nav from '../components/Nav';
import SideHome from '../components/SideHome';
import SectionSubGroups from '../components/SectionSubGrupo';
import SubGroupChat from '../components/SubGroupsChat';

const SubGroupo = () =>
{
    return (
        <div className='group-bars'>
        <Nav/>
        <SideHome/>
      <div className="groupc-home">
      <div className="container-groupchathome">
       <SectionSubGroups/>
       <SubGroupChat/>
      </div>
      </div>
      </div>
    );
};

export default SubGroupo