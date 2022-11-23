import React, { useState, useContext, useRef } from 'react';
import Nav from '../components/Nav';
import SideHome from '../components/SideHome';
import SectionGroups from '../components/SectionGroups';
import GroupChat from '../components/GroupsChat';

const Group = () =>
{
    return (
        <div className='group-bars'>
        <Nav/>
        <SideHome/>
      <div className="groupc-home">
      <div className="container-groupchathome">
       <SectionGroups/>
       <GroupChat/>
      </div>
      </div>
      </div>
    );
};

export default Group