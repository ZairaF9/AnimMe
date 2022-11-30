import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from '../context/AuthContext';
import {Link} from 'react-router-dom';

const RewardsGet = ({ message }) => {
    const ref = useRef();
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        ref.current?.scrollIntoView({
        behavior:"smooth"
        });
        },[message]);

       
    return (

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
                                    Completadas
                                </div>
                            </div>
                        </a>
                        <a href="#" class="list-group-item list-group-item-action border-0 py-2" id="chat-friends">
                            <div class="d-flex align-items-start">
                                <div class="flex-grow-1 ml-3">
                                    <i class='bx bxs-trophy' ></i>
                                    Pendientes
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
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
        </div>
    )
}

export default RewardsGet;