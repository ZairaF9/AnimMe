import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ChatA from "./pages/ChatA";
import Group from "./pages/Groups";
import CreateGroup from "./pages/CreateGroup";
import Tareas from "./pages/Tareas";
import CreateWork from "./pages/CreateWork";
import SetWork from "./pages/SetWork";
import Rewards from "./pages/rewards";
import CreateSubGroupo from "./pages/CreateSubGroup";
import SubGroupo from "./pages/SubGroups";
import "./style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const {currentUser} = useContext(AuthContext);

const ProtectedRoute =({children})=>{
if(!currentUser){
  return <Navigate to="/login"/>
}
return children
};
 
  return (
  <BrowserRouter>
  <Routes>
    <Route path="/">
      <Route index element={<ProtectedRoute><Home /></ProtectedRoute>}/>
      <Route path="login" element={<Login />}/>
      <Route path="register" element={<Register />}/>
      <Route path="chat" element={<ProtectedRoute><ChatA /></ProtectedRoute>}/>
      <Route path="group/:uid" element={<ProtectedRoute><Group /></ProtectedRoute>}/>
      <Route path="CreateGroup" element={<ProtectedRoute><CreateGroup /></ProtectedRoute>}/>
      <Route path="works/:uid" element={<ProtectedRoute><Tareas /></ProtectedRoute>}/>
      <Route path="createWork/:uid" element={<ProtectedRoute><CreateWork /></ProtectedRoute>}/>
      <Route path="SetWorks/:uid" element={<ProtectedRoute><SetWork /></ProtectedRoute>}/>
      <Route path="rewards/:uid" element={<ProtectedRoute><Rewards /></ProtectedRoute>}/>
      <Route path="CreateSubGroup/:uid" element={<ProtectedRoute><CreateSubGroupo /></ProtectedRoute>}/>
      <Route path="SubGroup/:uid" element={<ProtectedRoute><SubGroupo /></ProtectedRoute>}/>
    </Route>
  </Routes>
  </BrowserRouter>
  );
}

export default App;
