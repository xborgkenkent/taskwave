import React, { useState } from 'react';

import './App.css';
import Header from './components/Header';
import Main from './components/Main';

function App() {
  const [searchKey, setSearchKey] = useState('');

  const handleCardSearch = (searchKey: string) => {
    setSearchKey(searchKey);
  };

  return (
    <div className="flex flex-col h-screen bg-[#1f1f2e] text-white">
      <Header onCardSearch={handleCardSearch} />
      <Main searchKey={searchKey} />
    </div>
  );
}

export default App;
