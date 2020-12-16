import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Login from './Login/Login';
import Register from './Login/Register';
import State from '../models/state';

const UnauthenticatedApp = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const isDataExist = useSelector((state: State) => state.isDataExists);

  useEffect(() => {
    if (isDataExist) {
      setIsRegistered(true);
    }
  }, []);

  return <div>{isRegistered ? <Login /> : <Register />}</div>;
};

export default UnauthenticatedApp;
