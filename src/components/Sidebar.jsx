import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <nav className="sidebar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/entries">Diary Entries</Link></li>
        <li><Link to="/ideas">Ideas</Link></li>
        <li><Link to="/reminders">Reminders</Link></li>
      </ul>
    </nav>
  );
}

export default Sidebar;
