import React,{useState, useContext} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { storage, db } from "../Firebase";
import { doc, setDoc, onSnapshot, collection, query, where, getDocs,updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from '../context/AuthContext';

const SendWork = ({ message }) =>
{

    let Work = uuidv4();
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) =>
    {

        const q = query(collection(db, "Entregas"), where("user", "==", currentUser.uid), where("tarea", "==", message));
        const querySnapshot = await getDocs(q);
        let docID = '';
        querySnapshot.forEach((doc) => {
         docID = doc._document.data.value.mapValue.fields.uid.stringValue;
         //console.log(doc._document.data.value.mapValue.fields.uid.stringValue);
        });
        //console.log(docID);
        const TAREAE = doc(db, "Entregas", docID);
        await updateDoc(TAREAE, {
            entrego: true,
        });
      //navigate("/works/"+params.uid);
    }

    return(
        <div>
            <button class="Btn_Tarea" onClick={handleSubmit}>Enviar Tarea</button><br/><br/>
        </div>
    );
}

export default SendWork;