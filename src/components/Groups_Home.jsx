import React, {useContext, useState, useEffect} from 'react';
import {db} from "../Firebase";
import {collection, query, where, getDocs} from "firebase/firestore";
import { AuthContext } from '../context/AuthContext';
import {Link} from 'react-router-dom';
import HomeListGroups from './HomeListGroups';

const GroupsHome = () =>
{
    return(
        <div className='Groups-Container-a'>
            <HomeListGroups/>
        </div>
    );
}

export default GroupsHome