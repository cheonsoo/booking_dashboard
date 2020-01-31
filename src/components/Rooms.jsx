import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';

function Rooms() {

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
      const url = 'http://localhost:4000/api/rooms';
      return axios(encodeURI(url), options)
      .then(res => {
        setData(res.data);
      });
    }

    fetchData();
  }, []);

  return (
    <div className='roomsContainer'>
      <ul className='roomsList'>
        {data.map((item, idx) => (
          <li key={item.roomId}>
            <div className='roomDetailOuter'>
              <div className='roomDetailInner'>
                <div>{item.roomName}</div>
                <div>{item.location}</div>
                <div>{item.allowance}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Rooms;