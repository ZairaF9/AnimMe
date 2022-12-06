import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { faImages } from '@fortawesome/free-solid-svg-icons'
import { faPaperclip,faClose} from '@fortawesome/free-solid-svg-icons'
import { faFaceLaughSquint} from '@fortawesome/free-solid-svg-icons'
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { v4 as uuid } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; //getStorage
import { storage, db } from "../Firebase";
import EmojiPicker from 'emoji-picker-react';

const Input = () => {

  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [ fileI, setFileI ] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const onEmojiClick = (event,emojiObject) =>{
      setText(prevInput => prevInput + emojiObject.emoji);
      setShowPicker(false);
  };

  const handleSend = async () => {

    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log(text);
            if (text === "") {
              if(text === "" && !img){
                
              }else if(text === "" && img){
                await updateDoc(doc(db, "chats", data.chatId), {
                  messages: arrayUnion({
                    id: uuid(),
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                    img: downloadURL,
                  }),
                });
              }
              
            } else {
              await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  img: downloadURL,
                }),
              });
            }
          });
        }
      );

    } else if (fileI) { 
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, fileI);   

      uploadTask.on(
        (error) => {
          //setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log(text);
            if (text === "") {
              if(text === "" && !fileI){
                
              }else if(text === "" && fileI){
                await updateDoc(doc(db, "chats", data.chatId), {
                  messages: arrayUnion({
                    id: uuid(),
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                    file: downloadURL,
                  }),
                });
              }
              
            } else {
              await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  file: downloadURL,
                }),
              });
            }
          });
        }
      );
    } 
    else{
      if(text === ""){

      }else{
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
    setFileI(null);
  };

  

  return (
    <div className='input'>
        <FontAwesomeIcon icon={faFaceLaughSquint} style={{color:"gray"}} onClick={() => setShowPicker(val => !val)} />
       {showPicker && <EmojiPicker
           pickerStyle={{width: '100%', height: '80vh'}}
           onEmojiClick = {onEmojiClick}/>}
      
      <input type="text" accept='image/*' placeholder='Type something...' onChange={e => setText(e.target.value)} value={text} />
      <div className="send">
      <input type="file" accept='file/*' style={{ display: "none" }} id="file-id" onChange={e => setFileI(e.target.files[0])} />
        <label htmlFor='file-id'>
          <FontAwesomeIcon icon={faPaperclip} />
        </label>
        <input type="file" style={{ display: "none" }} id="file" onChange={e => setImg(e.target.files[0])} />
        <label htmlFor='file'>
          <FontAwesomeIcon icon={faImages} />
        </label>
        <button onClick={handleSend}><FontAwesomeIcon icon={faPaperPlane} /></button>
      </div>
    </div>
  );
};

export default Input