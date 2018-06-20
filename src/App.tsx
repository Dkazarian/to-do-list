import * as React from 'react';
import './App.css';

import List from './list';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">To Do List</h1>
        </header>
        <List />
      </div>
    );
  }
}

export default App;
