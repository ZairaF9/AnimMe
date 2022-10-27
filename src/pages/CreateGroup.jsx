import React, {useState, useContext} from 'react';
import { useNavigate} from 'react-router-dom';
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth,storage,db} from "../Firebase";
import { AuthContext } from '../context/AuthContext';
import { doc, setDoc} from "firebase/firestore";

const CreateGroup = () =>
{
    const [err, setErr] = useState(false);
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        const NameGroup = e.target[0].value;
        const Carrera = e.target[1].value;
        const file = e.target[2].files[0];

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
                        await setDoc(doc(db,"Groups",currentUser.uid),{
                            uid: currentUser.uid,
                            NameGroup,
                            Carrera,
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