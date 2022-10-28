import React, {useState, useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {storage,db} from "../Firebase";
import { doc, setDoc, onSnapshot, collection, query, where, getDocs} from "firebase/firestore";
import {v4 as uuidv4} from 'uuid';

const CreateGroup = () =>
{
    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        const NameGroup = e.target[0].value;
        const Carrera = e.target[1].value;
        const file = e.target[2].files[0];
        let Gruopuuid = uuidv4();
        var UsersGroupuid = [];
        var UsersGroupName = [];

        const q = query(collection(db, "users"), where("carrera", "==", Carrera));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            //console.log(doc.uid, " => ", doc.data().uid);
            UsersGroupuid.push(doc.data().uid);
            UsersGroupName.push(doc.data().displayName);
        });


        try {
            const storageRef = ref(storage, NameGroup);
            const uploadTask = uploadBytesResumable(storageRef, file);
            
            uploadTask.on(
                (error) => {
                    setErr(true);
                 },
                 () =>
                 {
                    getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) =>{
                        await setDoc(doc(db,"Groups",Gruopuuid),{
                            uid: Gruopuuid,
                            NameGroup,
                            Carrera,
                            usersId: UsersGroupuid,
                            usersName: UsersGroupName,
                            photoURL: downloadURL
                          });
                          navigate("/");
                    });
                 }
            );

        } catch (error) {
            setErr(true);
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Nombre del grupo'/><br/>
            <select className='carrera-user rounded'>
                <option value="LMAD">LMAD</option>
                <option value="LCC">LCC</option>
                <option value="LSTI">LSTI</option>
                <option value="LMA">LMA</option>
                <option value="LF">LF</option>
                <option value="LA">LA</option>
            </select><br/>
            Imagen del grupo: <input type="file" /><br/>
            <button type="submit">Enviar</button>
            {err && <span>Algo ha fallado</span>}
        </form>
    );
};

export default CreateGroup