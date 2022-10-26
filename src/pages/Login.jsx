import React, {useState} from 'react';
import { useNavigate,Link} from 'react-router-dom';
import {signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../Firebase";

const Login = () =>{

    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        try {
           await signInWithEmailAndPassword(auth, email, password);
           navigate("/");
        } catch (err) {
            setErr(true);
        }
    }

    return(
        <div className="Form-container">
        <div className="container-login w-75  mt-5">
            <div className="row align-items-stretch rounded shadow">
                <div className="col bg-login d-none d-lg-block col-md-5 col-lg-5 col-xl-6">
                </div>
                <div className="col bg-white p-5 rounded-end">
                    <div className="text-end">
                        <img src="" width="48" alt=""/>
                    </div>
                    <h2 className="fw-bold text-center py-5">Bienvenido a Anim Me</h2>
                     <form onSubmit={handleSubmit} id="form-login">
                        <div className="mb-4">
                            <label for="email" className="form-label">Correo electrónico</label>
                            <input type="email" className="form-control" name="email_name" placeholder="Correo electrónico"/>
                        </div>
                        <div className="mb-4">
                            <label for="password" className="form-label">Contraseña</label>
                            <input type="password" className="form-control" name="password_name" placeholder="Contraseña"/>
                        </div>
                        <div className="d-grid">
                             <button type="submit" className="btn btn-primary" id="btn-login">Iniciar Sesión</button>
                             {err && <span>Algo ha fallado</span>}
                        </div>
                        <div className="my-3 text-center">
                            <span>No tienes cuenta? <a href="#"><Link to="/register">Registrate</Link></a></span>
                        </div>
                     </form>
                
                </div>
            </div>
        </div>
        </div>
    );
};

export default Login