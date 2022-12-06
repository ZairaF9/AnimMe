import React, { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import Logo from "../img/logo.jpg";
import Austente from '../img/Ausente.png';
import Disponible from '../img/Disponible.png';
import Ocupado from '../img/Ocupado.png';
import Desconectado from '../img/Desconectado.png';
import {signOut} from "firebase/auth"
import { auth,db } from '../Firebase';
import {Link} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { doc, updateDoc, onSnapshot, arrayUnion } from 'firebase/firestore';
import { async } from '@firebase/util';
import insignia1 from '../img/insignia1.png';
import insigina2 from '../img/insigina2.png';
import insignia3 from '../img/insignia3.png';
import insignia4 from '../img/insignia4.png';
import sinInsignia from '../img/sinInsignia.png';

const Nav = () => {
     
    const {currentUser} = useContext(AuthContext);
    const [Estado, setEstado] = useState([]);
    const [Premio, setPremio] = useState([]);
    const handleSignOut = async () => {
       await updateDoc(doc(db,"users",currentUser.uid),{
        IsOnline: false,
       });
       await signOut(auth);
    };

    const UpdateStatus = async (estado) => 
    {
      await updateDoc(doc(db, "users", currentUser.uid), {
        State: estado
      });
    /*  await updateDoc(doc(db, "UsersData", currentUser.uid), {
        idUser: currentUser.uid,
        State: estado
      });  */
    }

    const UpdateLocalizacion = async () => 
    {

      var Coordenadas = {latitude: 0, longitude: 0};

      if (navigator.geolocation)
      {
        navigator.geolocation.getCurrentPosition(function(position){
          console.log(position);
            Coordenadas.latitude = position.coords.latitude;
            Coordenadas.longitude = position.coords.longitude;
            updateDoc(doc(db, "users", currentUser.uid), {
              Localizacion: Coordenadas
            });
           /* updateDoc(doc(db, "UsersData", currentUser.uid), {
              idUser: currentUser.uid,
              Localizacion: Coordenadas
            }); */
            
            window.location.href = "https://maps.google.com/maps?ll="+Coordenadas.latitude+","+Coordenadas.longitude+",&amp;z=16&amp;t=m&amp;hl=en-US&amp;gl=US&amp;mapclient=apiv3";
          });
      }
    }

    const unsub = async () => { await onSnapshot(doc(db,"users",currentUser.uid),(doc)=>{
      if(doc.data().State == "Disponible")
      {
        setEstado(Disponible);
      }
      else if (doc.data().State == "Ocupado")
      {
        setEstado(Ocupado);
      }
      else if (doc.data().State == "Ausente")
      {
        setEstado(Austente);
      }
      else if (doc.data().State == "Desconectado")
      {
        setEstado(Desconectado);
      }
      else
      {
        setEstado(Disponible);
      }

      if(doc.data().reward == 1)
      {
        setPremio(insignia1);
      }
      else if(doc.data().reward == 2)
      {
        setPremio(insigina2);
      }
      else if(doc.data().reward == 3)
      {
        setPremio(insignia3);
      }
      else if(doc.data().reward == 4)
      {
        setPremio(insignia4);
      }
      else
      {
        setPremio(sinInsignia);
      }

    })}; 

    useEffect(()=>{
      unsub();
    });

     return(
        <nav className="navbar navbar-expand-lg" id="navhome">
        <div className="container-fluid">
        
          <Link to="/"><img src={Logo} alt=""/></Link>
        
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <div className="dropdown text-end">
                    <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <img src={currentUser.photoURL} alt="" width="35" height="35" className="rounded-circle"/>
                        <img src={Estado} alt="" width="10" height="10" className='user_status'/>
                        <img src={Premio} alt="" width="30" height="30" className='user_rewards'/>
                    </a>
                    <ul className="dropdown-menu text-small">
                        <li><a className="dropdown-item" href="#" onClick={function(){UpdateStatus("Disponible");}}>Disponible</a></li>
                        <li><a className="dropdown-item" href="#" onClick={function(){UpdateStatus("Ocupado");}}>Ocupado</a></li>
                        <li><a className="dropdown-item" href="#" onClick={function(){UpdateStatus("Ausente");}}>Ausente</a></li>
                        <li><a className="dropdown-item" href="#" onClick={function(){UpdateStatus("Desconectado");}}>Desconectado</a></li>
                        <li><a className="dropdown-item" href="#" onClick={function(){UpdateLocalizacion();}}>Ubicacion</a></li>
                        <li><a className="dropdown-item" href="#" onClick={handleSignOut}> <FontAwesomeIcon icon={faRightFromBracket}/>Cerrar Sesión</a></li>
                    </ul>
                </div>
            </ul>
          </div>
        </div>
      </nav>
     );
};

export default Nav