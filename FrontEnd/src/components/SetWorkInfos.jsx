import React, {useState, useEffect, useRef} from 'react';
import SetWorkInfo from './SetWorkInfo';
import {doc, onSnapshot,  collection, query, where,} from "firebase/firestore";
import {db} from "../Firebase";
import { useParams } from "react-router-dom";

const SetWorkInfos = ()=>
{
    const [NewWork, setNewWork] = useState([]);
    const params = useParams();

    useEffect(()=>{
        const q = query(collection(db, "HomeWorks"), where("uid", "==", params.uid));
        const unsub = onSnapshot(q,(querySnapshot)=>{
            const Works = [];
            querySnapshot.forEach((doc) => {
                Works.push(doc.data());
            });
            setNewWork(Works);
    });
    
    return () =>{
          unsub();
        }
    },[params.uid]);

    //console.log(NewWork);

    return(
        <div className='newWorks'>
            {NewWork.map((m)=>(
                <SetWorkInfo message ={m} key={m.uid}/>
            ))}
        </div>
    );
}

export default SetWorkInfos;