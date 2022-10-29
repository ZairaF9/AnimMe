import React, {useContext, useState, useEffect} from 'react';
import {db} from "../Firebase";
import {collection, query, where, getDocs} from "firebase/firestore";
import { AuthContext } from '../context/AuthContext';
import {Link} from 'react-router-dom';

const GroupsHome = () =>
{
    const { currentUser } = useContext(AuthContext);
    const Groupsuid = [];
    const GroupsName = [];
    const GroupsPhoto = [];
    const GroupsUsers = [];
    const GroupsArray = [];
    const [programari, setProgramari] = useState([]);
  
    const GetGroups = async () =>
    {
        const q = query(collection(db, "Groups"), where("usersId", 'array-contains', currentUser.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            Groupsuid.push(doc.data().uid);
            GroupsName.push(doc.data().NameGroup);
            GroupsPhoto.push(doc.data().photoURL);
            GroupsUsers.push(doc.data().usersId);
        });

        for (var i = 0; i < Groupsuid.length; i++) {
            var url = "/group/" + Groupsuid[i];
            GroupsArray.push(
                    <Link to={url} class="Link-Group">    
                        <div className="col-sm-2">
                            <div className="card border-dark">
                                <div className="card-body text-center">
                                    <img src={GroupsPhoto[i]} alt="mdo" width="140" height="120" className="img-fluid py-2 rounded"/>
                                    <h6 className="card-title py-2">{GroupsName[i]}</h6>
                                </div>
                            </div>
                        </div>
                    </Link>
            );
        }
        setProgramari(GroupsArray);
    }

    useEffect(() => {
        GetGroups();
      }, []);
      console.log("a");

    return(
        <div className='Groups-Container-a'>
            {programari}
        </div>
    );
}

export default GroupsHome