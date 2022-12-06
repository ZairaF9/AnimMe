import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import {collection, query, where, getDocs} from "firebase/firestore";
import {db} from "../Firebase";

const SectionSubGroups = () =>
{
    const params = useParams();
    var Groupsuid;
    var GroupsName;
    var GroupsPhoto;
    var GroupsUsers;
    const Group = [];
    const [GroupFinal, setGroupFinal] = useState([]); 

    const GetNameSubGroup = async () =>
    {
        const q = query(collection(db, "SubGroups"), where("uid", '==', params.uid));
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
        GetNameSubGroup();
      }, []);

      return(
        <div className="Content-Section-Group">
                <p></p>
                    <img src={GroupFinal[2]} alt="mdo" width="150" height="150" className="img-fluid py-1 rounded"/>
                    <p></p>
                    <div className="d-flex align-items-center">
                    <h5 className="h3 mb-2 mx-0 px-20 border-bottom">{GroupFinal[1]}</h5>
                </div>
            </div>
    );
}

export default SectionSubGroups