import React from 'react';
import ReminderList from '../components/ReminderList';

function Reminders() {
  return (
    <div>
      <h2>Reminders</h2>
      <ReminderList reminders={[]} />
    </div>
  );
}

export default Reminders;
