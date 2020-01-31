import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CONFIG from '../config';
import '../index.css';

function Rooms(props) {

  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const options = {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      };
      const url = `${CONFIG.api_host}/api/rooms`;
      return axios(encodeURI(url), options)
      .then(res => {
        setData(res.data);
      });
    }

    fetchData();
  }, []);

  function handleClickRoom(evt) {
    const roomId = evt.currentTarget.dataset.id;
    const date = new Date().toISOString().substr(0, 10);
    props.history.push(`/schedules?roomId=${roomId}&date=${date}`);
  }

  return (
    <div className='roomsContainer'>
      <ul className='roomsList'>
        {data.map((item, idx) => (
          <li key={item.roomId} data-id={item.roomId} onClick={handleClickRoom}>
            <div className='roomDetailOuter'>
              <div className='roomDetailInner'>
                <div>{item.roomName}</div>
                <div>{item.location}</div>
                <div>{item.allowance}명</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Rooms;