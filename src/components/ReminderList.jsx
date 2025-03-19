import React from 'react';
import ReminderItem from './ReminderItem';

function ReminderList({ reminders }) {
  return (
    <div className="reminder-list">
      {reminders.length === 0 ? <p>No reminders yet.</p> : 
        reminders.map((reminder, index) => <ReminderItem key={index} reminder={reminder} />)}
    </div>
  );
}

export default ReminderList;
