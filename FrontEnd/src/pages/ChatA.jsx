import React from 'react';
import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';
import Nav from '../components/Nav'
import SideHome from '../components/SideHome'

const ChatA = () => {
     return(
      <div className='chat-bars'>
           <Nav/>
           <SideHome/>
       <div className="chat-home">
         <div className="container-chathome">
          <Sidebar/>
          <Chat/>
         </div>
       </div>
       </div>
     );
};

export default ChatA