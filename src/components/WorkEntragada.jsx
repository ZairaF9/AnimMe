import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from '../context/AuthContext';
import {Link} from 'react-router-dom';

const WorkEntregada = ({ message }) => {
    const ref = useRef();
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        ref.current?.scrollIntoView({
        behavior:"smooth"
        });
        },[message]);

        var Entrego = <> Entregada: No</>
        if(message.entrego)
        {
            Entrego = <> Entregada: Si</>
        }

        var NameTarea = message.nombreTarea + " ";

    return (

        <div className="Entregada">
            {NameTarea} {Entrego}
        </div>
    )
}

export default WorkEntregada;