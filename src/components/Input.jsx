import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane} from '@fortawesome/free-solid-svg-icons'
import { faImages} from '@fortawesome/free-solid-svg-icons'
import { faPaperclip} from '@fortawesome/free-solid-svg-icons'
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import {v4 as uuid} from "uuid";
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage,db} from "../Firebase";

const Input = () => {

  const [text,setText] = useState("");
  const [img,setImg] = useState(null);

  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  const handleSend = async () =>{
          
    if(img){
      const storageRef = ref(storage,uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
           //setErr(true);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
              console.log(text);
              if(text===""){
                await updateDoc(doc(db,"chats",data.chatId),{
                  messages:arrayUnion({
                    id: uuid(),
                    senderId:currentUser.uid,
                    date:Timestamp.now(),
                    img:downloadURL,
                  }),
               });
              }else{
                await updateDoc(doc(db,"chats",data.chatId),{
                  messages:arrayUnion({
                    id: uuid(),
                    text,
                    senderId:currentUser.uid,
                    date:Timestamp.now(),
                    img:downloadURL,
                  }),
               });
              }
          });
        }
      );

    }else{
      await updateDoc(doc(db,"chats",data.chatId),{
         messages:arrayUnion({
           id: uuid(),
           text,
           senderId:currentUser.uid,
           date:Timestamp.now(),
         }),
      });
    }

    await updateDoc(doc(db,"userChats",currentUser.uid),{
        [data.chatId + ".lastMessage"]:{
          text
        },
        [data.chatId +".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db,"userChats",data.user.uid),{
      [data.chatId + ".lastMessage"]:{
        text
      },
      [data.chatId +".date"]: serverTimestamp(),
  });

    setText("");
    setImg(null);
  };

     return(
       <div className='input'>
        <input type="text" placeholder='Type something...' onChange={e=>setText(e.target.value)} value={text}/>
        <div className="send">
        <FontAwesomeIcon icon={faPaperclip}/>
          <input type="file" style={{display:"none"}} id="file" onChange={e=>setImg(e.target.files[0])}/>
          <label htmlFor='file'>
          <FontAwesomeIcon icon={faImages}/>
          </label>
          <button onClick={handleSend}><FontAwesomeIcon icon={faPaperPlane}/></button>
        </div>
       </div>
     );
};

export default Input