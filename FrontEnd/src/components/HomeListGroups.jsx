import React, {useContext, useState, useEffect} from 'react';
import {db} from "../Firebase";
import {collection, query, where, getDocs, doc} from "firebase/firestore";
import { AuthContext } from '../context/AuthContext';
import HomeListGroup from './HomeListGroup';

const HomeListGroups = () =>
{
    const { currentUser } = useContext(AuthContext);
    const [programari, setProgramari] = useState([]);
    const Groups = [];
    const [err, setErr] = useState(false);

    const GetGroupsH = async () =>
    {
        const q = query(collection(db, "Groups"), where("usersId", 'array-contains', currentUser.uid));
        const querySnapshot = await getDocs(q); //tengo 1
        try{
        querySnapshot.forEach((doc) => {
            var ObjGroup = {
                uid: doc.data().uid,
                Name: doc.data().NameGroup,
                photo: doc.data().photoURL,
                usersId: doc.data().usersId
            }
            Groups.push(ObjGroup);
            console.log("hola doc" + ObjGroup);
        });
         }
        catch (err) {
            console.log("Ha salido un error");
        };

        
        const GroupsNoDouble = [];
        for (let i = 0; i < Groups.length / 2; i++) {
            GroupsNoDouble.push(Groups[i]);
        }
        setProgramari(GroupsNoDouble);

    };

    useEffect(() => {
        GetGroupsH();
      }, []);

      return(
        <div className='newMessagesH'>
            {programari.map((m)=>(
                <HomeListGroup message ={m} key={m.uid}/>
            ))}
        </div>
      );
}

export default HomeListGroups;