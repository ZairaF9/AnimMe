import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from '../context/AuthContext';
import {Link} from 'react-router-dom';
import check from '../img/check.png';
import cross from '../img/cross.png';

const WorkEntregada = ({ message }) => {
    const ref = useRef();
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        ref.current?.scrollIntoView({
        behavior:"smooth"
        });
        },[message]);

        var Entrego = <> Entregada: <img src={cross} alt="" width="12" height="12"/></>
        if(message.entrego)
        {
            Entrego = <> Entregada: <img src={check} alt="" width="13" height="13"/></>
        }

        var NameTarea = message.nombreTarea + " ";

    return (

        <div className="Entregada">
            {NameTarea} {Entrego}
        </div>
    )
}

export default WorkEntregada;