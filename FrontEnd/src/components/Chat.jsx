import React, {useContext} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../context/ChatContext';
import CryptoJS from "crypto-js";

const Chat = () => {

  const descifrar = (texto) => {
    var bytes = CryptoJS.AES.decrypt(texto, '@borjascript');
    var textoDescrifrado = bytes.toString(CryptoJS.enc.Utf8);
    return textoDescrifrado;
  }

  const{data} = useContext(ChatContext);

     return(
       <div className="chat">
         <div className="chatInfo">
            <img src={data.user?.photo} alt=""  style={{width:"30px", height:"30px", borderRadius:"50%",objectFit:"cover"}}/>
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