import React from 'react';
import { Route } from 'react-router-dom';
import { Rooms, DailySchedule } from './components';

function App() {
  return (
    <div className="app">
      <Route exact path="/" component={Rooms} />
      <Route path="/schedules" component={DailySchedule} />
    </div>
  );
};

export default App;
