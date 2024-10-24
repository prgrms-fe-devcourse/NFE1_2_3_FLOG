import React from 'react';
import Header from '../shared/components/header/Header';
import SearchResultsPage from '../pages/main/SearchResultsPage';
import EventSchedulePage from '../pages/event/EventSchedulePage';

function App() {
  return (
    <>
      <Header />
      <EventSchedulePage />
    </>
  );
}

export default App;
