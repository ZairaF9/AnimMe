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
    const [FinalMessagesDB, setMessageDB] = useState([]);
    const MessagesArray = [];
    const Msg = [];
    const NewMessage = [];
    const ref= useRef();

    const GetMessagesDB = async () =>
    {
        const q = query(collection(db, "GroupsChat"), where("uid", '==', params.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            Msg.push(doc.data().Messages);
        });
        
        for (var i = 0; i < Msg[0].length; i++)
        {
            MessagesArray.push(
                <div>
                    <div>
                        <img src={Msg[0][i].senderPhoto}
                        class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40"/>
                    </div>
                    <div className="flex-shrink-1 rounded py-2 px-4 ml-3">
                    <div className="font-weight-bold mb-1">{Msg[0][i].senderName}</div>
                    <div className="text-muted small text-nowrap mt-2">{Msg[0][i].date}</div>
                    <div className="font-weight-bold mb-3">
                        {Msg[0][i].Text}
                        <br/>
                    <br/>
                    </div>
                    <img src={Msg[0][i].photoMessage} alt="mdo" width="220" height="280"
                    class="img-fluid py- rounded"/>
                </div> 
                    <p></p>
                </div>
            );
        }
        setMessageDB(MessagesArray);
    }

    useEffect(() => {
        GetMessagesDB();
      }, []);

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
        console.log(today);

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
        }
        setImg(null);
    }//FinalMessagesDB

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
                    {FinalMessagesDB}
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