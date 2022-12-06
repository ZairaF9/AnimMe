import React, {useState, useEffect, useRef, useContext} from 'react';
import {doc, onSnapshot,  collection, query, where, updateDoc} from "firebase/firestore";
import {db} from "../Firebase";
import { useParams } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import PonleAlUsuarioSuRecompensaActualXD from './ActualReward';
import insignia1 from '../img/insignia1.png';
import insigina2 from '../img/insigina2.png';
import insignia3 from '../img/insignia3.png';
import insignia4 from '../img/insignia4.png';
import sinInsignia from '../img/sinInsignia.png';

const ObtenerRecompensas = () =>
{
    const [NewWork, setNewWork] = useState([]);
    const [Completadas, setCompletadas] = useState([]);
    const [SinCompletadas, setSinCompletadas] = useState([]);
    const [AReward, setAReward] = useState([]);
    const params = useParams();
    const { currentUser } = useContext(AuthContext);

    useEffect(()=>{
        const q = query(collection(db, "Entregas"), where("user", "==", params.uid)/*, where("user", "==", currentUser.uid)*/);
        const unsub = onSnapshot(q,(querySnapshot)=>{
            const Works = [];
            const Completo = [];
            const Falta = [];
            querySnapshot.forEach((doc) => {
                if(doc.data().entrego == true)
                {
                    Completo.push(doc.data());
                }
                else if (doc.data().entrego == false)
                {
                    Falta.push(doc.data());
                }
                Works.push(doc.data());
            });
            setNewWork(Works);
            setCompletadas(Completo.length);
            setSinCompletadas(Falta.length);

            var img = sinInsignia;

            if (Completo.length == 1) {
                img = insignia1;
            }
            else if(Completo.length == 2)
            {
                img = insigina2;
            }
            else if(Completo.length == 3)
            {
                img = insignia3;
            }
            else if(Completo.length== 4)
            {
                img = insignia4;
            }
            setAReward(img);

            updateDoc(doc(db, "users", params.uid), {
                reward: Completo.length
            });
    });

    return () =>{
          unsub();
        }
    },[]);


    //console.log(NewWork);

    return(
        <div className='EntregadasWorkks'>
            <div className="RewardGet">
            <div id="columnaRewards">
            <br/>
            <div class="col-12 col-lg-2 col-xl-2 border-end">
                        <br/>
                        <div class="d-flex align-items-center">
                            <h1 class="h3 mb-2 mx-0 px-20">Recompensas</h1>
                        </div>

                        <a href="#" class="list-group-item list-group-item-action border-0 py-2" id="chat-friends">
                            <div class="d-flex align-items-start">
                                <div class="flex-grow-1 ml-3">
                                    <i class='bx bxs-trophy' ></i>
                                    Tareas Completadas {Completadas}
                                </div>
                            </div>
                        </a>
                        <a href="#" class="list-group-item list-group-item-action border-0 py-2" id="chat-friends">
                            <div class="d-flex align-items-start">
                                <div class="flex-grow-1 ml-3">
                                    <i class='bx bxs-trophy' ></i>
                                    Tareas Pendientes {SinCompletadas}
                                </div>
                            </div>
                        </a>
                    </div>
            </div>
                <br/>
                
                <div className='RECOMPENSASAA'>
                    <div class="py-2 px-4  d-none d-lg-block">
                        <div class="d-flex align-items-center py-1 col-6">
                            <div class="position-relative">
                                <div class="flex-grow-1 pl-2 px-3">
                                    <p></p>
                                    <strong>Recompensa Actual:</strong>
                                    <img src={AReward} alt="A veces las cosas pasan cuando suceden, como este error xd"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
        </div>
        </div>
    );
}

export default ObtenerRecompensas;