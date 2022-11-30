import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from '../context/AuthContext';
import SubGroupsMessages from "./SubGroupsMessages";
import InputSubGroup from "./InputSubGroup";

const SubGroupChat = () => {
    return (

        <div className="group-chat">
        <SubGroupsMessages/>
        <InputSubGroup/>
      </div>
    )
}

export default SubGroupChat;