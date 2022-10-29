import React, {useState, useEffect, useContext, useRef} from 'react';
import Nav from '../components/Nav';
import SideHome from '../components/SideHome';
import SectionGroups from '../components/SectionGroups';
import { useParams  } from "react-router-dom";
import {collection, query, where, getDocs, updateDoc, doc, arrayUnion, Timestamp} from "firebase/firestore";
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {db, storage} from "../Firebase";
import { AuthContext } from '../context/AuthContext';
import {v4 as uuidv4} from 'uuid';
import GroupsMessajes from '../components/GroupsMessajes';


const Group = () =>
{

    const params = useParams();
    const {currentUser} = useContext(AuthContext);
    const [img,setImg] = useState(null);
    const NewMessage = [];
    const [err, setErr] = useState(false);

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        const Text = e.target[0].value;
        let MessageGroupId = uuidv4();
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
    
        try {
            if(img)
            { 
                const storageRef = ref(storage, MessageGroupId);
                const uploadTask = uploadBytesResumable(storageRef, img);

                uploadTask.on(
                    (error) => {
                        setErr(true);
                    },
                    () =>
                    {
                        getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) =>{
                            await updateDoc(doc(db,"GroupsChat",params.uid),{
                                Messages:arrayUnion({
                                id: MessageGroupId,
                                uid: params.uid,
                                Text,
                                senderId:currentUser.uid,
                                senderPhoto: currentUser.photoURL,
                                senderName: currentUser.displayName,
                                date: today,
                                photoMessage: downloadURL
                                }),
                            });
                        });
                    }
                );
            }else{
                await updateDoc(doc(db,"GroupsChat",params.uid),{
                    Messages:arrayUnion({
                    id: MessageGroupId,
                    uid: params.uid,
                    Text,
                    senderId:currentUser.uid,
                    senderPhoto: currentUser.photoURL,
                    senderName: currentUser.displayName,
                    date:today
                    }),
                });
              }

            NewMessage.push(Text);
            NewMessage.push(currentUser.photoURL);
            NewMessage.push(currentUser.displayName);
            NewMessage.push(today);

        } catch (error) {
            setErr(true);
            console.log(error);
        }
        setImg(null);
    }

    return(
        <div className='group-container'>
            <div className='navgroup'>
                <Nav/>
                <SideHome/>
                <SectionGroups/>
            </div>
            <div className='content-group'>
            <div className="chat-message-left pb-4">
            <div className='mensaje-content'>
                
                <div className='Message'>
                    <GroupsMessajes/>
                </div>

                <div className="input-group p-2">
                    <div className='input-group'>
                        <form onSubmit={handleSubmit}>
                            <input type="text" className="form-control" placeholder="Responder..."/>
                            <input type="file" onChange={e=>setImg(e.target.files[0])}/>
                            <button className="btn btn-primary" type="submit" id="btn-send"><i className='bx bxs-send'></i></button>
                            {err && <span>Algo ha fallado</span>}
                        </form>
                    </div>
                </div>
               </div>
              </div>
            </div>
        </div>
    );
};

export default Group