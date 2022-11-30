import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from '../context/AuthContext';
import {Link} from 'react-router-dom';

const TareasList = ({ message }) => {
    const ref = useRef();
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        ref.current?.scrollIntoView({
        behavior:"smooth"
        });
        },[message]);

        var LinkEntrega = "/SetWorks/"+message.uid;

    return (

        <div className="TareaCards">
            <h2>{message.Name}</h2>
            <br/>
            <p>{message.Valor}</p>
            <p>{message.Descripcion}</p>
            <Link to={LinkEntrega}>Entregar Tarea</Link>
        </div>
    )
}

export default TareasList;