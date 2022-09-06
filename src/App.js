import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
  withRouter
} from "react-router-dom";

import Crud from './component/crud';
import EditUser from './component/edit';

export default function App() {
  return (
    <Router>
        <Routes>
          <Route  path='/' element={<Crud/>}/>
          <Route  path='/edit' element={<EditUser/>}/>  
        </Routes>
    </Router>
  );
}