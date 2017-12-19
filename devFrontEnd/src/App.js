import React from 'react';
import Main from './components/routes/Main';
import Navbar from './components/routes/Navbar';

const App = ()=>(
  <div>
    <Navbar/>
    <div className="container">
      <br/>
      <Main/>
    </div>
  </div>
)

export default App;
