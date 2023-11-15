import './App.scss';
import Nav from './compoments/Navigation/Nav';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './compoments/Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './compoments/Register/Register';
import { ToastContainer } from 'react-toastify';
import Users from './compoments/Users/Users';
import { useEffect, useState } from 'react';
import _ from 'lodash';

function App() {
  const [account, setAccount] = useState({});
  useEffect(() => {
    let session = sessionStorage.getItem('account');
    if (session) {
      setAccount(JSON.parse(session));
    }

  }, []);

  return (
    <>
      <Router>
        <div className='app-container'>
          {account && !_.isEmpty(account) && account.isAuthenticated && <Nav />
          }
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
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/" exact>
              Home
            </Route>
            <Route path="*">
              404 Not found
            </Route>
          </Switch>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Router>
    </>
  );
}

export default App;
