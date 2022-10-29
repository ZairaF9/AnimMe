import React, {useContext, useState, useEffect} from 'react';
import {db} from "../Firebase";
import {collection, query, where, getDocs} from "firebase/firestore";
import { AuthContext } from '../context/AuthContext';
import HomeListGroup from './HomeListGroup';

const HomeListGroups = () =>
{
    const { currentUser } = useContext(AuthContext);
    const [programari, setProgramari] = useState([]);
    const Groups = [];

    const GetGroupsH = async () =>
    {
        const q = query(collection(db, "Groups"), where("usersId", 'array-contains', currentUser.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            var ObjGroup = {
                uid: doc.data().uid,
                Name: doc.data().NameGroup,
                photo: doc.data().photoURL,
                usersId: doc.data().usersId
            }
            Groups.push(ObjGroup);
        });
        setProgramari(Groups);
        console.log(Groups);
    }

    useEffect(() => {
        GetGroupsH();
      }, []);

      return(
        <div className='newMessages'>
            {programari.map((m)=>(
                <HomeListGroup message ={m} key={m.uid}/>
            ))}
        </div>
      );
}

export default HomeListGroups