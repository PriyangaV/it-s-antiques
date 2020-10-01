// user context
import React, { createContext, useState, useEffect } from 'react';

const getUserFromLocalStorage = () => {
  return localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : { username: null, token: null };
};

// create context
export const UserContext = createContext();

// Provider, Consumer, useContext
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(getUserFromLocalStorage());
  const [height, setHeight] = useState(0);

  const userLogin = user => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const userLogout = () => {
    setUser({ username: null, token: null });
    localStorage.removeItem('user');
  };

  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: 'success'
  });

  const showAlert = ({ msg, type = 'success' }) => {
    setAlert({ show: true, msg, type });
  };

  const hideAlert = () => {
    setAlert({ ...alert, show: false });
  };

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setHeight(window.pageYOffset);
    });
    return () => window.removeEventListener('scroll', () => {});
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        userLogin,
        userLogout,
        alert,
        showAlert,
        hideAlert,
        height
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
