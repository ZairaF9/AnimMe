import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from '../context/AuthContext';
import GroupsMessages from './GroupsMessages';
import InputChat from './InputChats';

const GroupChat = () => {
    return (

        <div className="group-chat">
        <GroupsMessages/>
        <InputChat/>
      </div>
    )
}

export default GroupChat;