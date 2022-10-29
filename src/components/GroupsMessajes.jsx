import React, {useState, useEffect, useContext, useRef} from 'react';
import GroupMessage from '../components/GroupsMessaje';
import {collection, query, where, getDocs, updateDoc, doc, arrayUnion, Timestamp} from "firebase/firestore";
import {db, storage} from "../Firebase";
import { useParams } from "react-router-dom";

const GroupsMessajes = ()=>
{
    const [sNewMessage, setNewMessage] = useState([]);
    const params = useParams();

    const InsertNewMessage = async () =>
    {
        const q = query(collection(db, "GroupsChat"), where("uid", '==', params.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setNewMessage(doc.data().Messages);
        });
    }

    useEffect(() => {
        InsertNewMessage();
      }, []);

    return(
        <div className='newMessages'>
            {sNewMessage.map((m)=>(
                <GroupMessage message ={m} key={m.uid}/>
            ))}
        </div>
    );
}

export default GroupsMessajes