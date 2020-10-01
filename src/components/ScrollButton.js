import React, { useContext } from 'react';
import { FaChevronUp } from 'react-icons/fa';
import { UserContext } from '../context/user';

const ScrollButton = () => {
  const { height } = useContext(UserContext);

  const scrollBackToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };
  // 100 is an arbitary value
  return (
    <button
      className={height > 100 ? 'scroll-btn show-scroll-btn' : 'scroll-btn'}
      onClick={scrollBackToTop}
    >
      <FaChevronUp className="angleDouble" />
    </button>
  );
};

export default ScrollButton;
