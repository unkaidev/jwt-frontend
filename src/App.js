import './App.scss';
import NavHeader from './components/Navigation/NavHeader';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState, useContext } from 'react';
import AppRoutes from './routes/AppRoutes';
import { UserContext } from "./context/UserContext";
import { Triangle } from 'react-loader-spinner'



function App() {
  const { user } = useContext(UserContext);

  return (
    <>
      <Router>
        {user && user.isLoading ?
          <div className='loading-container'>

            <Triangle
              height="100"
              width="100"
              color="#0866FF"
              ariaLabel="triangle-loading"
              visible={true}
            />
            <div>Loading data...</div>
          </div>

          :
          <>
            <div className='app-header'>
              <NavHeader />
            </div>
            <div className='app-container'>
              <AppRoutes />
            </div>
          </>
        }
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
