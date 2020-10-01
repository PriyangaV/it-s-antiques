import React, { useEffect, useState } from 'react';

const Offers = () => {
  const [currentDay, setCurrentDay] = useState(null);
  useEffect(() => {
    function getTimeRemaining(endtime) {
      const total = Date.parse(endtime) - Date.parse(new Date());
      const seconds = Math.floor((total / 1000) % 60);
      const minutes = Math.floor((total / 1000 / 60) % 60);
      const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
      const days = Math.floor(total / (1000 * 60 * 60 * 24));

      return {
        total,
        days,
        hours,
        minutes,
        seconds,
      };
    }

    function initializeClock(id, endtime) {
      const clock = document.getElementById(id);
      const daysSpan = clock.querySelector('.days');
      const hoursSpan = clock.querySelector('.hours');
      const minutesSpan = clock.querySelector('.minutes');
      const secondsSpan = clock.querySelector('.seconds');

      function updateClock() {
        const t = getTimeRemaining(endtime);

        daysSpan.innerHTML = t.days;
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

        if (t.total <= 0) {
          clearInterval(timeinterval);
        }
      }

      updateClock();
      const timeinterval = setInterval(updateClock, 1000);
    }

    const deadline = new Date(
      Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000
    );

    initializeClock('clockdiv', deadline);

    setCurrentDay(deadline.toString().split(' ').slice(1, 4).join(' '));
  }, []);

  /* const getCurrentDate = (separator = '-') => {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date}`;
  }; */
  return (
    <div className="featured between">
      <h1 className="title">Featured Event</h1>
      <h3 className="direction">
        {currentDay} @ 09 - 11 am. ZP160726 Main Street
      </h3>
      <p className="slogan">
        Limited Time discount on Antique Items. Up to 50% off
      </p>
      <div id="clockdiv" className="clockDiv">
        <div style={{ '--i': '0.5s' }}>
          <p className="days"></p>
          <span className="smalltext">Days</span>
        </div>
        <div style={{ '--i': '1s' }}>
          <p className="hours"></p>
          <span className="smalltext">Hours</span>
        </div>
        <div style={{ '--i': '1.5s' }}>
          <p className="minutes"></p>
          <span className="smalltext">Minutes</span>
        </div>
        <div style={{ '--i': '2s' }}>
          <p className="seconds"></p>
          <span className="smalltext">Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default Offers;
