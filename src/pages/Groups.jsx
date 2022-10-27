import React from 'react';
import Nav from '../components/Nav';
import SideHome from '../components/SideHome';
import SectionGroups from '../components/SectionGroups';

const Group = () =>
{
    return(
        <div className='group-container'>
            <div className='navgroup'>
                <Nav/>
                <SideHome/>
                <SectionGroups/>
            </div>
            <div className='content-group'>
            <div className="chat-message-left pb-4">
            <div className='mensaje-content'>
                <div>
                    <img src="https://bootdey.com/img/Content/avatar/avatar3.png"
                    class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40"/>
                </div>
                <div className="flex-shrink-1 rounded py-2 px-4 ml-3">
                <div className="font-weight-bold mb-1">Sharon Lessman</div>
                <div className="text-muted small text-nowrap mt-2">19/09 9:00 am</div>
                <div className="font-weight-bold mb-3">
                    Hoy se celebra el 69 aniversario de la FCFM. En la serie de conferencias de
                    las carreras, la tenemos como invitado de LMAD al Ing. Hugo Ibarra con la conferencia:
                    "Realidad virtual como recurso de enseñanza y capacitación" a las 6:00pm. También participamos
                    con el Video Mapping de las 8:00pm. Saludos.
                <br/>
                </div>
               </div> 
                <p></p>
                <div className="input-group p-2">
                    <div className='input-group'>
                        <input type="text" className="form-control" placeholder="Responder..."/>
                        <button className="btn btn-primary" type="submit" id="btn-send"><i className='bx bxs-send'></i></button>
                    </div>
                </div>
               </div>
              </div>
            </div>
        </div>
    );
};

export default Group