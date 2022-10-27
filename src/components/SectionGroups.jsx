import React from 'react';
import grupo1 from "../img/grupo1.jfif";

const SectionGroups = () =>
{
    return(
        <div className="Content-Section-Group">
                        <p></p>
                        <img src={grupo1} alt="mdo" width="150" height="150" className="img-fluid py-1 rounded"/>
                        <p></p>
                        <div className="d-flex align-items-center">
                            <h1 className="h3 mb-2 mx-0 px-20">Grupo1</h1>
                        </div>

                        <a href="#" className="list-group-item list-group-item-action border-0 py-2" id="chat-friends">
                            <div className="d-flex align-items-start">
                                <div className="flex-grow-1 ml-3">
                                    Bloc de notas
                                </div>
                            </div>
                        </a>
                        <a href="#" className="list-group-item list-group-item-action border-0 py-2" id="chat-friends">
                            <div className="d-flex align-items-start">
                                <div className="flex-grow-1 ml-3">
                                    Tareas
                                </div>
                            </div>
                        </a>
                        <a href="#" className="list-group-item list-group-item-action border-0 py-2" id="chat-friends">
                            <div className="d-flex align-items-start">
                                <div className="flex-grow-1 ml-3">
                                    Calificaciones
                                </div>
                            </div>
                        </a>
                        <p></p>
                        <a>
                            <hr className="d-block d-lg-none mt-1 mb-0"/>
                            <div className="d-flex align-items-center">
                                <h1 className="h5 mb-2 mx-0 px-20">Canales</h1>
                            </div>
                        </a>
                        <a href="#" className="list-group-item list-group-item-action border-0 py-2" id="chat-friends">
                            <div className="d-flex align-items-start">
                                <div className="flex-grow-1 ml-3">
                                    General
                                </div>
                            </div>
                        </a>
                        <a href="#" className="list-group-item list-group-item-action border-0 py-2" id="chat-friends">
                            <div className="d-flex align-items-start">
                                <div className="flex-grow-1 ml-3">
                                    Equipo VI
                                </div>
                            </div>
                        </a>

                    </div>
    );
};

export default SectionGroups