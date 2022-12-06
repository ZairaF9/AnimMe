import React, { useContext, useEffect, useRef, useState } from "react";
import {doc, onSnapshot} from "firebase/firestore";
import {db} from "../Firebase";
import { AuthContext } from '../context/AuthContext';
import insignia1 from '../img/insignia1.png';
import insigina2 from '../img/insigina2.png';
import insignia3 from '../img/insignia3.png';
import insignia4 from '../img/insignia4.png';
import sinInsignia from '../img/sinInsignia.png';
import Austente from '../img/Ausente.png';
import Disponible from '../img/Disponible.png';
import Ocupado from '../img/Ocupado.png';
import Desconectado from '../img/Desconectado.png';
import loc from '../img/loc.png';
import CryptoJS from "crypto-js";

const GroupMessage = ({ message }) => {
    const ref = useRef();
    const { currentUser } = useContext(AuthContext);
    const [Estado, setEstado] = useState([]);
    const [Premio, setPremio] = useState([]);
    const [Loc, setLoc] = useState([]);
    const [textoDes, settextoDes] = useState([]);

    const descifrar = (texto) => {
        var bytes = CryptoJS.AES.decrypt(texto, '@borjascript');
        var textoDescrifrado = bytes.toString(CryptoJS.enc.Utf8);
        return textoDescrifrado;
      }

    useEffect(() => {
        ref.current?.scrollIntoView({
        behavior:"smooth"
        });
        
        },[message]);

    useEffect(()=>{
        onSnapshot(doc(db,"users",message.senderId),(doc)=>{
            if(doc.data().Localizacion)
            {

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
                
                var LocationLink = "https://maps.google.com/maps?ll="+doc.data().Localizacion.latitude+","+doc.data().Localizacion.longitude+",&amp;z=16&amp;t=m&amp;hl=en-US&amp;gl=US&amp;mapclient=apiv3";
                setLoc(LocationLink);
                var bytes = CryptoJS.AES.decrypt(message.text, '@borjascript');
                var textoDescrifrado = bytes.toString(CryptoJS.enc.Utf8);
                settextoDes(textoDescrifrado);
        }
    });
    },[message.senderId])

    console.log(message);

    return (

        <div ref={ref} className={`GroupMessage ${message.senderId === currentUser.uid && "ownerGM"}`}>
            <div className="flex-shrink-1 rounded py-2 px-4 ml-3" id="message-content-group">
            <img src={message.senderPhoto} class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40" />
            <img src={Estado} alt="" width="10" height="10" className='user_status'/>
            <img src={Premio} alt="" width="10" height="10" className='user_status'/>
            <a href={Loc}><img src={loc} alt="" width="10" height="10" className='user_status'/></a>
                <div className="font-weight-bold mb-1">{message.senderName}</div>
                <div className="text-muted small text-nowrap mt-2">{message.date}</div>
                <div className="font-weight-bold mb-3">
                    {message.text &&
                        <p>{message.text}</p>
                    }
                    <br />
                </div>
                {message.photoMessage &&
                    <img src={message.photoMessage} alt='' />
                }
                {message.fileMessage &&
                    <a href={message.fileMessage}>Abrir Archivo</a>
                }
            </div>
        </div>
    )
}

export default GroupMessage;



