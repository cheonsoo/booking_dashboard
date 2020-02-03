const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());

/* [CONFIGURE APP TO USE bodyParser] */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*
{
    "body": {
        "roomList": [
            {
                "allowance": 25,
                "location": "강서타워 3층",
                "roomName": "큐빅3",
                "roomId": "100001939530"
            }
*/
app.get("/api/rooms", function(req, res) {
  const url = 'http://portal.gshs.co.kr/rest/meetingroom/retrieveMeetingRoomList';
  const options = {
    method: "POST",
    headers: { 'Content-type': 'Application/json' },
    data: {}
  };
  axios(encodeURI(url), options).then(result => {
    res.send(result.data.body.roomList);
  })
});

/*
egisterName":"황준호","repeat":1,"telNo":"","bookingStatus":1}]},"header":{"returnCode":0,"returnDesc":"success"}}
{"body":{"roomList":[{"startDate":1580446800000,"title":"모바일라이브 스탭 미팅","adminUse":0,"approvalUserId":"22657","registerId":"22831","roomId":"100001939530","endDate":1580450400000,"registerName":"이동현","repeat":0,"telNo":"","bookingStatus":1},{"startDate":1580445000000,"title":"마이샵PD팀 기획회의","adminUse":0,"approvalUserId":"22657","registerId":"23256","roomId":"100001939530","endDate":1580446800000,"registerName":"황준호","repeat":0,"telNo":"","bookingStatus":1},{"startDate":1580454000000,"title":"뷰티PD팀 뷰티유닛 회의","adminUse":0,"approvalUserId":"22657","registerId":"23079","roomId":"100001939530","endDate":1580457600000,"registerName":"최유진","repeat":0,"telNo":"","bookingStatus":1},{"startDate":1580443200000,"title":"회의","adminUse":0,"approvalUserId":"22657","registerId":"21612","roomId":"100001939530","endDate":1580445000000,"registerName":"김영식","repeat":0,"telNo":"","bookingStatus":1},{"startDate":1580432400000,"title":"큐빅룸) 마이샵PD팀 팀회의","adminUse":0,"approvalUserId":"22657","registerId":"23256","roomId":"100001939530","endDate":1580437800000,"r
*/
app.get("/api/schedules", function(req, res) {
  console.log('/api/schedules');
  const { roomId, date } = req.query;
  console.log(`roomId: ${roomId}, date: ${date}`);
  const url = 'http://portal.gshs.co.kr/rest/meetingroom/retrieveMeetingRoomDetailList';
  const options = {
    method: "POST",
    headers: { 'Content-type': 'Application/json' },
    data: {
      "roomId": roomId,
      "date": date
      }
  };

  axios(encodeURI(url), options).then(result => {
    // console.log(JSON.stringify(result.data));
    return result.data.body.roomList;

  })
  .then(function(roomList) {
    roomList.forEach(function(item) {
      let startHours = new Date(item.startDate).getHours();
          startHours = startHours >= 10 ? startHours : `0${startHours}`;
      let startMins = new Date(item.startDate).getMinutes();
          startMins = startMins >= 10 ? startMins : `0${startMins}`;
      item.time_start = `${startHours}:${startMins}`;

      let endHours = new Date(item.endDate).getHours();
          endHours = endHours >= 10 ? endHours : `0${endHours}`;
      let endMins = new Date(item.endDate).getMinutes();
          endMins = endMins >= 10 ? endMins : `0${endMins}`;
      item.time_end = `${endHours}:${endMins}`;
    });
    return roomList;
  })
  .then(function(roomList) {
    res.send(roomList);
  });
});


/* Server Start */
app.listen(4000, () => {
  console.log(`server is listenling on port 4000`);
});
