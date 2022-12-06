import React,{useState, useContext} from 'react';
import { useParams } from "react-router-dom";
import { storage, db } from "../Firebase";
import { doc, setDoc, onSnapshot, collection, query, where, getDocs,updateDoc } from "firebase/firestore";
import { v4 as uuidv4, v1 as uuidv1 } from 'uuid';
import { AuthContext } from '../context/AuthContext';
import insignia1 from '../img/insignia1.png';
import insigina2 from '../img/insigina2.png';
import insignia3 from '../img/insignia3.png';
import insignia4 from '../img/insignia4.png';
import sinInsignia from '../img/sinInsignia.png';

const PonleAlUsuarioSuRecompensaActualXD = async ({message}) =>
{
    const params = useParams();

   /* await updateDoc(doc(db, "users", params.uid), {
        reward: message.reward
    });*/

    var img = sinInsignia;

    if (message.reward == 1) {
        img = insignia1;
    }
    else if(message.reward == 2)
    {
        img = insigina2;
    }
    else if(message.reward == 3)
    {
        img = insignia3;
    }
    else if(message.reward == 4)
    {
        img = insignia4;
    }

    return(
        <div>
            <img src={img} alt="A veces las cosas pasan cuando suceden, como este error xd"/>
        </div>
    );
}

export default PonleAlUsuarioSuRecompensaActualXD;