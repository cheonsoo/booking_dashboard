import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';

// const dayTable = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ];
const dayTable = [ 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN' ];
const today = new Date().toISOString().substr(0, 10);
const day = new Date().getDay();
const colorTable = [ '#597F91', '#443552', '#F5B06D', '#A3B9B2', '#597F91', '#443552', '#F5B06D', '#A3B9B2', '#597F91', '#443552', '#F5B06D', '#A3B9B2' ];
const outerHeight = 50;
const scheduleStart = 540;
const timelineUnitDuration = 30;

const timeTable = [ '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00' ];

function DailySchedule() {
  const [loading, setLoading] = useState('loading');
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const options = {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      };
      // const url = 'http://43cd64e5.ngrok.io/api/schedules';
      const url = 'http://localhost:4000/api/schedules';
      return axios(encodeURI(url), options)
      .then(res => {
        setData(res.data);
        setLoading('');
      });
    }

    fetchData();
  }, []);

  function getScheduleTimestamp(time) {
		//accepts hh:mm format - convert hh:mm to timestamp
		time = time.replace(/ /g,'');
		var timeArray = time.split(':');
		var timeStamp = parseInt(timeArray[0])*60 + parseInt(timeArray[1]);
		return timeStamp;
  }

  function setTop(timeStart) {
    const start = getScheduleTimestamp(timeStart);
    const eventTop = outerHeight * (start - scheduleStart) / timelineUnitDuration;
    return eventTop;
  }

  function setDuration(timeStart, timeEnd) {
    const duration = getScheduleTimestamp(timeEnd) - getScheduleTimestamp(timeStart);
    const eventHeight = outerHeight * duration / timelineUnitDuration - 3;
    return eventHeight;
  }

  return (
    <div className="dailySchedule">
      <div className={`cd-schedule ${loading}`} id="cd-schedule">
        <div className="timeline">
          <ul>
            {timeTable.map((time, idx) => (
              <li key={idx}><span>{time}</span></li>
            ))}
          </ul>
        </div>

        <div className="events">
          <ul>
            <li className="events-group">
              <div className="top-info"><span>{today} {dayTable[day]}</span></div>

              <ul>
                {data.map((event, idx) => (
                  <li key={idx} className="single-event" style={{ top: `${setTop(event.time_start)}px`, height: `${setDuration(event.time_start, event.time_end)}px`, background: `${colorTable[idx]}` }}>
                    <div className='event-outer' href="#0">
                      <div className="event-inner">
                        <div className="event-detail">
                          <div>{event.time_start} - {event.time_end}</div>
                          <div>{event.title}</div>
                          <div>{event.registerName}</div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>

        <div className="event-modal">
          <header className="header">
            <div className="content">
              <span className="event-date"></span>
              <h3 className="event-name"></h3>
            </div>

            <div className="header-bg"></div>
          </header>

          <div className="body">
            <div className="event-info"></div>
            <div className="body-bg"></div>
          </div>

          <a href="#0" className="close">Close</a>
        </div>

        <div className="cover-layer"></div>
      </div>
    </div>
  );
}

export default DailySchedule;
