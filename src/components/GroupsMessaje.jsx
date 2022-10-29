import React, { useContext, useEffect, useRef} from "react";

const GroupMessage = ({message}) =>
{
    const ref = useRef();
    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);
    console.log(message);

    return(
                <div>
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
                    <br/>
                    </div>
                </div> 
                    <p></p>
                </div>
    )
}

export default GroupMessage;