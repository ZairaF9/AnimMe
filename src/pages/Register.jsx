import React, {useState} from 'react';
import Add from "../img/userregister.png";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth,storage,db} from "../Firebase";
import { doc, setDoc} from "firebase/firestore";
import { useNavigate,Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCloudUpload} from '@fortawesome/free-solid-svg-icons'

const Register = () => {
    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const confirm = e.target[3].value;
        const carrera = e.target[4].value;
        const file = e.target[5].files[0];

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const storageRef = ref(storage, displayName);

            const uploadTask = uploadBytesResumable(storageRef, file);

              uploadTask.on(
                (error) => {
                   setErr(true);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
                        await updateProfile(res.user,{
                            displayName,
                            photoURL:downloadURL,
                        });
                        await setDoc(doc(db,"users",res.user.uid),{
                            uid: res.user.uid,
                            displayName,
                            email,
                            carrera,
                            photoURL: downloadURL
                          });
                          await setDoc(doc(db,"userChats",res.user.uid),{
                          });
                          navigate("/");
                    });
                }
              );
        } catch (err) {
            setErr(true);
        }

    }

    return (
        <div className="Form-container">
            <div className="container w-75 mt-5">
                <div className="row align-items-stretch rounded shadow">
                    <div className="col bg d-none d-lg-block col-md-5 col-lg-5 col-xl-6">
                    </div>
                    <div className="col bg-white p-5 rounded-end">
                        <div className="text-end">
                            <img src="" width="48" alt="" />
                        </div>
                        <h2 className="fw-bold text-center py-5">Crea una cuenta</h2>

                        <form onSubmit={handleSubmit} id="form-register">
                            <div className="mb-4">
                                <label htmlFor="text" className="form-label">Usuario</label>
                                <input type="text" className="form-control" name="nombre_completo_name" placeholder="Usuario"/>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="form-label">Correo electrónico</label>
                                <input type="email" className="form-control" name="email_name" placeholder="Correo electrónico" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="form-label">Contraseña</label>
                                <input type="password" className="form-control" name="password_name" placeholder="Contraseña" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="form-label">Confirmar Contraseña</label>
                                <input type="password" className="form-control" name="password_name" placeholder="Confirmar Contraseña" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="carrera" className="form-label">Carrera</label>
                                <select className='carrera-user rounded'>
                                    <option value="LMAD">LMAD</option>
                                    <option value="LCC">LCC</option>
                                    <option value="LSTI">LSTI</option>
                                    <option value="LMA">LMA</option>
                                    <option value="LF">LF</option>
                                    <option value="LA">LA</option>
                                </select>
                            </div>
                            <div className="mb-4" id="avatar">
                                <img src={Add} width="90" height="90" id="img-user" /><br></br>
                                <input type="file" name="file_user_name" id="file_user_id" className="File_Registro" />
                                 <label htmlFor="file_user_id" className="Label_Registro" id="file_user_id">Foto de Perfil  <FontAwesomeIcon icon={faCloudUpload} style={{color:"white"}}/> </label><br></br>
                            </div>
                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary" id="btn-register">Registrarse</button>
                                {err && <span>Algo ha fallado</span>}
                            </div>
                            <div className="my-3 text-center">
                                <span>Ya tiene una cuenta? <a href="#"><Link to="/register">Iniciar Sesión</Link></a></span>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>

    );
};

export default Register
