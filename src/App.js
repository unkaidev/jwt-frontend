import './App.scss';
import Nav from './compoments/Navigation/Nav';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './compoments/Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './compoments/Register/Register';

function App() {
  return (
    <Router>
      <div className='app-container'>
        {/* <Nav /> */}
        <Switch>
          <Route path="/news">
            News
          </Route>
          <Route path="/about">
            About
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/" exact>
            Home
          </Route>
          <Route path="*">
            404 Not found
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
