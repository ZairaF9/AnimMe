import React, {useEffect, useRef} from "react";
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
            <div className="col-sm-2 py-3">
                <div className="card" id="card-grupo">
                    <div className="card-body text-center" id="card-grupo-body">
                        <img src={message.photo} alt="mdo" width="140" height="120" className="img-fluid rounded-2 py-2"/>
                        <h6 className="card-title py-2">{message.Name}</h6>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default HomeListGroup;