import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ChatA from "./pages/ChatA";
import Group from "./pages/Groups";
import CreateGroup from "./pages/CreateGroup";
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
      <Route path="group" element={<ProtectedRoute><Group /></ProtectedRoute>}/>
      <Route path="CreateGroup" element={<ProtectedRoute><CreateGroup /></ProtectedRoute>}/>
    </Route>
  </Routes>
  </BrowserRouter>
  );
}

export default App;
