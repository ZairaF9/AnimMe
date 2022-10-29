import React, { useContext, useEffect, useRef} from "react";
import { AuthContext } from '../context/AuthContext';

const GroupMessage = ({message}) =>
{
    const ref = useRef();
    const {currentUser} = useContext(AuthContext);

    var FotoMessage;
    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);
    console.log(message);
    if(message.photoMessage)
    {
        FotoMessage = <>
                    <img src={message.photoMessage} alt="mdo" width="220" height="280"
                    class="img-fluid py- rounded"/>
                    </>
    }

    return(
                <div>
                    <div ref={ref} className={`GroupMessage ${message.senderId === currentUser.uid && "ownerGM"}`}></div>
                    <div>
                        <img src={message.senderPhoto}
                        class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40"/>
                    </div>
                    <div className="flex-shrink-1 rounded py-2 px-4 ml-3">
                    <div className="font-weight-bold mb-1">{message.senderName}</div>
                    <div className="text-muted small text-nowrap mt-2">{message.date}</div>
                    <div className="font-weight-bold mb-3">
                        {message.Text}
                    <br/>
                    </div>
                    {FotoMessage}
                </div> 
                    <p></p>
                </div>
    )
}

export default GroupMessage;