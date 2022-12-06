import React, {useState, useEffect, useRef, useContext} from 'react';
import TareasList from './TareasList';
import {doc, onSnapshot,  collection, query, where,} from "firebase/firestore";
import {db} from "../Firebase";
import { useParams } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';

const TareasLists = ()=>
{
    const [NewWork, setNewWork] = useState([]);
    const params = useParams();
    const { currentUser } = useContext(AuthContext);

    useEffect(()=>{
        const q = query(collection(db, "HomeWorks"), where("Group", "==", params.uid));
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
                <TareasList message ={m} key={m.uid}/>
            ))}
        </div>
    );
}

export default TareasLists;