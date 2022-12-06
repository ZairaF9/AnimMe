import React, {useState, useEffect, useContext, useRef} from 'react';
import SubGroupMessage from './SubGroupsMessage';
import {collection, query, where, getDocs, updateDoc, doc, arrayUnion, arrayRemove, Timestamp, onSnapshot} from "firebase/firestore";
import {db, storage} from "../Firebase";
import { useParams } from "react-router-dom";

const SubGroupsMessages = ()=>
{
    const [sNewMessage, setNewMessage] = useState([]);
    const params = useParams();
    const dummy = useRef();

    useEffect(()=>{
        const unsub = onSnapshot(doc(db,"SubGroupsChat",params.uid),(doc)=>{
         doc.exists() && setNewMessage(doc.data().Messages);
    });
    
    return () =>{
          unsub();
        }
    },[params.uid]);

    return(
        <div className='newMessages'>
            {sNewMessage.map((m)=>(
                <SubGroupMessage message ={m} key={m.uid}/>
            ))}
        </div>
    );
}

export default SubGroupsMessages;