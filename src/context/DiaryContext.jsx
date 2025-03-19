import React, { createContext, useState, useEffect } from 'react';

export const DiaryContext = createContext();

function DiaryProvider({ children }) {
  const [entries, setEntries] = useState(() => {
    const savedEntries = localStorage.getItem('diaryEntries');
    return savedEntries ? JSON.parse(savedEntries) : [];
  });

  useEffect(() => {
    localStorage.setItem('diaryEntries', JSON.stringify(entries));
  }, [entries]);

  const addEntry = (text) => {
    setEntries([...entries, text]);
  };

  return (
    <DiaryContext.Provider value={{ entries, addEntry }}>
      {children}
    </DiaryContext.Provider>
  );
}

export default DiaryProvider;
