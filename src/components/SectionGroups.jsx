import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import {collection, query, where, getDocs} from "firebase/firestore";
import {db} from "../Firebase";


const SectionGroups = () =>
{

    const params = useParams();
    var Groupsuid;
    var GroupsName;
    var GroupsPhoto;
    var GroupsUsers;
    const Group = [];
    const [GroupFinal, setGroupFinal] = useState([]);

    const GetGroup = async () =>
    {
        const q = query(collection(db, "Groups"), where("uid", '==', params.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            Groupsuid = doc.data().uid;
            GroupsName = doc.data().NameGroup;
            GroupsPhoto = doc.data().photoURL;
            GroupsUsers = doc.data().usersId;
        });
        Group.push(Groupsuid);
        Group.push(GroupsName);
        Group.push(GroupsPhoto);
        Group.push(GroupsUsers);
        setGroupFinal(Group);
    }

    useEffect(() => {
        GetGroup();
      }, []);

    return(
        <div className="Content-Section-Group">
                        <p></p>
                        <img src={GroupFinal[2]} alt="mdo" width="150" height="150" className="img-fluid py-1 rounded"/>
                        <p></p>
                        <div className="d-flex align-items-center">
                            <h1 className="h3 mb-2 mx-0 px-20 border-bottom">{GroupFinal[1]}</h1>
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