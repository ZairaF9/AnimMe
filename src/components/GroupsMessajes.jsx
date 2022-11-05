import React, {useState, useEffect, useContext, useRef} from 'react';
import GroupMessage from '../components/GroupsMessaje';
import {collection, query, where, getDocs, updateDoc, doc, arrayUnion, Timestamp, onSnapshot} from "firebase/firestore";
import {db, storage} from "../Firebase";
import { useParams } from "react-router-dom";

const GroupsMessajes = ()=>
{
    const [sNewMessage, setNewMessage] = useState([]);
    const params = useParams();
    const dummy = useRef();

    useEffect(()=>{
        const unsub = onSnapshot(doc(db,"GroupsChat",params.uid),(doc)=>{
         doc.exists() && setNewMessage(doc.data().Messages);
    });
    
    return () =>{
          unsub();
        }
    },[params.uid]);

    return(
        <div className='newMessages'>
            {sNewMessage.map((m)=>(
                <GroupMessage message ={m} key={m.uid}/>
            ))}
        </div>
    );
}

export default GroupsMessajes