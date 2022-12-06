import React, { useState, useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db } from "../Firebase";
import { doc, setDoc, onSnapshot, collection, query, where, getDocs } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

const CreateGroup = () => {
    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const NameGroup = e.target[0].value;
        const Carrera = e.target[1].value;
        const file = e.target[2].files[0];
        const Messages = [];
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
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await setDoc(doc(db, "GroupsChat", Gruopuuid), {
                            uid: Gruopuuid,
                            Messages: Messages
                        });
                        await setDoc(doc(db, "Groups", Gruopuuid), {
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

    return (
        <div className="form-creategroup">
            <div className="container w-75 mt-5">
                <div className="row align-items-stretch rounded shadow">
                    <div className="col bg-group d-none d-lg-block col-md-5 col-lg-5 col-xl-6">
                    </div>
                    <div className="col bg-white p-5 rounded-end">
                        <div className="text-end">
                            <img src="" width="48" alt="" />
                        </div>
                        <h2 className="fw-bold text-center py-5">Crea un Grupo</h2>

                        <form onSubmit={handleSubmit} id="form-group">
                            <div className="mb-4">
                                <label htmlFor="text" className="form-label">Nombre Grupo</label>
                                <input type="text" className='form-control' placeholder='Nombre grupo' /><br />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="carrera" className="form-label">Carrera</label>
                                <select className="carrera-user rounded">
                                    <option value="LMAD">LMAD</option>
                                    <option value="LCC">LCC</option>
                                    <option value="LSTI">LSTI</option>
                                    <option value="LMA">LMA</option>
                                    <option value="LF">LF</option>
                                    <option value="LA">LA</option>
                                </select><br />
                            </div>
                            <div className="mb-4" id="group-imagen">
                                <input type="file" id='img-grupo-id' className="File_Grupo"/><br />
                                <label htmlFor="img-grupo-id" className="Label_Grupo" id="file_grupo_id">Perfil Grupo</label><br></br>
                            </div>
                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary" id="btn-create">Crear grupo</button>
                                {err && <span>Algo ha fallado</span>}
                            </div>
                            <div className="my-3 text-center">
                                <span><Link to="/">Regresar a Home </Link></span>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateGroup