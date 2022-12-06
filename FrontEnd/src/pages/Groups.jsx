import React, { useState, useContext, useRef } from 'react';
import Nav from '../components/Nav';
import SideHome from '../components/SideHome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SectionGroups from '../components/SectionGroups';
import GroupChat from '../components/GroupsChat';
import { faPhone} from '@fortawesome/free-solid-svg-icons';
import { useParams } from "react-router-dom";
import { v1 as uuid } from "uuid";

const Group = () =>
{
  const params = useParams();

  function create() {
    const id =  uuid();
    //props.history.push(`/videoChatGrupal/${id}`);
    window.location.replace("/videoChatGrupal/"+params.uid);
  }


    return (
        <div className='group-bars'>
        <Nav/>
        <SideHome/>
      <div className="groupc-home">
      <div className="container-groupchathome">
        <button onClick = {create} title="Llamadas" className="botonLlamadaGrupoXD" data-bs-toggle="tooltip"
          data-bs-placement="right">
          <FontAwesomeIcon icon={faPhone} style={{color:"white"}}/>
        </button>
       <SectionGroups/>
       <GroupChat/>
      </div>
      </div>
      </div>
    );
};

export default Group