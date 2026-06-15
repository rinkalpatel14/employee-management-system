import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from './pages/auth/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import EmployeeList from './pages/admin/EmployeeList';
import AddEmployee from './pages/admin/AddEmployee';
import Register from './pages/auth/Register';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';



function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/add-employee">
            <AddEmployee />
          </Route>
          <Route path="/employees">
            <EmployeeList />
          </Route>
          <Route path="/admin-dashboard">
            <AdminDashboard />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route exact path="/">
            <Login />
          </Route>
        </Switch>
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={3000} />
    </>
  );
}

export default App;
