import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from '../context/AuthContext';

const SubGroupMessage = ({ message }) => {
    const ref = useRef();
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        ref.current?.scrollIntoView({
        behavior:"smooth"
        });
        },[message]);

    console.log(message);

    return (

        <div ref={ref} className={`GroupMessage ${message.senderId === currentUser.uid && "ownerGM"}`}>
            <div className="flex-shrink-1 rounded py-2 px-4 ml-3" id="message-content-group">
            <img src={message.senderPhoto} class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40" />
            <img src={message.senderState} alt="" width="10" height="10" className='user_status'/>
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

export default SubGroupMessage;