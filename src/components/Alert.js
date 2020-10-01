import React, { useContext } from 'react';
import { FaWindowClose } from 'react-icons/fa';
import { UserContext } from '../context/user';

const Alert = () => {
  const {
    alert: { show, msg, type },
    hideAlert
  } = useContext(UserContext);
  let css = 'alert-container';
  if (show) {
    css += ' alert-show';
    if (type === 'danger') {
      css += ' alert-danger';
    }
  }

  return (
    <div className={css}>
      <div className="alert">
        <p>{show && msg}</p>
        <button className="alert-close" onClick={hideAlert}>
          <FaWindowClose />
        </button>
      </div>
    </div>
  );
};

export default Alert;
