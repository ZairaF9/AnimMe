import React,{useState, useContext} from 'react';
import Nav from '../components/Nav';
import SideHome from '../components/SideHome';
import { useParams, useNavigate } from "react-router-dom";
import { storage, db } from "../Firebase";
import { doc, setDoc, onSnapshot, collection, query, where, getDocs } from "firebase/firestore";
import { v4 as uuidv4, v1 as uuidv1 } from 'uuid';
import { AuthContext } from '../context/AuthContext';

const CreateWork = () =>
{
    const params = useParams();
    const [err, setErr] = useState(false);
    const navigate = useNavigate();
    var Users = [];
    const FinalUsers = [];
    let Work = uuidv4();
    //let Send = uuidv1();
    const { currentUser } = useContext(AuthContext);

    const handleSubmit = async (e) =>
    {
      e.preventDefault();
        const NameWork = e.target[0].value;
        const Descripcion = e.target[1].value;
        const FechaVen = e.target[2].value;
        const Valor = e.target[3].value;

        const q = query(collection(db, "Groups"), where("uid", "==", params.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            Users = doc.data().usersId;
        });

        for (let i = 0; i < Users.length; i++) {
          var UsersObj = {user: Users[i], entregada: false};
          FinalUsers.push(UsersObj);
        }

        await setDoc(doc(db, "HomeWorks", Work), {
          uid: Work,
          Group: params.uid,
          Name: NameWork,
          Descripcion: Descripcion,
          FechaVen: FechaVen,
          Valor: Valor,
          UsersHomeWork: Users
      });

      for (let o = 0; o < Users.length; o++) {
        const v1options = {
          node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
          clockseq: 0x1234,
          msecs: new Date('2011-11-01').getTime(),
          nsecs: Math.floor(Math.random() * 100),
        };
        let Send = uuidv1(v1options);
        await setDoc(doc(db, "Entregas", Send), {
          uid: Send,
          user: Users[o],
          tarea: Work,
          nombreTarea: NameWork,
          entrego: false,
          Group: params.uid
        });
      }
      

      navigate("/works/"+params.uid);
    }
    
    return(
        <div className='home-container'>
          <div className='navhome'>
            <Nav/>
            <SideHome/>
            
            <section className='CTarea-Container'>
        <form id="form-tarea" class="col-6" onSubmit={handleSubmit}>
          <h2 class="py-4">Crear Tarea</h2>
            <div class="input-group mb-5">
                <label for="nombre-tarea-id" class="mx-4">Nombre de la Tarea</label>
                <input type="text" class="form-control" id="nombre-tarea-id" name="nombre-tarea-name" placeholder="Nombre Tarea"/>
              </div>
              
              <div class="input-group mb-5">
                <label for="descrip-tarea-id" class="mx-3">Descripción de la tarea</label>
                <textarea class="form-control" id="descrip-tarea-id" name="descrip-tarea-name" placeholder="Descripción de la tarea"></textarea>
              </div>

              <div class="input-group mb-5">
                <label for="fecha-tarea-id" class="mx-3">Fecha de Vencimiento</label>
                <input type="date" class="form-control" id="fecha-tarea-id" name="fecha-tarea-name"/>
              </div>

              <div class="input-group mb-5">
                <label for="puntos-tarea-id" class="mx-4">Valor de la tarea</label>
                <input type="number" class="form-control" id="puntos-tarea-id" name="puntos-tarea-name" min="0" max="100"/>
              </div>

              <div class="input-group mb-5">
                <button type="submit" id="btn-crear-tarea" className='btn-AddGroup rounded-2'>
                    <i class='bx bx-message-square-add'></i>
                    Crear tarea
                </button>
              </div>
        </form>
    </section>

          </div>
        </div>
       );
}


export default CreateWork