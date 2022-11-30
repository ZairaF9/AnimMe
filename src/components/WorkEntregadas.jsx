import React, {useState, useEffect, useRef, useContext} from 'react';
import WorkEntregada from '../components/WorkEntragada';
import {doc, onSnapshot,  collection, query, where,} from "firebase/firestore";
import {db} from "../Firebase";
import { useParams } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';

const WorkEntregadas = ()=>
{
    const [NewWork, setNewWork] = useState([]);
    const params = useParams();
    const { currentUser } = useContext(AuthContext);

    useEffect(()=>{
        const q = query(collection(db, "Entregas"), where("Group", "==", params.uid)/*, where("user", "==", currentUser.uid)*/);
        const unsub = onSnapshot(q,(querySnapshot)=>{
            const Works = [];
            querySnapshot.forEach((doc) => {
                if(doc.data().user == currentUser.uid)
                {
                    Works.push(doc.data());
                }
            });
            setNewWork(Works);
    });

    return () =>{
          unsub();
        }
    },[params.uid]);

    console.log(NewWork);

    return(
        <div className='EntregadasWorkks'>
            {NewWork.map((m)=>(
                <WorkEntregada message ={m} key={m.uid}/>
            ))}
        </div>
    );
}

export default WorkEntregadas;