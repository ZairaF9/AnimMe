import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from '../context/AuthContext';
import {Link} from 'react-router-dom';

const ObtieneLosSubGrupooo = ({ message }) => {
    const ref = useRef();
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        ref.current?.scrollIntoView({
        behavior:"smooth"
        });
        },[message]);

        var LinkSubGrupo= "/SubGroup/"+message.uid;

    return (

        <div className="TareaCards">
            <Link to={LinkSubGrupo} className="list-group-item list-group-item-action border-0 py-2">{message.NameGroup}</Link>
        </div>
    )
}

export default ObtieneLosSubGrupooo;