import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Login from './Login/Login';
import Register from './Login/Register';

const mapStateToProps = (state: any) => {
  return { DataExist: state.serviceAccount.DataExist };
};

const UnauthenticatedApp = ({ DataExist }: any) => {
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    if (DataExist()) {
      setIsRegistered(true);
    }
  }, []);

  return <div>{isRegistered ? <Login /> : <Register />}</div>;
};

export default connect(mapStateToProps)(UnauthenticatedApp);
