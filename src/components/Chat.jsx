import React, {useContext} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../context/ChatContext';

const Chat = () => {

  const{data} = useContext(ChatContext);

     return(
       <div className="chat">
         <div className="chatInfo">
            <span>{data.user?.displayName}</span>
           <div className="chatIcons">
                 <button className='btn-call'> <FontAwesomeIcon icon={faPhone}/></button>
                 <button className='btn-add'>  <FontAwesomeIcon icon={faUserPlus}/></button>
           </div>
         </div>
         <Messages/>
         <Input/>
       </div>
     );
};

export default Chat