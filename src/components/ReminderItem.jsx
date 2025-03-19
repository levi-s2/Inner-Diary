import React from 'react';

function ReminderItem({ reminder }) {
  return (
    <div className="reminder-item">
      <p>{reminder}</p>
    </div>
  );
}

export default ReminderItem;
