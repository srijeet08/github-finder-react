import React, {useReducer} from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import {SET_ALERT, REMOVE_ALERT} from '../types';

const AlertState = (props) => {

  const initialState = null;

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  // Set Alert
  const setAlert = (msg, type) => {

    // this.setState({alert: {msg: msg, type: type}});
    //setAlert({msg: msg, type: type});

    dispatch({
      type: SET_ALERT,
      payload: {msg: msg, type: type}
    });

    setTimeout(() => {
      dispatch({
      type: REMOVE_ALERT,
      payload: null
    });
    }, 3000);
  }

  return (
    <AlertContext.Provider 
      value={{
        alert: state,
        setAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;