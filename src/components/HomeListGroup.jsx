import React, { useContext, useEffect, useRef} from "react";
import {Link} from 'react-router-dom';

const HomeListGroup = ({message}) =>
{
    const ref = useRef();
    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);
    console.log(message);
    var url = "/group/" + message.uid;

    return(
        <Link to={url} class="Link-Group">    
            <div className="col-sm-2">
                <div className="card border-dark">
                    <div className="card-body text-center">
                        <img src={message.photo} alt="mdo" width="140" height="120" className="img-fluid py-2 rounded"/>
                        <h6 className="card-title py-2">{message.Name}</h6>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default HomeListGroup;