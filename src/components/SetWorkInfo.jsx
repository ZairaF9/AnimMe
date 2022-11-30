import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from '../context/AuthContext';
import {Link} from 'react-router-dom';
import SendWork from "../components/SendWork"

const SetWorkInfo = ({ message }) => {
    const ref = useRef();
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        ref.current?.scrollIntoView({
        behavior:"smooth"
        });
        },[message]);

    return (

        <div class="Content_Tarea">
                <h2>{message.Name}</h2>
                <h3>Descripción:</h3>
                <div class="DescripcionT">
                    <p align="justify">
                        {message.Descripcion}
                    </p>
                </div>
                <div class="Tarea_Entregada"><label id="Tarea_Ent">No se entregó tarea</label><button onclick="Borrar_Tarea();"><center><i class="gg-trash"></i></center></button></div><br/><br/>
                <input type="file" name="" id="fileTarea" class="File_Tarea"/>
                <label for="fileTarea" class="File_Tarea_Label">Subir Tarea</label><br/><br/>
                <SendWork message ={message.uid} key={message.uid}/>
                <p class="Fecha_Tarea">Fecha de Vencimiento:</p>
                <p class="Fecha_Tarea_D">{message.FechaVen}</p>
                <p class="Puntos_Tarea">Puntos:</p>
                <p class="Puntos_Tarea_P">0/{message.Valor}</p>
	        </div>
    )
}

export default SetWorkInfo;